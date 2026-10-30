/* game.js — Mama MacGregor's Slots 2: Highland Jackpot (large text, one tap to play) */
(function(){
'use strict';
const g=K.g,TAU=Math.PI*2,M=MAMA,E=M.E;K.ns='mms2';
K.loadLogo('logo-boh.png');
/* ---------- symbols (all vector) */
const SYM={
 mama:{n:'Mama (wild)',pay:[0,0,0,50,200,1000],draw:(x,y,s)=>{E(x,y-s*.05,s*.36,s*.36,'#c8541e');for(let i=0;i<8;i++)E(x+Math.cos(i*.8)*s*.3,y-s*.05+Math.sin(i*.8)*s*.24,s*.1,s*.1,i%2?'#d8682a':'#c8541e');E(x,y+s*.02,s*.26,s*.28,'#f6d2b4');g.strokeStyle='#6a4a2a';g.lineWidth=s*.035;g.beginPath();g.arc(x-s*.1,y,s*.08,0,TAU);g.moveTo(x+s*.18,y);g.arc(x+s*.1,y,s*.08,0,TAU);g.stroke();E(x-s*.1,y,s*.03,s*.03,'#333');E(x+s*.1,y,s*.03,s*.03,'#333');g.strokeStyle='#b8404a';g.beginPath();g.arc(x,y+s*.1,s*.08,.3,2.8);g.stroke();E(x,y-s*.3,s*.34,s*.1,'#1f4a3c');E(x+s*.05,y-s*.42,s*.07,s*.07,'#d6336c');K.text('WILD',x,y+s*.4,s*.18,'#ffd43b',{sw:s*.04})}},
 coo:{n:'Highland Coo',pay:[0,0,0,30,100,400],draw:(x,y,s)=>{E(x,y+s*.05,s*.3,s*.27,'#c25d24');for(let i=0;i<5;i++)E(x-s*.2+i*s*.1,y-s*.16,s*.08,s*.1,'#d8682a');g.strokeStyle='#f1e3c8';g.lineWidth=s*.07;g.lineCap='round';g.beginPath();g.moveTo(x-s*.18,y-s*.15);g.quadraticCurveTo(x-s*.45,y-s*.25,x-s*.36,y-s*.42);g.moveTo(x+s*.18,y-s*.15);g.quadraticCurveTo(x+s*.45,y-s*.25,x+s*.36,y-s*.42);g.stroke();E(x,y+s*.2,s*.16,s*.11,'#f0a080');E(x-s*.05,y+s*.2,s*.025,s*.025,'#3a2a1a');E(x+s*.05,y+s*.2,s*.025,s*.025,'#3a2a1a')}},
 donkey:{n:'Donkey',pay:[0,0,0,25,80,300],draw:(x,y,s)=>{g.save();g.translate(x-s*.1,y-s*.22);g.rotate(-.3);E(0,-s*.12,s*.06,s*.18,'#8e8e9c');g.restore();g.save();g.translate(x+s*.1,y-s*.22);g.rotate(.3);E(0,-s*.12,s*.06,s*.18,'#7a7a88');g.restore();E(x,y,s*.22,s*.26,'#8e8e9c');E(x,y+s*.18,s*.17,s*.13,'#d8d8e0');E(x-s*.08,y-s*.05,s*.03,s*.03,'#222');E(x+s*.08,y-s*.05,s*.03,s*.03,'#222')}},
 dove:{n:'Dove',pay:[0,0,0,20,60,200],draw:(x,y,s)=>{E(x,y,s*.3,s*.15,'#fff');E(x+s*.25,y-s*.08,s*.1,s*.09,'#fff');g.fillStyle='#f59f00';g.beginPath();g.moveTo(x+s*.34,y-s*.08);g.lineTo(x+s*.42,y-s*.05);g.lineTo(x+s*.34,y-s*.03);g.fill();g.fillStyle='#e9ecef';g.beginPath();g.moveTo(x-s*.05,y-s*.05);g.quadraticCurveTo(x-s*.15,y-s*.4,x+s*.12,y-s*.3);g.closePath();g.fill();E(x+s*.27,y-s*.1,s*.02,s*.02,'#222');g.strokeStyle='#2f9e44';g.lineWidth=s*.03;g.beginPath();g.moveTo(x+s*.38,y-s*.03);g.lineTo(x+s*.45,y+s*.1);g.stroke()}},
 lamb:{n:'Lamb',pay:[0,0,0,15,50,150],draw:(x,y,s)=>{for(let i=0;i<7;i++)E(x-s*.2+i*s*.07,y+Math.sin(i*1.7)*s*.08,s*.13,s*.13,'#f8f9fa');E(x+s*.28,y-s*.08,s*.11,s*.11,'#2a2a30');E(x+s*.31,y-s*.1,s*.02,s*.02,'#fff');g.strokeStyle='#2a2a30';g.lineWidth=s*.05;g.beginPath();for(const dx of [-.15,0,.12,.22]){g.moveTo(x+dx*s,y+s*.15);g.lineTo(x+dx*s,y+s*.32)}g.stroke()}},
 bible:{n:'Bible',pay:[0,0,0,10,30,100],draw:(x,y,s)=>{g.fillStyle='#7a1d1d';K.rr(x-s*.25,y-s*.32,s*.5,s*.64,s*.05);g.fill();g.fillStyle='#f1e3c8';g.fillRect(x+s*.2,y-s*.3,s*.06,s*.6);g.fillStyle='#ffd43b';g.fillRect(x-s*.03,y-s*.2,s*.06,s*.36);g.fillRect(x-s*.12,y-s*.1,s*.24,s*.06);g.fillStyle='#e03131';g.fillRect(x+s*.08,y+s*.3,s*.04,s*.12)}},
 cross:{n:'Cross',pay:[0,0,0,8,25,80],draw:(x,y,s)=>{g.fillStyle='#9c6b30';g.fillRect(x-s*.06,y-s*.38,s*.12,s*.76);g.fillRect(x-s*.25,y-s*.2,s*.5,s*.12);g.strokeStyle='#6b4423';g.lineWidth=s*.02;g.strokeRect(x-s*.06,y-s*.38,s*.12,s*.76);g.strokeRect(x-s*.25,y-s*.2,s*.5,s*.12)}},
 thistle:{n:'Thistle',pay:[0,0,0,5,15,50],draw:(x,y,s)=>{g.strokeStyle='#2f9e44';g.lineWidth=s*.05;g.beginPath();g.moveTo(x,y+s*.38);g.lineTo(x,y);g.stroke();E(x,y+s*.02,s*.14,s*.12,'#5c940d');for(let i=0;i<9;i++){g.strokeStyle='#ae3ec9';g.lineWidth=s*.04;const a=-Math.PI*.9+i*Math.PI*.1;g.beginPath();g.moveTo(x,y-s*.04);g.lineTo(x+Math.cos(a)*s*.28,y-s*.04+Math.sin(a)*s*.28);g.stroke()}}},
 fish:{n:'Fish',pay:[0,0,0,4,12,40],draw:(x,y,s)=>{E(x,y,s*.38,s*.38,'#1971c2');g.strokeStyle='#ffe066';g.lineWidth=s*.05;g.beginPath();g.moveTo(x-s*.22,y-s*.1);g.quadraticCurveTo(x,y-s*.25,x+s*.2,y+s*.08);g.moveTo(x-s*.22,y+s*.1);g.quadraticCurveTo(x,y+s*.25,x+s*.2,y-s*.08);g.stroke()}},
 cup:{n:'Cup',pay:[0,0,0,4,10,30],draw:(x,y,s)=>{g.fillStyle='#fcc419';g.beginPath();g.moveTo(x-s*.22,y-s*.32);g.lineTo(x+s*.22,y-s*.32);g.quadraticCurveTo(x+s*.2,y,x,y+s*.05);g.quadraticCurveTo(x-s*.2,y,x-s*.22,y-s*.32);g.fill();g.fillRect(x-s*.03,y,s*.06,s*.22);E(x,y+s*.3,s*.16,s*.06,'#fcc419');g.fillStyle='#e8590c';g.fillRect(x-s*.02,y-s*.26,s*.04,s*.16);g.fillRect(x-s*.07,y-s*.21,s*.14,s*.04)}},
 bell:{n:'Bell (free spins)',scatter:1,draw:(x,y,s)=>{g.fillStyle='#f59f00';g.beginPath();g.moveTo(x-s*.28,y+s*.22);g.quadraticCurveTo(x-s*.25,y-s*.32,x,y-s*.32);g.quadraticCurveTo(x+s*.25,y-s*.32,x+s*.28,y+s*.22);g.closePath();g.fill();E(x,y+s*.24,s*.3,s*.06,'#e8590c');E(x,y+s*.32,s*.07,s*.07,'#e8590c');E(x-s*.08,y-s*.12,s*.05,s*.12,'rgba(255,255,255,.4)')}},
 barn:{n:'Barn (bonus)',scatter:1,draw:(x,y,s)=>{g.fillStyle='#c92a2a';g.fillRect(x-s*.3,y-s*.08,s*.6,s*.4);g.fillStyle='#a51d1d';g.beginPath();g.moveTo(x-s*.36,y-s*.06);g.lineTo(x,y-s*.38);g.lineTo(x+s*.36,y-s*.06);g.fill();g.strokeStyle='#fff';g.lineWidth=s*.03;g.strokeRect(x-s*.12,y+s*.06,s*.24,s*.26);g.beginPath();g.moveTo(x-s*.12,y+s*.06);g.lineTo(x+s*.12,y+s*.32);g.moveTo(x+s*.12,y+s*.06);g.lineTo(x-s*.12,y+s*.32);g.stroke();K.text('BONUS',x,y-s*.42,s*.14,'#ffd43b',{sw:s*.03})}}};
const KEYS=Object.keys(SYM);
const LINES=[[1,1,1,1,1],[0,0,0,0,0],[2,2,2,2,2],[0,1,2,1,0],[2,1,0,1,2],[0,0,1,2,2],[2,2,1,0,0],[1,0,0,0,1],[1,2,2,2,1],[1,0,1,2,1]];
const MACH=[
 {id:'pasture',n:'Highland Pasture',lvl:1,fs:[0,0,0,8,10,12],fsMult:2,bg:['#8fcf6a','#3e7a32'],frame:'#7a4a22',trim:'#e8c050',w:{mama:2,coo:3,donkey:3,dove:4,lamb:5,bible:5,cross:6,thistle:7,fish:7,cup:7,bell:2,barn:2}},
 {id:'kirk',n:'Kirk Bells',lvl:3,fs:[0,0,0,10,12,15],fsMult:2,bg:['#5c7cfa','#283a8a'],frame:'#4a3a2a',trim:'#d9dde2',w:{mama:2,coo:3,donkey:3,dove:4,lamb:5,bible:5,cross:6,thistle:7,fish:7,cup:7,bell:3,barn:2}},
 {id:'shepherd',n:"Shepherd's Hill",lvl:5,fs:[0,0,0,8,10,12],fsMult:3,bg:['#b2f2bb','#2b8a3e'],frame:'#5c3a21',trim:'#ffe066',w:{mama:2,coo:3,donkey:3,dove:4,lamb:7,bible:5,cross:6,thistle:6,fish:6,cup:6,bell:2,barn:2}},
 {id:'loch',n:'Loch Ness Night',lvl:8,fs:[0,0,0,10,12,15],fsMult:3,bg:['#1c2d5a','#0b1530'],frame:'#2b2b45',trim:'#74c0fc',w:{mama:3,coo:3,donkey:3,dove:4,lamb:5,bible:5,cross:6,thistle:7,fish:8,cup:6,bell:2,barn:2}},
 {id:'gates',n:'Heavenly Gates',lvl:12,fs:[0,0,0,12,15,20],fsMult:4,bg:['#fff3bf','#f08c00'],frame:'#c99a2e',trim:'#fff',w:{mama:3,coo:3,donkey:3,dove:5,lamb:5,bible:5,cross:6,thistle:6,fish:6,cup:6,bell:2,barn:2}}];
const BETS=[10,20,50,100,200,500];
const DEF={coins:2000,xp:0,bet:1,mach:'pasture',turbo:false,story:false,gift:'',best:0,spins:0};
let SV=Object.assign({},DEF,K.save.get('data',{}));const save=()=>K.save.set('data',SV);
const lvlOf=xp=>{let l=1,need=150,x=xp;while(x>=need){x-=need;l++;need=Math.round(need*1.22)}return{l,x,need}};
const SONG={bpm:120,wave:'triangle',lv:.04,drum:1,bass:[48,0,55,0,52,0,55,0,53,0,57,0,55,0,59,0],lead:[72,0,76,79,0,76,72,0,74,0,77,81,0,77,74,0,76,0,79,84,0,79,76,0,74,72,71,0,72,0,0,0]};
function strip(m){const s=[];for(const k in m.w)for(let i=0;i<m.w[k];i++)s.push(k);for(let i=s.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[s[i],s[j]]=[s[j],s[i]]}return s}
/* ---------- shared UI */
const BC={green:'#2b8a3e',blue:'#1864ab',red:'#c92a2a',gold:'#e8a400',plum:'#862e9c',grey:'#495057'};
function bigBtn(o){return K.button(Object.assign({r:18*K.S,fs:Math.min(o.h*.42,30*K.S)},o))}
function bgM(m){const gr=g.createLinearGradient(0,0,0,K.H);gr.addColorStop(0,m.bg[0]);gr.addColorStop(1,m.bg[1]);g.fillStyle=gr;g.fillRect(0,0,K.W,K.H);
 const S=K.S;if(m.id==='loch'){for(let i=0;i<30;i++){g.fillStyle='rgba(255,255,255,'+(.3+.3*Math.sin(K.t*2+i))+')';g.fillRect((i*137)%K.W,(i*71)%(K.H*.4),2*S,2*S)}}
 else if(m.id==='gates'){g.save();g.globalAlpha=.25;for(let i=0;i<12;i++){g.fillStyle='#fff';g.beginPath();g.moveTo(K.W/2,-20*S);g.lineTo(K.W/2+Math.cos(i/12*Math.PI)*K.W*1.4,K.H);g.lineTo(K.W/2+Math.cos((i+.4)/12*Math.PI)*K.W*1.4,K.H);g.fill()}g.restore()}
 else{g.fillStyle='rgba(255,255,255,.2)';for(let i=0;i<3;i++){const x=((K.t*10*(i+1)+i*300)%(K.W+200))-100;E(x,K.H*(.06+i*.05),40*S,12*S,'rgba(255,255,255,.35)')}}}
function panel(x,y,w,h){g.save();K.rr(x,y,w,h,16*K.S);g.fillStyle='rgba(255,250,238,.97)';g.fill();g.lineWidth=3*K.S;g.strokeStyle='#d9dde2';g.stroke();g.restore()}
function banner(x,y,w,h){g.save();K.rr(x,y,w,h,18*K.S);g.fillStyle='#2a1030';g.fill();g.lineWidth=4*K.S;g.strokeStyle='#ffd43b';g.stroke();for(let i=0;i<Math.floor(w/22/K.S);i++){const on=(i+Math.floor(K.t*6))%3===0;E(x+12*K.S+i*22*K.S,y+7*K.S,3.5*K.S,3.5*K.S,on?'#fff3bf':'#a07a20');E(x+12*K.S+i*22*K.S,y+h-7*K.S,3.5*K.S,3.5*K.S,on?'#fff3bf':'#a07a20')}g.restore();
 K.text("Mama MacGregor's",x+w/2,y+h*.33,Math.min(28*K.S,w/12),'#ffc9e8',{maxW:w-30*K.S});K.text('SLOTS 2',x+w/2,y+h*.7,Math.min(48*K.S,w/6),'#ffd43b',{maxW:w-30*K.S,stroke:'#7a1020'})}
function curM(){return MACH.find(m=>m.id===SV.mach)||MACH[0]}
/* ---------- TITLE */
const Title={enter(){K.music.play(SONG);const d=new Date().toDateString();if(SV.gift!==d){SV.gift=d;save();this.gift=true}},
 draw(){const S=K.S,W=K.W,H=K.H,P=K.portrait,sf=K.safe;const m=curM();bgM(m);let tb;const lv=lvlOf(SV.xp).l;
  if(P){tb={x:16*S,y:sf.t+72*S,w:W-32*S,h:Math.min(130*S,H*.15)};banner(tb.x,tb.y,tb.w,tb.h);const bw=Math.min(W-36*S,380*S),bh=82*S,gap=14*S;const btnTop=H-sf.b-20*S-(bh+gap+64*S);const floorY=btnTop-24*S;
   K.text('🪙 '+SV.coins.toLocaleString()+'   ⭐ Level '+lv,W/2,tb.y+tb.h+24*S,22*S,'#fff');const mh=Math.min(floorY-(tb.y+tb.h)-62*S,300*S);
   const mm=M.draw(W/2,floorY,mh,{mode:'wave'});K.markChar(mm.x,mm.y,mm.w,mm.h,'mama');const sh=M.sheep(W*.17,floorY,mh*.25,{dir:1});K.markChar(sh.x,sh.y,sh.w,sh.h,'sheep');const c=M.coo(W*.84,floorY,mh*.34,{dir:-1});K.markChar(c.x,c.y,c.w,c.h,'coo');
   bigBtn({id:'play',x:(W-bw)/2,y:btnTop,w:bw,h:bh,label:'▶ PLAY SLOTS',color:BC.red,primary:true,fs:34*S,cb:startPlay});const hw=(bw-gap)/2;
   bigBtn({id:'machines',x:(W-bw)/2,y:btnTop+bh+gap,w:hw,h:64*S,label:'🎰 Machines',color:BC.blue,fs:23*S,cb:()=>K.go(Machines)});bigBtn({id:'opts',x:(W-bw)/2+hw+gap,y:btnTop+bh+gap,w:hw,h:64*S,label:'📜 Prizes',color:BC.plum,fs:23*S,cb:()=>K.go(Paytable)})}
  else{tb={x:sf.l+14*S,y:sf.t+10*S,w:W*.5-28*S,h:Math.min(110*S,H*.27)};banner(tb.x,tb.y,tb.w,tb.h);const floorY=H-sf.b-14*S;const mh=Math.min(floorY-(tb.y+tb.h)-14*S,260*S);
   const mm=M.draw(tb.x+tb.w*.5,floorY,mh,{mode:'wave'});K.markChar(mm.x,mm.y,mm.w,mm.h,'mama');const sh=M.sheep(tb.x+tb.w*.12,floorY,mh*.28,{dir:1});K.markChar(sh.x,sh.y,sh.w,sh.h,'sheep');const c=M.coo(tb.x+tb.w*.9,floorY,mh*.4,{dir:-1});K.markChar(c.x,c.y,c.w,c.h,'coo');
   const bw=Math.min(W*.4,360*S),x=W*.55+(W*.45-bw)/2-sf.r/2,bh=Math.min(80*S,H*.2),gap=12*S;let y=Math.max(sf.t+76*S,(H-(bh+gap+60*S))/2+10*S);
   K.text('🪙 '+SV.coins.toLocaleString()+'   ⭐ Level '+lv,x+bw/2,y-26*S,22*S,'#fff');bigBtn({id:'play',x,y,w:bw,h:bh,label:'▶ PLAY SLOTS',color:BC.red,primary:true,fs:32*S,cb:startPlay});const hw=(bw-gap)/2;
   bigBtn({id:'machines',x,y:y+bh+gap,w:hw,h:58*S,label:'🎰 Machines',color:BC.blue,fs:21*S,cb:()=>K.go(Machines)});bigBtn({id:'opts',x:x+hw+gap,y:y+bh+gap,w:hw,h:58*S,label:'📜 Prizes',color:BC.plum,fs:21*S,cb:()=>K.go(Paytable)})}
  const s=54*S;K.button({id:'mute',x:W-sf.r-s-10*S,y:sf.t+10*S,w:s,h:s,r:s/2,label:K.muted?'🔇':'🔊',fs:24*S,color:'#5f3dc4',cb:()=>K.toggleMute()});
  K.button({id:'help',x:W-sf.r-2*s-20*S,y:sf.t+10*S,w:s,h:s,r:s/2,label:'❓',fs:24*S,color:'#1971c2',cb:()=>K.go(Paytable)});
  const avoid=K.btns.concat(K.charRects,[tb]);for(const c of ['tl','bl','br'])if(K.drawLogo(c,72*S,avoid))break;
  if(this.gift){const gw=Math.min(W-40*S,380*S),gh=200*S,gx=(W-gw)/2,gy=(H-gh)/2;g.fillStyle='rgba(0,0,0,.55)';g.fillRect(0,0,W,H);panel(gx,gy,gw,gh);K.text("☕ Mama's gift",W/2,gy+38*S,28*S,'#5a3a24',{stroke:false});K.text('Tea, shortbread and 🪙 500 coins!',W/2,gy+82*S,20*S,'#333',{stroke:false,maxW:gw-20*S});
   K.btns.length=0;bigBtn({id:'thanks',x:gx+30*S,y:gy+gh-80*S,w:gw-60*S,h:62*S,label:'Thank you, Mama!',color:BC.green,primary:true,cb:()=>{this.gift=false;SV.coins+=500;save();K.sfx.coin()}})}},back(){}};
function startPlay(){if(!SV.story){SV.story=true;save();K.go(storyScene(()=>K.go(Play)));return}K.go(Play)}
function storyScene(done){const m=MACH[0];const sc=f=>t=>{bgM(m);const fy=K.H*.62;g.fillStyle='rgba(0,0,0,.2)';g.fillRect(0,fy,K.W,4*K.S);f(t,fy)};const mh=()=>Math.min(K.H*.42,K.W*.62);
 return K.storyScene([
  {who:'Mama MacGregor',text:"Well hello, dearie! Mama's got brand new slot machines on the farm, and they're all for fun. Pretend coins only!",draw:sc((t,fy)=>M.draw(K.W/2,fy,mh(),{mode:'wave',talk:1}))},
  {who:'Mama MacGregor',text:"Just tap the big SPIN button. Line up matching pictures from the left and you win coins. I'm WILD, so I count as anything!",draw:sc((t,fy)=>{M.draw(K.W*.32,fy,mh(),{mode:'lever',lever:(Math.sin(t/12)+1)/2,talk:1});SYM.mama.draw(K.W*.72,fy-mh()*.6,K.W*.25)})},
  {who:'Mama MacGregor',text:"Three bells give you free spins. Three barns open Mama's Barn bonus, where you pick a barn for a prize!",draw:sc((t,fy)=>{M.draw(K.W*.3,fy,mh(),{mode:'point',talk:1});SYM.bell.draw(K.W*.62,fy-mh()*.6,K.W*.2);SYM.barn.draw(K.W*.84,fy-mh()*.6,K.W*.2)})},
  {who:'Mama MacGregor',text:"Win to level up and open new machines. Good luck, dearie!",draw:sc((t,fy)=>{M.draw(K.W*.5,fy,mh(),{mode:'dance'});M.sheep(K.W*.18,fy,mh()*.25,{dir:1,ph:t/40,moving:true});M.coo(K.W*.84,fy,mh()*.32,{dir:-1,ph:t/40,moving:true})})}],done,{fs:23,edge:'#c92a2a'})}
/* ---------- MACHINES */
const Machines={draw(){const S=K.S,W=K.W,H=K.H,sf=K.safe,P=K.portrait;bgM(MACH[0]);const lv=lvlOf(SV.xp).l;
 K.button({id:'back',x:sf.l+10*S,y:sf.t+10*S,w:110*S,h:56*S,label:'⬅ Back',color:BC.grey,fs:22*S,cb:()=>K.go(Title)});K.text('Pick a Machine',W/2+40*S,sf.t+38*S,30*S,'#fff');
 const cols=P?1:2,gap=12*S,top=sf.t+78*S,rowsN=Math.ceil(MACH.length/cols),cw=(W-sf.l-sf.r-28*S-gap*(cols-1))/cols,ch=Math.min((H-top-sf.b-12*S-gap*(rowsN-1))/rowsN,120*S);
 MACH.forEach((m,i)=>{const x=sf.l+14*S+(i%cols)*(cw+gap),y=top+Math.floor(i/cols)*(ch+gap),lock=lv<m.lvl;
  K.button({id:'m-'+m.id,x,y,w:cw,h:ch,dis:lock,primary:m.id===SV.mach,cb:()=>{SV.mach=m.id;save();K.go(Play)},draw:(b)=>{g.save();K.rr(0,0,b.w,b.h,16*S);const gr=g.createLinearGradient(0,0,b.w,0);gr.addColorStop(0,m.bg[0]);gr.addColorStop(1,m.bg[1]);g.fillStyle=lock?'#555':gr;g.fill();g.lineWidth=3*S;g.strokeStyle=m.id===SV.mach?'#ffd43b':'#fff';g.stroke();g.restore();
   const fs=Math.min(26*S,b.h*.28);K.text(m.n,16*S,b.h*.32,fs,'#fff',{al:'left',maxW:b.w*.55});K.text(lock?'🔒 Reach level '+m.lvl:'Free spins ×'+m.fsMult,16*S,b.h*.72,fs*.75,lock?'#ddd':'#fff3bf',{al:'left'});
   const ss=Math.min(b.h*.55,b.w*.13);['mama','coo','bell'].forEach((k,j)=>{if(!lock)SYM[k].draw(b.w-(j+.6)*ss*1.1-6*S,b.h/2,ss)})}})})},back(){K.go(Title)}};
/* ---------- PAYTABLE / HELP */
const Paytable={draw(){const S=K.S,W=K.W,H=K.H,sf=K.safe,P=K.portrait;bgM(curM());K.button({id:'back',x:sf.l+10*S,y:sf.t+10*S,w:110*S,h:56*S,label:'⬅ Back',color:BC.grey,fs:22*S,cb:()=>K.go(K._from||Title)});K.text('Prizes',W/2+40*S,sf.t+38*S,30*S,'#fff');
 const x0=sf.l+12*S,w=W-sf.l-sf.r-24*S,y0=sf.t+76*S,h=H-y0-sf.b-10*S;panel(x0,y0,w,h);const list=KEYS.filter(k=>!SYM[k].scatter);const cols=P?1:2,rowsN=Math.ceil((list.length+3)/cols),rh=Math.min(h/rowsN,64*S),cw=w/cols;
 const fs=Math.min(20*S,rh*.36);list.forEach((k,i)=>{const cx=x0+(i%cols)*cw,cy=y0+8*S+Math.floor(i/cols)*rh;SYM[k].draw(cx+rh*.6,cy+rh/2,rh*.85);const p=SYM[k].pay;K.text('3 = '+p[3]+'   4 = '+p[4]+'   5 = '+p[5],cx+rh*1.25,cy+rh/2,fs,'#222',{al:'left',stroke:false,maxW:cw-rh*1.4})});
 const i0=list.length;const notes=[['bell','3 or more anywhere = FREE SPINS'],['barn','3 barns = Mama\u2019s Barn bonus'],[null,'Prizes are × your line bet (bet ÷ 10). Mama is WILD.']];
 notes.forEach((nt,j)=>{const i=i0+j,cx=x0+(i%cols)*cw,cy=y0+8*S+Math.floor(i/cols)*rh;if(nt[0])SYM[nt[0]].draw(cx+rh*.6,cy+rh/2,rh*.85);K.text(nt[1],cx+(nt[0]?rh*1.25:14*S),cy+rh/2,fs,'#222',{al:'left',stroke:false,maxW:cw-rh*1.4})})},back(){K.go(K._from||Title)}};
/* ---------- PLAY */
let R=null;
const Play={play:true,
 enter(){const m=curM();this.m=m;this.paused=false;if(!R||R.mid!==m.id){R={mid:m.id,strips:[0,1,2,3,4].map(()=>strip(m)),pos:[0,0,0,0,0].map(()=>Math.floor(Math.random()*40)),off:[0,0,0,0,0],spin:[false,false,false,false,false],stopAt:[0,0,0,0,0],t:0,win:0,lines:[],fs:0,fsTot:0,fsWin:0,auto:0,msg:'Tap SPIN when you\u2019re ready, dearie!',msgT:99,lever:0,big:0,dance:0}}
  K.music.play(SONG);K._from=Play},
 bet(){return BETS[SV.bet]},
 grid(){return R.strips.map((s,r)=>[0,1,2].map(k=>s[(R.pos[r]+k)%s.length]))},
 spin(){if(R.spinning||R.big>0)return;const bet=this.bet();if(!R.fs){if(SV.coins<bet){if(SV.coins<BETS[0]){SV.coins+=1000;save();R.msg='Mama topped you up with 🪙 1,000. Pretend coins!';R.msgT=4;K.sfx.coin()}else{while(SV.bet>0&&SV.coins<BETS[SV.bet])SV.bet--;save()}return}SV.coins-=bet;save()}
  else{R.fs--}
  R.spinning=true;R.win=0;R.lines=[];R.lever=1;R.t=0;const sp=SV.turbo?.45:1;for(let r=0;r<5;r++){R.spin[r]=true;R.stopAt[r]=(.7+r*.32)*sp;R.target=R.target||[];R.target[r]=Math.floor(Math.random()*R.strips[r].length)}
  K.tone(300,.2,{type:'sawtooth',v:.05,f2:600});SV.spins++;R.msg=R.fs>0||R.fsTot?'Free spin! '+R.fs+' left':'Spinning… good luck!';R.msgT=99},
 update(dt){if(!R)return;R.t+=dt;R.lever=Math.max(0,R.lever-dt*2.2);if(R.big>0){R.big-=dt;if(R.big<=0&&window.__T&&__T.bot)R.big=0}if(R.dance>0)R.dance-=dt;
  if(R.spinning){let all=true;for(let r=0;r<5;r++){if(!R.spin[r])continue;all=false;R.off[r]+=dt*18;if(R.off[r]>=1){R.off[r]-=1;R.pos[r]=(R.pos[r]+R.strips[r].length-1)%R.strips[r].length}
    if(R.t>=R.stopAt[r]){R.spin[r]=false;R.pos[r]=R.target[r];R.off[r]=0;R.bounce=R.bounce||[];R.bounce[r]=1;K.tone(200+r*40,.08,{type:'square',v:.06})}}
   if(all){R.spinning=false;this.evaluate()}}
  if(R.bounce)for(let r=0;r<5;r++)if(R.bounce[r]>0)R.bounce[r]=Math.max(0,R.bounce[r]-dt*4);
  // free spins and auto run by themselves
  if(!R.spinning&&R.big<=0&&!this.paused){R.wait=(R.wait||0)+dt;if((R.fs>0||R.auto>0||(window.__T&&__T.bot))&&R.wait>(R.win>0?1.3:.7)){if(R.auto>0&&!R.fs)R.auto--;R.wait=0;if(R.fs===0&&R.fsTot&&R.fsDone){}this.spin()}}else R.wait=0},
 evaluate(){const G=this.grid(),m=this.m,bet=this.bet(),lb=bet/10,mult=R.fsTot&&(R.fs>0||R.fsActive)?m.fsMult:1;let tot=0;R.lines=[];
  LINES.forEach((L,li)=>{const sy=L.map((row,r)=>G[r][row]);let base=sy.find(s=>s!=='mama'&&!SYM[s].scatter)||'mama';if(SYM[base].scatter)return;let n=0;for(const s of sy){if(s===base||s==='mama')n++;else break}
   if(n>=3){const p=SYM[base].pay[n]*lb*mult;if(p>0){tot+=p;R.lines.push({li,n,sym:base,pay:p})}}});
  const cnt=k=>G.reduce((a,col)=>a+col.filter(s=>s===k).length,0);const bells=cnt('bell'),barns=[0,2,4].filter(r=>G[r].includes('barn')).length;
  if(R.fsActive&&R.fs===0){R.fsActive=false}
  if(tot>0){SV.coins+=Math.round(tot);R.win=Math.round(tot);if(R.fsActive||R.fsTot)R.fsWin=(R.fsWin||0)+R.win;const top=R.lines.sort((a,b)=>b.pay-a.pay)[0];
   R.msg=top.n+' '+plur(SYM[top.sym].n.replace(' (wild)',''))+' in a row! You win 🪙 '+R.win.toLocaleString();R.msgT=99;K.sfx.win();
   if(R.win>=bet*10){R.big=window.__T&&__T.bot?.3:3.2;R.dance=3.2;R.auto=0;K.burst(K.W/2,K.H*.4,90,{sp:7,col:['#ffd43b','#fff3bf','#fab005']})}else{R.dance=1.2;K.burst(K.W/2,K.H*.45,24,{col:['#ffd43b','#fab005']})}
   if(top.sym==='coo')K.tone(140,.5,{type:'sawtooth',v:.08,f2:110});if(top.sym==='donkey'){K.tone(500,.25,{type:'sawtooth',v:.07,f2:300});K.tone(300,.3,{type:'sawtooth',v:.07,f2:500,at:.25})}}
  else{R.msg=K.pick(['Not this time, dearie. Spin again!','Ooh, so close!','Keep going, dearie!','The next one could be it!']);R.msgT=99}
  if(bells>=3){const n=m.fs[Math.min(5,bells)];R.fs+=n;R.fsTot=(R.fsTot||0)+n;R.fsActive=true;R.auto=0;R.msg='🔔 '+bells+' bells! '+n+' FREE SPINS at ×'+m.fsMult+'!';R.msgT=99;K.sfx.win()}
  if(R.fsTot&&!R.fsActive&&R.fs===0&&bells<3){R.msg='Free spins done! You won 🪙 '+(R.fsWin||0).toLocaleString();R.fsTot=0;R.fsWin=0}
  SV.xp+=Math.max(1,Math.round(bet/10))+(R.win>0?2:0);SV.best=Math.max(SV.best,R.win);save();
  if(barns>=3){R.auto=0;setTimeout(()=>K.go(Bonus,{bet}),900)}},
 lay(){const S=K.S,W=K.W,H=K.H,sf=K.safe,P=K.portrait,L={};
  if(P){L.top={h:sf.t+60*S};L.mama={x:8*S,y:L.top.h+4*S,w:W-16*S,h:130*S};const rw=W-16*S;L.reels={x:8*S,y:L.mama.y+L.mama.h+8*S,w:rw,h:Math.min(rw*.66,H*.3)};
   L.msg={x:8*S,y:L.reels.y+L.reels.h+6*S,w:W-16*S,h:58*S};L.bet={x:8*S,y:L.msg.y+L.msg.h+8*S,w:W-16*S,h:62*S};L.spin={x:8*S,y:L.bet.y+L.bet.h+10*S,w:W-16*S,h:Math.min(96*S,H-sf.b-(L.bet.y+L.bet.h+10*S)-70*S)};L.bot={x:8*S,y:L.spin.y+L.spin.h+10*S,w:W-16*S,h:56*S}}
  else{L.top={h:sf.t+50*S};const lw=Math.min(W*.56,(H-L.top.h-sf.b-12*S)*1.5+16*S);L.reels={x:sf.l+8*S,y:L.top.h+6*S,w:lw,h:Math.min(lw*.66,H-L.top.h-sf.b-80*S)};L.msg={x:sf.l+8*S,y:L.reels.y+L.reels.h+6*S,w:lw,h:H-sf.b-(L.reels.y+L.reels.h+12*S)};
   const rx=sf.l+lw+20*S,rw=W-rx-sf.r-10*S;L.mama={x:rx,y:L.top.h+4*S,w:rw,h:Math.min(110*S,H*.27)};L.bet={x:rx,y:L.mama.y+L.mama.h+6*S,w:rw,h:52*S};L.spin={x:rx,y:L.bet.y+L.bet.h+8*S,w:rw,h:Math.max(60*S,H-sf.b-(L.bet.y+L.bet.h+8*S)-62*S)};L.bot={x:rx,y:H-sf.b-52*S,w:rw,h:48*S}}
  return L},
 draw(){if(!R)return;const S=K.S,W=K.W,H=K.H,sf=K.safe,m=this.m,L=this.lay();bgM(m);
  g.fillStyle='rgba(0,0,0,.4)';g.fillRect(0,0,W,L.top.h);const ty=sf.t+(L.top.h-sf.t)/2;K.text('🪙 '+SV.coins.toLocaleString(),sf.l+12*S,ty,26*S,'#ffd43b',{al:'left'});K.text(m.n,W/2+20*S,ty,17*S,'#fff',{maxW:W*.36});
  const pb=46*S;K.button({id:'pause',x:W-sf.r-pb-10*S,y:ty-pb/2,w:pb,h:pb,r:pb/2,label:'⏸',fs:20*S,color:'#e8590c',cb:()=>this.pause()});
  // Mama + lever + bubble
  const Mm=L.mama;g.save();K.rr(Mm.x,Mm.y,Mm.w,Mm.h,14*S);g.fillStyle='rgba(0,0,0,.25)';g.fill();g.restore();const mh=Mm.h*.96;const mx=Mm.x+mh*.22;
  const mode=R.dance>0?'dance':R.lever>0?'lever':R.spinning?'clap':'idle';const lv=R.lever;
  // lever post beside Mama
  const lx=mx+mh*.3,ly=Mm.y+Mm.h*.6;g.fillStyle='#868e96';g.fillRect(lx-3*S,ly,6*S,Mm.h*.38);const la=-.9+lv*1.6;const kx=lx+Math.sin(la)*mh*.3,ky=ly-Math.cos(la)*mh*.3;g.strokeStyle='#adb5bd';g.lineWidth=5*S;g.beginPath();g.moveTo(lx,ly);g.lineTo(kx,ky);g.stroke();E(kx,ky,8*S,8*S,'#e03131');
  const mm=M.draw(mx,Mm.y+Mm.h-2*S,mh,{mode,lever:1-lv,talk:R.msgT>0&&R.t<2});K.markChar(mm.x,mm.y,mm.w,mm.h,'mama');
  const bx=lx+mh*.32,bw=Mm.x+Mm.w-bx-8*S;if(bw>60*S){g.save();K.rr(bx,Mm.y+10*S,bw,Mm.h-20*S,14*S);g.fillStyle='#fffaf0';g.fill();g.restore();K.textBox(R.fs>0?'FREE SPINS: '+R.fs+' left  ×'+m.fsMult:'Win: 🪙 '+R.win.toLocaleString(),bx+bw/2,Mm.y+Mm.h*.32,bw-16*S,Math.min(22*S,Mm.h*.2),R.fs>0?'#c92a2a':'#2b8a3e',{vc:true,stroke:false});
   K.textBox('Bet 🪙 '+this.bet()+'  ·  Level '+lvlOf(SV.xp).l,bx+bw/2,Mm.y+Mm.h*.7,bw-16*S,Math.min(18*S,Mm.h*.16),'#555',{vc:true,stroke:false,w:700})}
  // reels
  const Rr=L.reels;g.save();K.rr(Rr.x,Rr.y,Rr.w,Rr.h,18*S);g.fillStyle=m.frame;g.fill();g.lineWidth=5*S;g.strokeStyle=m.trim;g.stroke();g.restore();
  const pad=10*S,cw=(Rr.w-pad*2)/5,chh=(Rr.h-pad*2)/3;g.save();K.rr(Rr.x+pad,Rr.y+pad,Rr.w-pad*2,Rr.h-pad*2,10*S);g.clip();g.fillStyle='#fffaf0';g.fillRect(Rr.x,Rr.y,Rr.w,Rr.h);
  for(let r=0;r<5;r++){const s=R.strips[r],x=Rr.x+pad+r*cw;const bo=R.bounce&&R.bounce[r]?Math.sin(R.bounce[r]*Math.PI)*8*S:0;for(let k=-1;k<4;k++){const sym=s[(R.pos[r]+k+s.length)%s.length];const y=Rr.y+pad+(k+R.off[r])*chh+bo;
    if(R.spin[r]){g.globalAlpha=.7}SYM[sym].draw(x+cw/2,y+chh/2,Math.min(cw,chh)*.92);g.globalAlpha=1}
   if(r)g.fillStyle='rgba(0,0,0,.12)',g.fillRect(x-1*S,Rr.y,2*S,Rr.h)}
  g.restore();
  if(!R.spinning&&R.lines.length){const ln=R.lines[Math.floor(R.t*1.2)%R.lines.length];const Lr=LINES[ln.li];g.save();g.strokeStyle='#e03131';g.lineWidth=6*S;g.lineCap='round';g.lineJoin='round';g.globalAlpha=.85;g.beginPath();Lr.forEach((row,r)=>{const x=Rr.x+pad+r*cw+cw/2,y=Rr.y+pad+row*chh+chh/2;r?g.lineTo(x,y):g.moveTo(x,y)});g.stroke();g.restore();
   for(let r=0;r<ln.n;r++){const x=Rr.x+pad+r*cw,y=Rr.y+pad+Lr[r]*chh;g.strokeStyle='#ffd43b';g.lineWidth=4*S;K.rr(x+3*S,y+3*S,cw-6*S,chh-6*S,8*S);g.stroke()}}
  // message
  const Ms=L.msg;K.textBox(R.msg,Ms.x+Ms.w/2,Ms.y+Ms.h/2,Ms.w-16*S,Math.min(21*S,Ms.h*.36),'#fff',{vc:true});
  // bet row
  const B=L.bet,bwid=B.h*1.15;bigBtn({id:'minus',x:B.x,y:B.y,w:bwid,h:B.h,label:'−',fs:34*S,color:BC.grey,dis:R.spinning||SV.bet===0||R.fs>0,cb:()=>{SV.bet=Math.max(0,SV.bet-1);save()}});
  bigBtn({id:'plus',x:B.x+B.w-bwid,y:B.y,w:bwid,h:B.h,label:'+',fs:34*S,color:BC.grey,dis:R.spinning||SV.bet===BETS.length-1||R.fs>0,cb:()=>{SV.bet=Math.min(BETS.length-1,SV.bet+1);save()}});
  g.save();K.rr(B.x+bwid+8*S,B.y,B.w-2*bwid-16*S,B.h,14*S);g.fillStyle='rgba(0,0,0,.45)';g.fill();g.restore();K.text('Bet 🪙 '+this.bet(),B.x+B.w/2,B.y+B.h/2,Math.min(26*S,B.h*.45),'#fff');
  // SPIN
  const Sp=L.spin,can=!R.spinning&&R.big<=0;bigBtn({id:'spin',x:Sp.x,y:Sp.y,w:Sp.w,h:Sp.h,label:R.fs>0?'FREE SPIN':R.auto>0?'STOP AUTO ('+R.auto+')':'SPIN',fs:Math.min(46*S,Sp.h*.48),color:R.auto>0?BC.grey:'#e03131',primary:true,dis:!can&&R.auto<=0,cb:()=>{if(R.auto>0){R.auto=0;return}this.spin()}});
  const Bt=L.bot,gap=10*S,hw=(Bt.w-2*gap)/3;bigBtn({id:'auto',x:Bt.x,y:Bt.y,w:hw,h:Bt.h,label:'Auto ×10',fs:20*S,color:BC.blue,dis:R.spinning||R.fs>0,cb:()=>{R.auto=10;this.spin()}});
  bigBtn({id:'turbo',x:Bt.x+hw+gap,y:Bt.y,w:hw,h:Bt.h,label:SV.turbo?'Fast ✓':'Fast',fs:20*S,color:SV.turbo?BC.green:BC.grey,cb:()=>{SV.turbo=!SV.turbo;save()}});
  bigBtn({id:'prizes',x:Bt.x+2*(hw+gap),y:Bt.y,w:hw,h:Bt.h,label:'📜 Prizes',fs:20*S,color:BC.plum,dis:R.spinning,cb:()=>K.go(Paytable)});
  if(R.big>0){K.btns.forEach(b=>b.hidden=true);g.fillStyle='rgba(0,0,0,.5)';g.fillRect(0,0,W,H);const s=1+Math.sin(K.t*8)*.05;K.text('BIG WIN!',W/2,H*.38,64*S*s,'#ffd43b',{stroke:'#7a1020'});K.text('🪙 '+R.win.toLocaleString(),W/2,H*.48,40*S,'#fff');
   const d=K.portrait?M.draw(W/2,H*.86,Math.min(H*.3,W*.5),{mode:'dance'}):M.draw(W*.16,H*.97,H*.55,{mode:'dance'});K.markChar(d.x,d.y,d.w,d.h,'mama');if(K.frame%4===0)K.burst(K.rnd(0,W),-10,2,{sp:2,grav:.1,col:['#ffd43b','#fab005'],life:90})}},
 down(p){if(R&&R.big>0&&R.big<2.6){R.big=0}},
 drawPause(){const S=K.S,W=K.W,H=K.H;g.fillStyle='rgba(0,0,0,.65)';g.fillRect(0,0,W,H);K.text('Paused',W/2,H*.2,44*S,'#fff');const bw=Math.min(W-60*S,340*S),bh=70*S,gap=14*S,x=(W-bw)/2;let y=Math.max(H*.28,(H-4*(bh+gap))/2);
  bigBtn({id:'resume',x,y,w:bw,h:bh,label:'▶ Keep playing',color:BC.green,primary:true,cb:()=>this.resume()});y+=bh+gap;
  bigBtn({id:'machines2',x,y,w:bw,h:bh,label:'🎰 Machines',color:BC.blue,cb:()=>{this.paused=false;K.go(Machines)}});y+=bh+gap;
  bigBtn({id:'mute2',x,y,w:bw,h:bh,label:K.muted?'🔇 Sound off':'🔊 Sound on',color:BC.plum,cb:()=>K.toggleMute()});y+=bh+gap;
  bigBtn({id:'home',x,y,w:bw,h:bh,label:'🏠 Home',color:BC.grey,cb:()=>{this.paused=false;K.go(Title)}})},
 padBtn(n,p){if(!p)return n==='a';if(this.paused)return false;if(n==='a'){const b=K.lastBtns.find(z=>z.id===K.focusId&&!z.dis);if(b&&b.id!=='spin')K.fire(b);else if(R.big>0)R.big=0;else if(R.auto>0)R.auto=0;else this.spin();return true}
  if(n==='lb'){SV.bet=Math.max(0,SV.bet-1);save();return true}if(n==='rb'){SV.bet=Math.min(BETS.length-1,SV.bet+1);save();return true}if(n==='x'){R.auto=10;this.spin();return true}},
 padDir(dx,dy,p){if(p&&!this.paused){K.moveFocus(dx,dy);return true}},
 key(k,d){if(d&&(k===' '||k==='Enter')&&!this.paused){if(R.big>0)R.big=0;else this.spin();return true}},
 pause(){if(!R.spinning){this.paused=true}},resume(){this.paused=false},back(){if(this.paused)this.resume();else this.pause()}};
/* ---------- BONUS: Mama's Barn — Mama walks (jointed legs, stride tied to speed) to the barn you pick */
const PRIZES=[{a:'🐑',n:'A wee lamb',x:5},{a:'🐮',n:'A Highland coo',x:12},{a:'🐴',n:'Dirty Gertie the donkey',x:8},{a:'🥚',n:'Golden eggs',x:20},{a:'🧈',n:'Mama\u2019s shortbread',x:6}];
const Bonus={enter(o){this.bet=o.bet;this.pick=-1;this.mx=K.W*(K.portrait?.07:.1);this.ph=0;this.state='choose';this.t=0;const pr=PRIZES.slice().sort(()=>Math.random()-.5);this.prizes=pr.slice(0,3)},
 barnX(i){return K.W*(.3+i*.25)},
 update(dt){this.t+=dt;if(this.state==='walk'){const tx=this.barnX(this.pick)-K.H*.06;const sp=Math.max(60*K.S,K.W*.18);const d=Math.min(Math.abs(tx-this.mx),sp*dt);this.dir=tx>this.mx?1:-1;this.mx+=d*this.dir;
   const legL=K.H*(K.portrait?.22:.5)*.39;this.ph=K.stepPhase(this.ph,d,legL*.75);if(Math.abs(tx-this.mx)<1){this.state='open';this.t=0;K.sfx.win();const p=this.prizes[this.pick];this.won=p.x*this.bet;SV.coins+=this.won;save()}}
  if(window.__T&&__T.bot&&this.state==='choose'&&this.t>.5)this.choose(1);if(window.__T&&__T.bot&&this.state==='open'&&this.t>1)K.go(Play)},
 choose(i){if(this.state!=='choose')return;this.pick=i;this.state='walk';K.sfx.click()},
 draw(){const S=K.S,W=K.W,H=K.H,sf=K.safe,P=K.portrait;bgM(MACH[2]);const fy=P?H*.62:H*.8;g.fillStyle='#69a84a';g.fillRect(0,fy,W,H-fy);
  K.text("Mama's Barn Bonus!",W/2,sf.t+40*S,32*S,'#fff');K.text(this.state==='choose'?'Pick a barn, dearie!':this.state==='walk'?'Off we go…':'You found: '+this.prizes[this.pick].n+'!',W/2,sf.t+80*S,22*S,'#fff3bf',{maxW:W-20*S});
  const bh=P?Math.min(H*.16,W*.2):H*.3;for(let i=0;i<3;i++){const x=this.barnX(i),open=this.state==='open'&&i===this.pick;const bw=bh*1.05;
   if(this.state==='choose')K.button({id:'barn'+i,x:x-bw*.55,y:fy-bh,w:bw*1.1,h:bh,primary:i===1,cb:()=>this.choose(i),draw:()=>{}});
   g.fillStyle='#c92a2a';g.fillRect(x-bw/2,fy-bh*.65,bw,bh*.65);g.fillStyle='#a51d1d';g.beginPath();g.moveTo(x-bw*.6,fy-bh*.62);g.lineTo(x,fy-bh);g.lineTo(x+bw*.6,fy-bh*.62);g.fill();
   if(open){g.fillStyle='#3b2314';g.fillRect(x-bw*.2,fy-bh*.45,bw*.4,bh*.45);K.text(this.prizes[i].a,x,fy-bh*.22,bh*.32,'#fff',{stroke:false})}else{g.strokeStyle='#fff';g.lineWidth=3*S;g.strokeRect(x-bw*.2,fy-bh*.45,bw*.4,bh*.45);g.beginPath();g.moveTo(x-bw*.2,fy-bh*.45);g.lineTo(x+bw*.2,fy);g.moveTo(x+bw*.2,fy-bh*.45);g.lineTo(x-bw*.2,fy);g.stroke();K.text(String(i+1),x,fy-bh*.8,bh*.14,'#fff')}}
  const mh=P?H*.22:H*.5;const mm=M.draw(this.mx,fy+2*S,mh,{mode:this.state==='walk'?'walk':this.state==='open'?'dance':'point',ph:this.ph,dir:this.dir||1});K.markChar(mm.x,mm.y,mm.w,mm.h,'mama');
  if(this.state==='open'){K.text('🪙 +'+this.won.toLocaleString(),W/2,P?fy+mh*.35:sf.t+120*S,40*S,'#ffd43b');if(this.t>.8){const bw=Math.min(W-60*S,320*S);bigBtn({id:'collect',x:(W-bw)/2,y:H-sf.b-90*S,w:bw,h:76*S,label:'Collect!',color:BC.green,primary:true,cb:()=>K.go(Play)})}}},
 back(){}};
/* ---------- boot */
K.initPad({});
window.__T={get scene(){return K.scene===Title?'title':K.scene===Play?'play':K.scene===Bonus?'bonus':K.scene===Machines?'machines':K.scene===Paytable?'paytable':'story'},get R(){return R},get SV(){return SV},Play,Title,Bonus,Machines,SYM,MACH,bot:false,
 force(cols){/* QA: force next stop symbols: cols = array of 5 symbol keys for middle row */R.force=cols},reset(){SV=JSON.parse(JSON.stringify(DEF));save()}};
function plur(w){if(/(Fish|Sheep)$/.test(w))return w;if(/(ss|sh|ch|x)$/.test(w))return w+'es';return w+'s'}
const _sp=Play.spin.bind(Play);Play.spin=function(){_sp();if(R&&R.force&&R.spinning){for(let r=0;r<5;r++){const s=R.strips[r];const want=R.force[r];let i=s.indexOf(want);if(i<0)i=0;R.target[r]=(i-1+s.length)%s.length}R.force=null}};
K.start(Title);
})();
