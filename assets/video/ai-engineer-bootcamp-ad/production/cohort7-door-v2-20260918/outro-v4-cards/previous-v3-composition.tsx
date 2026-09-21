import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
const ink='#101E24',cream='#F7F1E5',coral='#FF8267';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const ease=Easing.bezier(0.16,1,0.3,1);
const topics=[{name:'RAG',zh:'知识检索与上下文',start:30},{name:'Agent',zh:'工具调用 · MCP',start:54},{name:'企业级交付',zh:'评测 · 治理 · 部署',start:78}];
export const Outro:React.FC=()=>{
 const f=useCurrentFrame();
 const arrival=interpolate(f,[0,25],[0,1],{...clamp,easing:ease});
 const route=interpolate(f,[30,106],[0,1260],clamp);
 return <AbsoluteFill style={{backgroundColor:ink,color:cream,fontFamily:'"PingFang SC", "Heiti SC", sans-serif',overflow:'hidden'}}>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 88% 45%, #97634140, transparent 50%), radial-gradient(ellipse at 5% 0%, #3D697245, transparent 58%)'}}/>
  <svg width={1920} height={1080} style={{position:'absolute',opacity:0.13}}>
   {Array.from({length:10},(_,i)=><line key={i} x1={900} y1={560} x2={-800+i*440} y2={1080} stroke="#E9C99A" strokeWidth={1}/>)}
   {[700,770,860,970].map(y=><line key={y} x1={0} y1={y} x2={1920} y2={y} stroke="#E9C99A" strokeWidth={1}/>)}
  </svg>
  <div style={{position:'absolute',right:82,top:147,width:336,height:580,border:'1px solid #CFAD7730',boxShadow:'inset 0 0 70px #FFCA8510',opacity:arrival}}/>
  <div style={{position:'absolute',right:80,top:145,width:3,height:583,background:'#F9D69D',boxShadow:'0 0 35px 7px #F7C07850',opacity:arrival}}/>
  <div style={{position:'absolute',right:87,top:198,fontSize:264,lineHeight:1,fontWeight:200,letterSpacing:-24,color:'#F5E9CD12',opacity:arrival}}>07</div>
  <div style={{position:'absolute',left:116,top:75,display:'flex',alignItems:'center',gap:28,opacity:arrival}}>
   <Img src={staticFile('logo.png')} style={{width:238,height:70,objectFit:'contain',objectPosition:'left center'}}/>
   <div style={{height:29,width:1,background:'#FFF3'}}/>
   <span style={{fontSize:25,letterSpacing:4,color:'#C9C7BF'}}>AI ENGINEERING PROGRAM</span>
  </div>
  <div style={{position:'absolute',left:116,top:229,opacity:arrival,translate:`0 ${interpolate(f,[0,25],[35,0],{...clamp,easing:ease})}px`}}>
   <div style={{fontSize:135,fontWeight:650,letterSpacing:-6,lineHeight:1.08}}>AI Engineer<span style={{color:coral}}>.</span></div>
   <div style={{fontSize:59,fontWeight:500,letterSpacing:2,marginTop:27}}>系统学习，走向企业级交付。</div>
  </div>
  <div style={{position:'absolute',left:122,top:562,width:1270,height:1,background:'#F5E9CD25'}}/>
  <div style={{position:'absolute',left:122,top:561,width:route,height:3,background:`linear-gradient(90deg, ${coral}, #ECD1A1)`,boxShadow:'0 0 16px #FF826740'}}/>
  {topics.map((t,i)=>{
   const appear=interpolate(f,[t.start,t.start+18],[0,1],{...clamp,easing:ease});
   const active=interpolate(f,[t.start,t.start+6,t.start+22,t.start+40],[0,1,1,0.35],clamp);
   return <div key={t.name} style={{position:'absolute',left:116+i*478,top:545,width:434,opacity:appear,translate:`0 ${interpolate(f,[t.start,t.start+18],[24,0],{...clamp,easing:ease})}px`}}>
    <div style={{width:33,height:33,borderRadius:'50%',border:`1px solid ${coral}`,background:ink,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 0 ${active*24}px #FF826730`}}><div style={{width:9,height:9,borderRadius:'50%',background:coral}}/></div>
    <div style={{fontSize:24,color:'#BAAEA0',letterSpacing:3,marginTop:32}}>0{i+1}</div>
    <div style={{fontSize:i===2?58:68,fontWeight:600,marginTop:8,color:cream,letterSpacing:-1}}>{t.name}</div>
    <div style={{fontSize:32,color:'#AEB9B7',marginTop:18}}>{t.zh}</div>
   </div>;
  })}
  <div style={{position:'absolute',left:116,right:116,bottom:77,display:'flex',justifyContent:'space-between',alignItems:'center',opacity:interpolate(f,[100,120],[0,1],clamp),translate:`0 ${interpolate(f,[100,120],[16,0],{...clamp,easing:ease})}px`}}>
   <div style={{fontSize:32,color:'#D7D6CD',letterSpacing:1}}><span style={{color:'#FFD6AD'}}>三年打磨</span><span style={{margin:'0 23px',color:'#6C7C7D'}}>/</span>面向全球华人开发者</div>
   <div style={{display:'flex',alignItems:'center',gap:25,padding:'19px 30px',borderRadius:5,background:coral,color:ink,fontSize:36,fontWeight:600}}><span>第七期</span><span style={{fontSize:40,fontWeight:400}}>↗</span></div>
  </div>
  <div style={{position:'absolute',inset:0,background:ink,translate:`${interpolate(f,[0,18],[0,1920],{...clamp,easing:ease})}px`,borderLeft:'2px solid #EDC895',boxShadow:'-30px 0 70px #E1A96B20'}}/>
 </AbsoluteFill>;
};
