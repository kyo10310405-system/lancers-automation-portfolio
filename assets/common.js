'use strict';
const Demo = (()=>{
const esc = v => String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>Number(n||0).toLocaleString('ja-JP');
const today=()=>new Date().toISOString().slice(0,10);
function toast(message){let el=document.getElementById('toast');if(!el){el=document.createElement('div');el.id='toast';el.className='toast';document.body.append(el)}el.textContent=message;el.classList.add('show');clearTimeout(el._timer);el._timer=setTimeout(()=>el.classList.remove('show'),3300)}
function download(filename,text,type='text/csv;charset=utf-8'){let b=new Blob([text],{type}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)}
function csvCell(v){let s=String(v??'');if(/^[=+@\t\r]/.test(s)||/^-(?!\d+(?:\.\d+)?$)/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"'}
function toCSV(rows,columns){return '\ufeff'+[columns.join(','),...rows.map(r=>columns.map(k=>csvCell(r[k])).join(','))].join('\r\n')}
function parseCSV(text){text=String(text||'').replace(/^\ufeff/,'');let rows=[],row=[],val='',q=false;for(let i=0;i<text.length;i++){let c=text[i];if(q){if(c==='"'&&text[i+1]==='"'){val+='"';i++}else if(c==='"')q=false;else val+=c}else if(c==='"')q=true;else if(c===','){row.push(val);val=''}else if(c==='\n'||c==='\r'){if(c==='\r'&&text[i+1]==='\n')i++;row.push(val);val='';if(row.some(c=>c.trim()!==''))rows.push(row);row=[]}else val+=c}if(q)throw Error('CSVの引用符が閉じられていません');row.push(val);if(row.some(c=>c.trim()!==''))rows.push(row);if(rows.length<1)return [];const hdr=rows.shift().map(x=>x.trim());return rows.map(values=>Object.fromEntries(hdr.map((h,i)=>[h,values[i]??''])))}
function readFile(f){return new Promise((resolve,reject)=>{let rd=new FileReader;rd.onload=()=>resolve(String(rd.result));rd.onerror=reject;rd.readAsText(f,'utf-8')})}
function store(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function setStore(key,v){try{localStorage.setItem(key,JSON.stringify(v))}catch{toast('保存領域の制限によりデータを保存できませんでした')}}
const pct=(n,d)=>d?Math.round(n/d*100):0;
return{esc,money,today,toast,download,toCSV,parseCSV,readFile,store,setStore,pct};
})();
