import React from 'react';
import {AbsoluteFill,Audio,Easing,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';
const C={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const layers=[['基座层','FOUNDATION'],['上下文工程','CONTEXT'],['知识检索','RAG'],['能力层','CAPABILITY'],['Agent 核心','AGENT CORE'],['多 Agent 编排','MULTI-AGENT'],['记忆系统','MEMORY'],['治理层','HARNESS'],['模型层','MODEL'],['评测与监控','OBSERVABILITY']];
const travel=(f:number)=>interpolate(f,[8,78],[-1260,0],{...C,easing:Easing.inOut(Easing.cubic)});
export const TechStack:React.FC<{bgm?:boolean}>=({bgm=true})=>{
 const f=useCurrentFrame();const pull=interpolate(f,[82,111],[0,1],{...C,easing:Easing.out(Easing.cubic)});const scale=1-.59*pull;const y=travel(f)*(1-pull);const blur=Math.min(3,Math.abs(travel(f)-travel(f-1))*.065)*(1-pull);
 const active=Math.min(9,Math.floor(interpolate(f,[8,78],[0,10],C)));
 return <AbsoluteFill style={{background:'#FCF8F2',fontFamily:'"PingFang SC",Arial,sans-serif',color:'#252331',overflow:'hidden'}}>
 <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 86% 40%,#ded3fa 0%,transparent 65%)'}}/>
 <Img src={staticFile('logo-official-black.svg')} style={{position:'absolute',left:90,top:40,width:235,height:75,objectFit:'contain'}}/>
 <div style={{position:'absolute',left:92,top:137,display:'flex',alignItems:'center',gap:24}}><span style={{fontSize:67,fontWeight:900,letterSpacing:-2}}>AI ENGINEER</span><span style={{fontSize:36,fontWeight:700,background:'#ED775F',color:'white',padding:'9px 18px',borderRadius:12}}>课程</span></div>
 <div style={{position:'absolute',left:90,top:222,fontSize:63,fontWeight:800}}><span style={{color:'#E97059'}}>10 层</span> AI 工程技术栈</div>
 <div style={{position:'absolute',left:96,top:330,width:790}}>{layers.map(([zh,en],i)=><div key={en} style={{height:57,display:'flex',alignItems:'baseline',gap:18,borderBottom:'1px solid #DDD5D3',color:active===i&&pull<.8?'#DC624F':'#302D3B',transform:`translateX(${active===i&&pull<.8?12:0}px)`}}><span style={{fontSize:26,color:'#C66F66',width:43,fontWeight:700}}>{String(i+1).padStart(2,'0')}</span><span style={{fontSize:33,fontWeight:700,width:280}}>{zh}</span><span style={{fontSize:24,letterSpacing:1,color:'#777181'}}>{en}</span></div>)}</div>
 <div style={{position:'absolute',left:995,top:25,width:840,height:1005,overflow:'hidden',borderRadius:40,maskImage:'linear-gradient(transparent,black 4%,black 96%,transparent)'}}>
 <div style={{position:'absolute',left:420,top:15,transform:`translateX(-50%) translateY(${y}px) scale(${scale})`,transformOrigin:'50% 0',width:1010,height:2390,overflow:'hidden',maskImage:'linear-gradient(90deg,transparent,black 5%,black 95%,transparent)',filter:`blur(${blur}px)`}}><Img src={staticFile('stack-poster-v7.png')} style={{position:'absolute',width:1754,height:2480.5,left:-720,top:-55,maxWidth:'none'}}/></div>
 </div>
 <div style={{position:'absolute',left:94,bottom:70,fontSize:42,fontWeight:700}}>系统学。<span style={{color:'#D8634C'}}>动手做。</span></div>
 <Audio src={staticFile('shotcraft/stack.wav')}/>{bgm&&<Audio src={staticFile('shotcraft/bed.wav')} volume={interpolate(f,[0,10,124,143],[0,.22,.22,0],C)}/>}
 <Audio src={staticFile('shotcraft/whoosh.mp3')} volume={.13}/>
 </AbsoluteFill>;
};
