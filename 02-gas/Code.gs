/**
 * FlowPilot - Google Apps Script sample (2026)
 * 自作ポートフォリオ用の実動作サンプル。
 * スプレッドシートに「sales_raw」というタブを作成し、
 * sample_sales.csv を「ファイル > インポート」から読み込んで実行してください。
 * 必要列: 日付, 担当者, 案件名, 金額, ステータス
 * 個人情報・パスワードを含むデータは利用しないでください。
 */
const FLOWPILOT = Object.freeze({
  SOURCE_SHEET: 'sales_raw',
  REPORT_SHEET: 'sales_report',
  LOG_SHEET: 'automation_log',
  SUMMARY_STATUS: '成約',
  NOTIFY_EMAIL: '', // メール通知を有効にしたい場合のみ宛先を設定
  TIMEZONE: 'Asia/Tokyo'
});

function onOpen() {
  SpreadsheetApp.getUi().createMenu('FlowPilot 自動化')
    .addItem('① データを集計する', 'runAutomation')
    .addItem('② 毎日9時の自動実行を設定', 'installDailyTrigger')
    .addItem('③ 自動実行を解除', 'removeDailyTriggers')
    .addToUi();
}

function runAutomation() {
  const lock = LockService.getDocumentLock();
  if (!lock.tryLock(25000)) throw new Error('別の実行が進行中です。時間をおいて再実行してください。');
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const src = ss.getSheetByName(FLOWPILOT.SOURCE_SHEET);
    if (!src) throw new Error('「' + FLOWPILOT.SOURCE_SHEET + '」シートが見つかりません。');
    const grid = src.getDataRange().getDisplayValues();
    if (grid.length < 2) throw new Error('入力シートにデータがありません。');
    const heads = grid[0].map(String);
    const required = ['日付','担当者','案件名','金額','ステータス'];
    const indices = required.map(name => {
      const index = heads.indexOf(name);
      if (index === -1) throw new Error('必要な列「' + name + '」がありません。');
      return index;
    });
    const seen = new Set(), sums = new Map(), errors = [];
    let valid = 0, duplicates = 0, targets = 0;
    for (let row = 1; row < grid.length; row++) {
      const [dateRaw, ownerRaw, nameRaw, amountRaw, statusRaw] = indices.map(j => String(grid[row][j]).trim());
      if (![dateRaw,ownerRaw,nameRaw,amountRaw,statusRaw].some(Boolean)) continue;
      const date = normalizeDate_(dateRaw);
      const amount = Number(amountRaw.replace(/[¥￥,\s]/g, ''));
      if (!date || !ownerRaw || !nameRaw || !amountRaw || !Number.isFinite(amount) || amount < 0 ||
          !['成約','失注','見込み'].includes(statusRaw)) {
        errors.push((row+1) + '行目: 必須項目または形式が不正です。');
        continue;
      }
      const dupKey = [date,ownerRaw,nameRaw,amount,statusRaw].join('|');
      if (seen.has(dupKey)) { duplicates++; continue; }
      seen.add(dupKey); valid++;
      if (statusRaw !== FLOWPILOT.SUMMARY_STATUS) continue;
      targets++;
      const prev = sums.get(ownerRaw) || {count:0,amount:0};
      prev.count++; prev.amount+=amount; sums.set(ownerRaw,prev);
    }
    const output = [...sums].map(([owner,v]) => [owner,v.count,v.amount]);
    output.sort((a,b)=>b[2]-a[2]);
    const report = ss.getSheetByName(FLOWPILOT.REPORT_SHEET) || ss.insertSheet(FLOWPILOT.REPORT_SHEET);
    report.clearContents();
    report.getRange(1,1,1,3).setValues([['担当者','成約件数','成約売上合計']]).setFontWeight('bold');
    if (output.length) report.getRange(2,1,output.length,3).setValues(output);
    report.setFrozenRows(1);
    report.autoResizeColumns(1,3);
    if (output.length) report.getRange(2,3,output.length,1).setNumberFormat('¥#,##0');
    const total = output.reduce((sum,r)=>sum+r[2],0);
    const logSheet = ss.getSheetByName(FLOWPILOT.LOG_SHEET) || ss.insertSheet(FLOWPILOT.LOG_SHEET);
    if (logSheet.getLastRow()===0) logSheet.appendRow(['日時','対象件数','有効件数','成約件数','重複','エラー','成約金額','内容']);
    logSheet.appendRow([new Date(),grid.length-1,valid,targets,duplicates,errors.length,total,errors.slice(0,5).join(' / ')]);
    SpreadsheetApp.flush();
    maybeNotify_(output, targets, total, errors.length);
    const msg = '処理完了：成約' + targets + '件、合計 ¥' + total.toLocaleString('ja-JP') + '、形式エラー' + errors.length + '件';
    console.log(msg);
    return {valid,targets,duplicates,errors,total};
  } finally { lock.releaseLock(); }
}

function normalizeDate_(raw) {
  const m = String(raw).match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (!m) return null;
  const y=Number(m[1]),mon=Number(m[2]),d=Number(m[3]);
  const date=new Date(y,mon-1,d);
  if (date.getFullYear()!==y || date.getMonth()!==mon-1 || date.getDate()!==d) return null;
  return String(y)+'-'+String(mon).padStart(2,'0')+'-'+String(d).padStart(2,'0');
}

function maybeNotify_(rows, count, amount, errorCount) {
  if (!FLOWPILOT.NOTIFY_EMAIL) return; // 初期状態は送信しません
  const props=PropertiesService.getDocumentProperties();
  const payload=JSON.stringify({rows,count,amount,errorCount});
  const digest=Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,payload)
    .map(x=>('0'+(x&255).toString(16)).slice(-2)).join('');
  if (digest===props.getProperty('last_notification_digest')) return;
  MailApp.sendEmail({to:FLOWPILOT.NOTIFY_EMAIL,
    subject:'【FlowPilot】売上レポート更新',
    body:'成約件数: '+count+'\n成約売上: ¥'+amount.toLocaleString('ja-JP')+'\n形式エラー: '+errorCount+'\n\nスプレッドシートをご確認ください。'});
  props.setProperty('last_notification_digest',digest);
}

function installDailyTrigger() {
  removeDailyTriggers();
  ScriptApp.newTrigger('runAutomation').timeBased().atHour(9).nearMinute(0).everyDays(1).inTimezone(FLOWPILOT.TIMEZONE).create();
  SpreadsheetApp.getUi().alert('毎日午前9時頃に実行するトリガーを設定しました。正確な分単位の実行は保証されません。');
}

function removeDailyTriggers() {
  ScriptApp.getProjectTriggers().filter(t=>t.getHandlerFunction()==='runAutomation')
    .forEach(t=>ScriptApp.deleteTrigger(t));
}
