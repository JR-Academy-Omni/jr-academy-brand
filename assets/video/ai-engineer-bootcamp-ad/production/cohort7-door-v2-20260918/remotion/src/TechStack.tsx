import React from 'react';
import {AbsoluteFill,Audio,Easing,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';
const C={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const layers=[['基座层','FOUNDATION'],['上下文工程','CONTEXT'],['知识检索','RAG'],['能力层','CAPABILITY'],['Agent 核心','AGENT CORE'],['多 Agent 编排','MULTI-AGENT'],['记忆系统','MEMORY'],['治理层','HARNESS'],['模型层','MODEL'],['评测与监控','OBSERVABILITY']];
const camera=(f:number)=>{const i=Math.min(9,Math.floor(Math.max(0,f)/14));const phase=f-i*14;return 2140-i*215-interpolate(phase,[8,14],[0,i<9?215:0],{...C,easing:Easing.inOut(Easing.cubic)});};
export const TechStack:React.FC<{bgm?:boolean}>=({bgm=true})=>{
 const f=useCurrentFrame();const pull=interpolate(f,[142,164],[0,1],{...C,easing:Easing.out(Easing.cubic)});const scale=1.15-.75*pull;const y=(540-camera(f)*1.15)*(1-pull)+35*pull;const blur=Math.min(2,Math.abs(camera(f)-camera(f-1))*.04)*(1-pull);
 const active=Math.min(9,Math.floor(f/14));const phase=f%14;const caption=active===9?1:interpolate(phase,[0,2,9,13],[.4,1,1,0],C);
 return <AbsoluteFill style={{background:'#FCF8F2',fontFamily:'"PingFang SC",Arial,sans-serif',color:'#252331',overflow:'hidden'}}>
 <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 86% 40%,#ded3fa 0%,transparent 65%)'}}/>
 <Img src={staticFile('logo-official-black.svg')} style={{position:'absolute',left:90,top:40,width:235,height:75,objectFit:'contain'}}/>
 <div style={{position:'absolute',left:92,top:137,display:'flex',alignItems:'center',gap:24}}><span style={{fontSize:67,fontWeight:900,letterSpacing:-2}}>AI ENGINEER</span><span style={{fontSize:36,fontWeight:700,background:'#ED775F',color:'white',padding:'9px 18px',borderRadius:12}}>课程</span></div>
 <div style={{position:'absolute',left:90,top:222,fontSize:63,fontWeight:800}}><span style={{color:'#E97059'}}>10 层</span> AI 工程技术栈</div>
 <div style={{position:'absolute',left:92,top:395,width:920,opacity:(1-pull)*caption,transform:`translateY(${interpolate(phase,[0,3],[20,0],C)}px)`}}>
 <div style={{fontSize:40,color:'#CD6858',letterSpacing:5,fontWeight:700}}>LAYER {String(active+1).padStart(2,'0')} / 10</div>
 <div style={{fontSize:91,fontWeight:800,letterSpacing:-3,marginTop:26}}>{layers[active][0]}</div>
 <div style={{fontSize:41,color:'#776F85',letterSpacing:3,marginTop:18}}>{layers[active][1]}</div>
 <div style={{height:3,width:680,background:'#D8CEDA',marginTop:48}}><div style={{width:`${(active+1)*10}%`,height:3,background:'#EB7960'}}/></div>
 </div>
 <div style={{position:'absolute',left:92,top:427,opacity:pull,fontSize:78,fontWeight:800,lineHeight:1.35}}>从基础到工程交付<br/><span style={{color:'#D8634C'}}>一层层，做出来。</span></div>
 <div style={{position:'absolute',left:1010,top:0,width:910,height:1080,overflow:'hidden',maskImage:'linear-gradient(transparent,black 10%,black 90%,transparent)'}}>
 <div style={{position:'absolute',left:450,top:0,transform:`translateX(-50%) translateY(${y}px) scale(${scale})`,transformOrigin:'50% 0',width:1010,height:2390,overflow:'hidden',maskImage:'linear-gradient(90deg,transparent,black 5%,black 95%,transparent)',filter:`blur(${blur}px)`}}><Img src={staticFile('stack-poster-v7.png')} style={{position:'absolute',width:1754,height:2480.5,left:-720,top:-55,maxWidth:'none'}}/></div>
 </div>
 <div style={{position:'absolute',left:94,bottom:70,fontSize:42,fontWeight:700}}>系统学。<span style={{color:'#D8634C'}}>动手做。</span></div>
 <Audio src={staticFile('shotcraft/stack.wav')}/>{bgm&&<Audio src={staticFile('shotcraft/bed.wav')} volume={interpolate(f,[0,10,168,191],[0,.22,.22,0],C)}/>}
 <Audio src={staticFile('shotcraft/whoosh.mp3')} volume={.13}/>
 </AbsoluteFill>;
};
