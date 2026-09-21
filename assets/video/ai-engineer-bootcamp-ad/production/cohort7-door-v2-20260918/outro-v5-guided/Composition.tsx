import React from 'react';
import {AbsoluteFill, Img, interpolate, Easing, staticFile, useCurrentFrame} from 'remotion';
const C={dark:'#17211F',paper:'#F8F7EF',lime:'#D8F590',line:'#17211F',muted:'#65716B'};
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const ease=Easing.bezier(.16,1,.3,1);
const lerp=(f:number,a:number,b:number,x:number,y:number)=>interpolate(f,[a,b],[x,y],{...clamp,easing:ease});
const Row:React.FC<{n:string;text:string}>=({n,text})=><div style={{display:'flex',alignItems:'center',gap:20,padding:'20px 0',borderBottom:'1px solid #17211F22'}}><span style={{fontSize:24,fontFamily:'monospace',color:C.muted}}>{n}</span><span style={{fontSize:31,fontWeight:600}}>{text}</span></div>;
const Card:React.FC<{index:number;frame:number}>=({index:i,frame:f})=>{
 const enter=lerp(f,6+i*5,29+i*5,0,1);
 const spread=lerp(f,20,59,0,1);
 const active=i===0?f<65:i===1?f>=65&&f<123:f>=123;
 const x=[148,650,1152][i];
 const rotation=[-8,0,8][i]*spread;
 const top=[317,274,317][i];
 const titles=['AI CODING · 项目起步','AI CAPABILITIES · 持续升级','PRODUCTION · 交付实践'];
 const weeks=['W1–W3','W4–W9','W10–W13'];
 const focus=lerp(f,i===0?18:i===1?64:123,i===0?36:i===1?81:139,0,1);
 return <div style={{position:'absolute',left:650+(x-650)*spread,top:top+70*(1-enter)-(active?14:0),width:620,height:626,background:C.paper,color:C.dark,border:`4px solid ${C.line}`,outline:'3px solid #F8F7EF',borderRadius:26,boxShadow:'13px 15px 0 #050B0999, 0 22px 55px #0005',rotate:`${rotation}deg`,scale:.92+.08*enter,opacity:enter,transformOrigin:'center 70%',overflow:'hidden',zIndex:active?40:i===1?30:20}}>
  <div style={{height:69,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 22px',background:i===1?C.dark:'#EDEEE4',color:i===1?C.paper:C.dark,borderBottom:`3px solid ${C.line}`}}>
   <div style={{display:'flex',gap:7}}>{[0,1,2].map(n=><span key={n} style={{width:11,height:11,borderRadius:20,border:`2px solid ${i===1?C.paper:C.dark}`,background:n===0?C.lime:'transparent'}}/>)}</div>
   <div style={{fontFamily:'monospace',fontSize:20,fontWeight:700}}>{titles[i]}</div>
   <span style={{fontSize:17,padding:'6px 9px',background:C.lime,color:C.dark,borderRadius:20,border:`2px solid ${C.dark}`,fontWeight:700}}>{weeks[i]}</span>
  </div>
  <div style={{padding:'29px 34px'}}>
   <div style={{fontSize:20,letterSpacing:2,color:C.muted,fontFamily:'monospace'}}>CAREKIND / 同一个项目</div>
   {i===0?<>
    <div style={{fontSize:65,fontWeight:800,letterSpacing:-3,marginTop:13}}>AI Coding</div>
    <div style={{fontSize:32,fontWeight:600,margin:'7px 0 20px'}}>从想法，到可运行 MVP。</div>
    <div style={{background:'#E9EFEA',border:'2px solid #17211F',borderRadius:12,padding:'14px 19px',fontSize:25,fontFamily:'monospace',marginBottom:10}}><span style={{color:'#66823B'}}>&gt; </span>CareKind.project <span style={{opacity:f%24<13?1:0}}>▌</span></div>
    <Row n="01" text="明确需求与验收"/><Row n="02" text="搭建产品界面"/><Row n="03" text="跑通业务流程"/>
   </>:i===1?<>
    <div style={{fontSize:49,fontWeight:800,lineHeight:1.25,marginTop:14}}>一步步接入<br/><span style={{background:C.lime,padding:'0 8px'}}>AI 能力。</span></div>
    <div style={{marginTop:30,display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>{['Voice AI','RAG','MCP Tools','Agent'].map((t,n)=><div key={t} style={{padding:'17px 14px',border:'2px solid #17211F',borderRadius:12,fontSize:29,fontWeight:650,background:n===3?C.lime:'#FFF',opacity:lerp(f,38+n*10,49+n*10,0,1),translate:`0 ${lerp(f,38+n*10,49+n*10,15,0)}px`}}>{t}</div>)}</div>
    <div style={{fontSize:27,lineHeight:1.6,marginTop:25,color:'#4D5B53'}}>先建立评测，再验证 RAG。<br/>让每一步升级，都有依据。</div>
   </>:<>
    <div style={{fontSize:54,fontWeight:800,lineHeight:1.2,marginTop:16}}>做成能交付的<br/><span style={{background:C.lime,padding:'0 8px'}}>企业级项目。</span></div>
    <div style={{marginTop:27}}>{['Memory · Harness · Routing','评测 / 安全 / 故障演练','Demo Day · 项目答辩'].map((t,n)=><div key={t} style={{display:'flex',alignItems:'center',gap:15,padding:'21px 0',fontSize:n===0?25:30,fontWeight:600,borderBottom:'1px solid #17211F22'}}><span style={{width:22,height:22,border:'2px solid #17211F',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',background:focus>.2?C.lime:'transparent',fontSize:16}}>↗</span>{t}</div>)}</div>
    <div style={{marginTop:22,fontSize:22,color:C.muted}}>项目实践与验收 · 贯穿 13 周</div>
   </>}
  </div>
  <div style={{position:'absolute',bottom:0,height:7,left:0,width:620*focus,background:C.lime}}/>
 </div>;
};
export const Outro:React.FC=()=>{
 const f=useCurrentFrame();const appear=lerp(f,0,18,0,1);
 return <AbsoluteFill style={{background:'#101715',fontFamily:'"PingFang SC", "Heiti SC", sans-serif',color:C.paper,overflow:'hidden'}}>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 62%, #34473E 0%, #17221E 42%, #0B100E 95%)'}}/>
  <div style={{position:'absolute',left:97,top:48,display:'flex',gap:21,alignItems:'center',opacity:appear}}><Img src={staticFile('logo.png')} style={{width:205,height:58,objectFit:'contain'}}/><span style={{fontSize:24,color:'#B2BDB3',letterSpacing:2}}>AI ENGINEER · 第七期</span></div>
  <div style={{position:'absolute',right:98,top:62,padding:'9px 19px',borderRadius:25,border:'1px solid #CDE49B66',color:C.lime,fontSize:24,opacity:appear}}>每周理论 + 实践</div>
  <div style={{position:'absolute',left:99,top:134,fontSize:72,fontWeight:700,letterSpacing:-2,opacity:appear,translate:`0 ${lerp(f,0,20,20,0)}px`}}>带你一步步，<span style={{color:C.lime}}>把项目做出来。</span></div>
  {[0,1,2].map(i=><Card key={i} index={i} frame={f}/>)}
  <div style={{position:'absolute',left:100,right:100,bottom:43,display:'flex',justifyContent:'space-between',alignItems:'center',opacity:lerp(f,98,120,0,1),zIndex:60}}>
   <span style={{fontSize:27,color:'#C3CEC6'}}>三年打磨<span style={{margin:'0 21px',color:'#617267'}}>/</span>13 周项目实践<span style={{margin:'0 21px',color:'#617267'}}>/</span>循序渐进，系统学习</span>
   <span style={{fontSize:30,fontWeight:700,color:C.lime}}>AI Engineer 第七期 ↗</span>
  </div>
 </AbsoluteFill>;
};
