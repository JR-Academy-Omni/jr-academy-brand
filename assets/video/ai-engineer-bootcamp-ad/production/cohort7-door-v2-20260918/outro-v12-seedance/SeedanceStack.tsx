import React from 'react';
import {AbsoluteFill,Audio,OffthreadVideo,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';
const C={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const layers=[['基座层','FOUNDATION'],['上下文工程','CONTEXT'],['知识检索','RAG'],['能力层','CAPABILITY'],['Agent 核心','AGENT CORE'],['多 Agent 编排','MULTI-AGENT'],['记忆系统','MEMORY'],['治理层','HARNESS'],['模型层','MODEL'],['评测与监控','OBSERVABILITY']];
// Landing times reconciled against 4fps decoded generated contact sequence.
const starts=[0,31,54,90,108,120,138,150,156,162];
export const SeedanceStack:React.FC<{bgm?:boolean}>=({bgm=true})=>{const f=useCurrentFrame();const active=starts.reduce((a,s,i)=>f>=s?i:a,0);const finish=interpolate(f,[165,169],[0,1],C);const exit=interpolate(f,[162,165],[1,0],C);const entry=interpolate(f-starts[active],[0,4],[0,1],C);
return <AbsoluteFill style={{fontFamily:'"PingFang SC",Arial,sans-serif',color:'#241F27'}}>
<OffthreadVideo src={staticFile('shotcraft/seedance-stack-8s.mp4')} muted style={{width:'100%',height:'100%',objectFit:'cover'}}/>
<AbsoluteFill style={{background:'linear-gradient(90deg,rgba(255,249,239,.74) 0%,rgba(255,249,239,.25) 23%,transparent 48%)'}}/>
<Img src={staticFile('logo-official-black.svg')} style={{position:'absolute',left:85,top:45,width:240,height:78,objectFit:'contain'}}/>
<div style={{position:'absolute',left:90,top:156,display:'flex',alignItems:'center',gap:17}}><span style={{fontSize:39,fontWeight:900,letterSpacing:-1}}>AI ENGINEER</span><span style={{background:'#EF795F',color:'white',fontSize:27,fontWeight:700,padding:'7px 15px',borderRadius:10}}>课程</span></div>
<div style={{position:'absolute',left:80,top:260,opacity:exit,transform:`translateY(${(1-entry)*24}px)`}}><div style={{fontSize:205,lineHeight:1,fontWeight:850,letterSpacing:-10}}>{String(active+1).padStart(2,'0')}<span style={{fontSize:40,letterSpacing:0,color:'#795D57',marginLeft:20}}>/ 10</span></div><div style={{fontSize:53,fontWeight:750,marginTop:24}}>{layers[active][0]}</div><div style={{fontSize:25,letterSpacing:2,marginTop:12,color:'#765D66'}}>{layers[active][1]}</div></div>
<div style={{position:'absolute',left:80,top:290,opacity:finish,transform:`translateY(${(1-finish)*24}px)`}}><div style={{fontSize:220,lineHeight:1,fontWeight:900,letterSpacing:-10}}>10<span style={{fontSize:63,letterSpacing:0,marginLeft:18}}>层</span></div><div style={{fontSize:54,fontWeight:800,marginTop:22}}>AI 工程技术栈</div></div>
<div style={{position:'absolute',left:90,bottom:75,fontSize:37,fontWeight:700}}>系统学 · 动手做</div>
<Audio src={staticFile('shotcraft/stack.wav')}/><Audio src={staticFile('shotcraft/stack-assembly-sfx.wav')} volume={.55}/>{bgm&&<Audio src={staticFile('shotcraft/bed.wav')} volume={interpolate(f,[0,10,166,191],[0,.18,.18,0],C)}/>}
</AbsoluteFill>};
