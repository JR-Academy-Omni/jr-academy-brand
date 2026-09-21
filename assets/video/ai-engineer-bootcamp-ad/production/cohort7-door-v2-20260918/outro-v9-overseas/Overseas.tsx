import React from 'react';
import {AbsoluteFill,Audio,Easing,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';
const INK='#17211F',PAPER='#F8F7EF',LIME='#D8F590';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const enter=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.out(Easing.cubic)});
const countries=[['AU','澳洲','AUSTRALIA'],['US','美国','UNITED STATES'],['SG','新加坡','SINGAPORE'],['MY','马来西亚','MALAYSIA'],['JP','日本','JAPAN'],['KR','韩国','SOUTH KOREA']];
export const Overseas:React.FC<{bgm?:boolean}>=({bgm=true})=>{
 const f=useCurrentFrame();return <AbsoluteFill style={{background:INK,color:PAPER,fontFamily:'"PingFang SC",Arial,sans-serif',overflow:'hidden'}}>
 <svg width={1920} height={1080} style={{position:'absolute',inset:0,opacity:.09}}><g transform="translate(1570 170) rotate(-22)" stroke={LIME} strokeWidth={2} fill="none"><circle r={590}/><ellipse rx={275} ry={590}/><ellipse rx={470} ry={590}/><ellipse rx={590} ry={180}/><ellipse rx={590} ry={390}/><path d="M -590 0 H 590 M 0 -590 V 590"/></g></svg>
 <Img src={staticFile('logo.png')} style={{position:'absolute',left:110,top:50,width:290,height:95,objectFit:'contain'}}/>
 <div style={{position:'absolute',right:115,top:78,fontSize:40,color:LIME,letterSpacing:3}}>GLOBAL CHINESE / 海外华人</div>
 <div style={{position:'absolute',left:110,top:208,fontSize:92,fontWeight:780,letterSpacing:-3}}>人在海外，<span style={{color:LIME}}>也能一起学。</span></div>
 <div style={{position:'absolute',left:116,top:342,fontSize:43,color:'#CDD5CA'}}>面向海外华人 · 以下国家均可上课</div>
 {countries.map(([iso,zh,en],i)=>{const col=i%3,row=Math.floor(i/3),q=enter(f,col*4+row*5,15+col*4+row*5),spoken=f>=8+i*18;return <div key={iso} style={{position:'absolute',left:116+col*590,top:474+row*216,width:525,opacity:q,transform:`translateY(${32*(1-q)}px)`}}><div style={{display:'flex',alignItems:'center',gap:22}}><div style={{width:75,height:75,borderRadius:40,border:'2px solid #C4D4B8',display:'flex',justifyContent:'center',alignItems:'center',fontSize:31,fontWeight:700,color:spoken?INK:LIME,background:spoken?LIME:'transparent'}}>{iso}</div><span style={{fontSize:69,fontWeight:700}}>{zh}</span></div><div style={{fontSize:42,color:'#BFCDBA',marginTop:20,letterSpacing:2,marginLeft:98}}>{en}</div><div style={{height:1,background:'#6C7E63',marginTop:28,width:460}}/></div>})}
 <div style={{position:'absolute',left:115,right:115,bottom:65,display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:43,fontWeight:700,color:LIME}}>AI Engineer 第七期</span><span style={{fontSize:41}}>带你一步步，把项目做出来。</span></div>
 <Audio src={staticFile('shotcraft/overseas.wav')}/>{bgm&&<Audio src={staticFile('shotcraft/bed.wav')} volume={interpolate(f,[0,12,147,179],[0,.22,.22,0],clamp)}/>}
 </AbsoluteFill>
};
