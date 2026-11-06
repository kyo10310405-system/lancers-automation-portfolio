'use strict';
const D=Demo,$=s=>document.querySelector(s),KEY='lancers_portfolio_docs_v1';
const fixtures=[
{id:'DOC-001',title:'11月 運営改善ミーティング',type:'会議記録',date:'2026-11-04',owner:'運営チーム',content:`議題：申込後の案内業務と顧客対応の標準化\n\n現状：案内メールは担当者が個別に作成しており、記載内容にばらつきがある。対応履歴も複数の表に分散している。\n\n決定事項\n- 申込後の案内文面を統一テンプレートへ切り替える。\n- 対応履歴は顧客管理シートに一本化する。\n\nToDo\n- 担当A：11月12日までに案内テンプレートの初稿を作成する。\n- 担当B：11月15日までに管理シートの項目を整理する。\n- 担当C：11月18日までにテスト送信を実施する。\n\n懸念点\n- 移行前の履歴が失われないよう、旧データのバックアップが必要。`},
{id:'DOC-002',title:'データ集計の自動化計画',type:'改善提案',date:'2026-11-01',owner:'業務改善チーム',content:`背景：毎月の売上データ集計に手作業が発生し、各担当者によってレポート形式が異なる。\n\n提案内容\n- GoogleスプレッドシートとGASで自動集計する。\n- データ形式チェックを実装し、入力不備を検知する。\n- 毎朝9時頃の自動更新を想定する。\n\n決定事項\n- 初期対象は売上集計のみに限定する。\n- 日次処理の結果を共有シートに出力する。\n\nアクション\n- 担当A：ダミーデータで集計ロジックを作成する。\n- 担当B：入力データのルールを文書化する。\n\n課題：Google Apps Scriptの実行時間制限を確認する。`},
{id:'DOC-003',title:'顧客フォロー改善 定例会',type:'会議記録',date:'2026-10-29',owner:'顧客支援チーム',content:`議題：顧客フォローの抜け漏れ防止\n\n議論：個別対応の記録が更新されず、次の担当者へ情報が伝わらない事例を想定。\n\n決定事項\n- 連絡後は当日中に対応履歴を更新する。\n- 期限が近い案件を毎朝一覧表示する。\n\nToDo\n- 担当B：対応履歴の入力ルールを整備する。\n- 担当C：期限通知のテストを実施する。\n\nリスク\n- 通知先の権限設定に誤りがあると情報漏洩につながる。`},
{id:'DOC-004',title:'AI議事録活用ワークショップ',type:'会議記録',date:'2026-10-22',owner:'研修チーム',content:`目的：議事録の整理時間を削減するため、AI要約の使い方をチームで共有する。\n\n決定事項\n- AI出力は必ず人が内容確認する。\n- 機密情報は承認済み環境でのみ処理する。\n\nToDo\n- 担当A：要約テンプレートを作成する。\n- 担当C：レビュー観点のチェックリストを準備する。\n\n懸念点\n- AIは事実と異なる記載を生成する可能性があるため、会議原文との照合が不可欠。`},
{id:'DOC-005',title:'KPIダッシュボードの設計メモ',type:'業務メモ',date:'2026-10-18',owner:'分析チーム',content:`テーマ：契約更新率と顧客の活動状況を可視化するダッシュボード\n\n集計仕様：更新率は延長件数を延長と退会の合計で割って算出する。審査中は分母に入れない。\n\n決定事項\n- 月次更新率を主要KPIとして表示する。\n- 顧客情報の一覧から元データを確認できる構成にする。\n\nToDo\n- 担当A：更新率の計算式を確認する。\n- 担当B：CSV出力機能を実装する。\n\n課題：入力ミスによる重複顧客を検知する方法が必要。`},
{id:'DOC-006',title:'週次チーム会議',type:'会議記録',date:'2026-10-15',owner:'運営チーム',content:`議題：今週の運営タスクを整理する。\n\n報告：問い合わせは先週と同程度で推移。案内資料の更新が遅れている。\n\n決定事項\n- FAQ更新を今週の最優先事項とする。\n- 翌週から新しい進捗報告フォーマットを使う。\n\nアクション\n- 担当C：金曜日までにFAQ修正案を提出する。\n- 担当B：新しい週次報告シートを用意する。\n\nリスク\n- 担当者不在時の代行体制が未整備。`},
{id:'DOC-007',title:'セキュリティ運用の整理',type:'改善提案',date:'2026-10-10',owner:'システムチーム',content:`目的：外部連携を含むシステムでの情報アクセス権限を明確化する。\n\n提案：サービスごとの管理者・編集者・閲覧者を一覧化する。共有設定を定期的に点検する。\n\n決定事項\n- 最小権限の原則に沿って権限表を作成する。\n- 外部共有リンクを月次確認する。\n\nToDo\n- 担当A：外部連携アカウントを棚卸しする。\n- 担当C：退職・異動時の権限削除手順を整備する。\n\n懸念点\n- テスト用の認証情報をソースに書き込まないこと。`},
{id:'DOC-008',title:'新人研修プログラム',type:'業務メモ',date:'2026-10-03',owner:'研修チーム',content:`概要：新メンバー向けの研修プログラムの構成案。\n\n決定事項\n- 基礎知識・実践・振り返りの3段階で研修を設計する。\n- 研修終了時にチェックリストで理解度を確認する。\n\nToDo\n- 担当B：研修資料の目次を作る。\n- 担当A：理解度チェックの設問を作成する。\n\n課題：受講者ごとの進捗を一覧化できる仕組みが不足している。`},
];
let docs=D.store(KEY,fixtures),selected=docs[0]?.id||null,lastResult=null,apiAvailable=false;
function persist(){D.setStore(KEY,docs)}
function extractRuleBased(raw){
 const text=String(raw||'').trim();
 const lines=text.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
 const tasks=[],decisions=[],risks=[],body=[];
 let section='';
 const group={
  '決定事項':'decisions','決定':'decisions','合意事項':'decisions',
  'ToDo':'tasks','TODO':'tasks','アクション':'tasks','次回まで':'tasks','担当タスク':'tasks',
  '懸念点':'risks','課題':'risks','リスク':'risks','注意事項':'risks',
  '議題':'body','背景':'body','目的':'body','概要':'body','現状':'body',
  '提案内容':'body','議論':'body','報告':'body','集計仕様':'body','テーマ':'body'
 };
 const heading=/^(?:#{1,6}\s*)?(?:【\s*)?(決定事項|合意事項|決定|ToDo|TODO|アクション|次回まで|担当タスク|懸念点|課題|リスク|注意事項|議題|背景|目的|概要|現状|提案内容|議論|報告|集計仕様|テーマ)(?:\s*】)?\s*(?:(?:[：:]\s*)(.*))?$/i;
 for(const line of lines){
  const bare=line.replace(/^[-*・●]\s*/, '').trim();
  const match=bare.match(heading);
  if(match){
   section=group[match[1]]||group[Object.keys(group).find(k=>k.toLowerCase()===match[1].toLowerCase())]||'body';
   const remainder=(match[2]||'').trim();
   if(remainder){
    if(section==='decisions')decisions.push(remainder);
    else if(section==='tasks')tasks.push(remainder);
    else if(section==='risks')risks.push(remainder);
    else body.push(`${match[1]}：${remainder}`);
   }
   continue;
  }
  if(!bare)continue;
  if(section==='decisions')decisions.push(bare);
  else if(section==='tasks')tasks.push(bare);
  else if(section==='risks')risks.push(bare);
  else body.push(bare);
 }
 const rawSummary=body.slice(0,3).join(' ').slice(0,240)||lines.slice(0,3).join(' ').slice(0,240)||'要約できる本文がありません。';
 return{summary:rawSummary,decisions:decisions.slice(0,10),actions:tasks.slice(0,10),risks:risks.slice(0,10),mode:'rule'};
}
function renderDocs(){const q=$('#docSearch').value.trim().toLowerCase(),f=$('#docFilter').value,matched=docs.filter(x=>(!f||x.type===f)&&(!q||(x.title+' '+x.content+' '+x.owner).toLowerCase().includes(q)));$('#docList').innerHTML=matched.map(x=>`<button type="button" data-id="${D.esc(x.id)}" class="doc-item ${x.id===selected?'active':''}"><h4>${D.esc(x.title)}</h4><p>${D.esc(x.date)}　·　${D.esc(x.type)}　·　${D.esc(x.owner)}</p></button>`).join('')||'<div class="empty">該当する文書がありません</div>';$('#docCount').textContent=`${matched.length} 件表示 / 全 ${docs.length} 件`;$('#sDocs').textContent=docs.length+' 件';$('#sMeetings').textContent=docs.filter(x=>x.type==='会議記録').length+' 件'}
function chosen(){return docs.find(x=>x.id===selected)}
function selectDoc(id){selected=id;lastResult=null;renderDocs();const x=chosen();$('#selectedTitle').textContent=x?.title||'文書がありません';$('#selectedMeta').textContent=x?`${x.date} · ${x.owner}`:'';$('#typeBadge').textContent=x?.type||'—';$('#sourceContent').textContent=x?.content||'—';$('#analysisResult').innerHTML='<div class="hint">「選択文書を分析」を押すと結果が表示されます。</div>';$('#sTasks').textContent='—';$('#sDecisions').textContent='—';$('#saveSummary').disabled=true;$('#deleteDoc').disabled=!x;if(x)doAnalysis(false)}
function resultHtml(result){const li=xs=>(xs||[]).length?`<ul>${xs.map(x=>`<li>${D.esc(x)}</li>`).join('')}</ul>`:'<p style="color:#93a0b2">該当する記載は見つかりませんでした。</p>';return`<h4>▸ 要点サマリー</h4><p>${D.esc(result.summary||'要約を取得できませんでした。')}</p><h4>▸ 決定事項</h4>${li(result.decisions)}<h4>▸ ネクストアクション</h4>${li(result.actions)}<h4>▸ 懸念・リスク</h4>${li(result.risks)}`}
function showResult(r){lastResult=r;$('#analysisResult').innerHTML=resultHtml(r);$('#sTasks').textContent=(r.actions||[]).length+' 件';$('#sDecisions').textContent=(r.decisions||[]).length+' 件';$('#modeBadge').textContent=r.mode==='ai'?'AI API ANALYSIS':'RULE-BASED DEMO';$('#saveSummary').disabled=false}
async function doAnalysis(showNotice=true){const x=chosen();if(!x){D.toast('文書を選択してください');return}$('#analyzeBtn').disabled=true;try{showResult(extractRuleBased(x.content));if(showNotice)D.toast('ローカルのルールベース抽出を実行しました')}finally{$('#analyzeBtn').disabled=false}}
function health(){} // GitHub Pages版はAPI通信しません。
$('#docSearch').oninput=renderDocs;$('#docFilter').onchange=renderDocs;$('#docList').addEventListener('click',e=>{let btn=e.target.closest('button[data-id]');if(btn)selectDoc(btn.dataset.id)});$('#analyzeBtn').onclick=()=>doAnalysis(true);
$('#saveSummary').onclick=()=>{const x=chosen();if(!x||!lastResult)return;const block=(label,arr)=>label+'\n'+(arr.length?arr.map(s=>'- '+s).join('\n'):'- 該当なし');const text=`# ${x.title}\n\n解析モード: ${lastResult.mode==='ai'?'OpenAI API':'ルールベース簡易抽出'}\n\n## 要点\n${lastResult.summary}\n\n## 決定事項\n${block('',lastResult.decisions)}\n\n## ToDo\n${block('',lastResult.actions)}\n\n## 懸念点\n${block('',lastResult.risks)}\n\n※出力内容は必ず原文と照合してください。`;D.download('document_insights.md',text,'text/markdown;charset=utf-8');D.toast('分析結果を保存しました')};
function openModal(show){$('#newModal').classList.toggle('open',show)}$('#newDoc').onclick=()=>openModal(true);$('#closeNew').onclick=()=>openModal(false);$('#cancelNew').onclick=()=>openModal(false);$('#newModal').addEventListener('click',e=>{if(e.target===$('#newModal'))openModal(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape')openModal(false)});
$('#newForm').onsubmit=e=>{e.preventDefault();const title=$('#newTitle').value.trim(),content=$('#newContent').value.trim();if(!title||!content)return;if(docs.length>=100){D.toast('デモでは100件まで追加できます');return}const row={id:'CUSTOM-'+Date.now(),title:title.slice(0,100),content:content.slice(0,25000),type:$('#newType').value,date:new Date().toLocaleDateString('sv-SE'),owner:'自分の文書'};docs.unshift(row);persist();openModal(false);$('#newForm').reset();selectDoc(row.id);D.toast('文書を登録しました')};
$('#uploadText').onchange=async e=>{const files=[...e.target.files].slice(0,10);let count=0;for(const f of files){if(!/\.(txt|md|csv)$/i.test(f.name)||f.size>300000){D.toast('txt / md / csv の300KB以下を選択してください');continue}if(docs.length>=100)break;try{const text=(await D.readFile(f)).slice(0,25000);if(!text.trim())continue;docs.unshift({id:'IMPORT-'+Date.now()+'-'+count,title:f.name.slice(0,100),type:'その他',date:new Date().toLocaleDateString('sv-SE'),owner:'アップロード',content:text});count++}catch{}}if(count){persist();selectDoc(docs[0].id);D.toast(`${count}文書を取り込みました`)}e.target.value=''};
$('#resetDocs').onclick=()=>{if(confirm('追加した文書や編集状態を削除し、架空サンプルに戻しますか？')){docs=fixtures;persist();$('#docSearch').value='';$('#docFilter').value='';selectDoc(docs[0].id);D.toast('デモを初期化しました')}};
$('#deleteDoc').onclick=()=>{const x=chosen();if(x&&confirm(`「${x.title}」を削除しますか？`)){docs=docs.filter(y=>y.id!==x.id);persist();selectDoc(docs[0]?.id||null);D.toast('文書を削除しました')}};
selectDoc(selected);health();
