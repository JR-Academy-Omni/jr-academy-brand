import React from 'react';
import {AbsoluteFill,Audio,Img,Sequence,spring,Easing,interpolate,staticFile,useCurrentFrame} from 'remotion';
const INK='#17211F',PAPER='#F8F7EF',LIME='#D8F590',CORAL='#FF6854';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const p=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.out(Easing.cubic)});
const Split:React.FC<{text:string;f:number}>=({text,f})=><div style={{display:'flex',fontSize:112,fontWeight:800,letterSpacing:-5}}>{text.split('').map((c,i)=>{const t=f-(4+i*1.6);const y=t<11.2?interpolate(t,[0,11.2],[115,-10],{...clamp,easing:Easing.out(Easing.cubic)}):interpolate(t,[11.2,16],[ -10,0],{...clamp,easing:Easing.out(Easing.quad)});return <div key={i} style={{overflow:'hidden',height:151,display:'flex',alignItems:'flex-end'}}><span style={{display:'inline-block',lineHeight:1.08,transform:`translateY(${y}%)`}}>{c===' '?'\u00a0':c}</span></div>})}</div>;
const travel=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
const Packet:React.FC<{f:number;from:number;to:number;points:number[];color?:string}>=({f,from,to,points:v,color=INK})=>{if(f<from||f>=to)return null;const t=travel(f,from,to),u=1-t;const x=u*u*u*v[0]+3*u*u*t*v[2]+3*u*t*t*v[4]+t*t*t*v[6],y=u*u*u*v[1]+3*u*u*t*v[3]+3*u*t*t*v[5]+t*t*t*v[7];return <g><circle cx={x} cy={y} r={14} fill={color} stroke={PAPER} strokeWidth={4}/></g>};
const Label:React.FC<{x:number;y:number;text:string;color?:string;size?:number;anchor?:'start'|'middle'|'end'}>=({x,y,text,color=INK,size=44,anchor='middle'})=><text x={x} y={y} fill={color} textAnchor={anchor} dominantBaseline="middle" fontSize={size} fontWeight={650}>{text}</text>;
const Route:React.FC<{d:string;t:number;color?:string;light?:boolean}>=({d,t,color=CORAL,light=false})=><><path d={d} fill="none" stroke={light?'#536359':'#CBD0C1'} strokeWidth={5}/><path d={d} fill="none" stroke={color} strokeWidth={7} pathLength={1} strokeDasharray={1} strokeDashoffset={1-t} strokeLinecap="round"/></>;
const Build:React.FC<{f:number}>=({f})=><AbsoluteFill style={{background:INK}}>
 <div style={{position:'absolute',left:110,top:228,width:880}}><div style={{fontSize:44,color:LIME,letterSpacing:3}}>01 / 从 AI Coding 开始</div><Split text="BUILD IT." f={f}/><div style={{fontSize:88,fontWeight:750,lineHeight:1.18,marginTop:38,opacity:p(f,14,25),transform:`translateY(${35*(1-p(f,14,25))}px)`}}>带你一步步，<br/><span style={{color:LIME}}>把项目做出来。</span></div><div style={{fontSize:44,color:'#B7C4BA',marginTop:50,opacity:p(f,26,36)}}>需求 → 界面 → 可运行 MVP</div></div>
 <svg width={940} height={850} viewBox="0 0 940 850" style={{position:'absolute',left:950,top:140}}>
 <ellipse cx={440} cy={710} rx={240+90*p(f,8,40)} ry={35+25*p(f,8,40)} fill="#000" opacity={.12+.12*p(f,8,40)}/><g stroke="#6C8263" strokeWidth={2} strokeDasharray="5 9" opacity={p(f,32,46)*.65}><path d="M 125 410 V 610 M 740 410 V 610"/></g>
 {[0,1,2].map((i)=>{const q=p(f,8+i*9,17+i*9),fall=spring({frame:f-8-i*9,fps:24,config:{damping:16,stiffness:150,mass:.8},durationInFrames:25}),y=600-i*157-(1-fall)*(160+i*50);return <g key={i} transform={`translate(0 ${y})`} opacity={q}>
 <path d="M 110 0 L 410 -138 L 762 2 L 460 144 Z" fill={[ '#849777','#D8F590','#F8F7EF'][i]} stroke="#17211F" strokeWidth={4}/>
 <path d="M 110 0 L 460 144 L 460 170 L 110 26 Z" fill={['#455F43','#A9CA70','#B8C3B2'][i]} stroke="#17211F" strokeWidth={3}/><path d="M 460 144 L 762 2 L 762 28 L 460 170 Z" fill={['#344735','#8BA955','#94A88D'][i]} stroke="#17211F" strokeWidth={3}/>
 {i===2?<g transform="translate(260 -62) matrix(.8 .32 -.8 .36 0 0)"><rect x="0" y="-130" width="420" height="230" rx="14" fill="#E5EBD9" stroke={INK} strokeWidth="4"/><rect x="18" y="-110" width="87" height="190" rx="8" fill={INK}/><rect x="130" y="-103" width="260" height="53" rx="8" fill={CORAL}/>{[0,1,2].map(n=><rect key={n} x={130} y={-24+n*36} width={220-n*25} height={18} rx={6} fill="#829979"/>)}</g>:<g fill="none" stroke={INK} strokeWidth={5} opacity={.6}>{[0,1,2].map(n=><path key={n} d={`M ${200+n*65} ${-10+n*26} l 220 -95 l 128 51`}/>)}</g>}
 </g>})}
 {[['UI',299],['API',454],['DATA',612]].map(([t,y])=><g key={t} opacity={p(f,34,46)}><path d={`M 730 ${y} H 790`} stroke="#C6D7B2" strokeWidth={2}/><Label x={802} y={Number(y)} text={String(t)} size={44} color={LIME} anchor="start"/></g>)}
 </svg>
 </AbsoluteFill>;
const Flow:React.FC<{f:number}>=({f})=><AbsoluteFill style={{background:PAPER,color:INK}}>
 <div style={{position:'absolute',left:110,top:160,fontSize:94,fontWeight:800,letterSpacing:-3}}>Multi-Agent<span style={{fontSize:68,fontWeight:650}}>，协作起来。</span></div>
 <div style={{position:'absolute',left:115,top:295,fontSize:44,color:'#53634F'}}>Voice AI · RAG · MCP Tools　接入同一条工作流</div>
 <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
 <Route d="M 315 640 H 560" t={p(f,0,8)}/><Route d="M 740 640 C 930 640 850 460 1050 460" t={p(f,7,18)}/><Route d="M 740 640 C 930 640 850 805 1050 805" t={p(f,7,18)}/><Route d="M 1380 460 C 1500 460 1440 640 1590 640" t={p(f,17,29)}/><Route d="M 1380 805 C 1500 805 1440 640 1590 640" t={p(f,17,29)}/>
 <rect x={110} y={566} width={240} height={148} rx={74} fill={CORAL}/><Label x={230} y={640} text="任务" size={52}/>
 <circle cx={650} cy={640} r={106+5*Math.sin(Math.PI*p(f,6,14))} fill={INK}/><Label x={650} y={620} text="协调" color={PAPER} size={51}/><Label x={650} y={677} text="Agent" color={LIME} size={38}/>
 <rect x={1040} y={384} width={350} height={152} rx={25} fill={LIME} stroke={INK} strokeWidth={3}/><Label x={1215} y={438} text="执行 Agent" size={45}/><Label x={1215} y={493} text="独立上下文" size={42} color="#516147"/>
 <rect x={1040} y={729} width={350} height={152} rx={25} fill="#E8E5FF" stroke={INK} strokeWidth={3}/><Label x={1215} y={783} text="检查 Agent" size={45}/><Label x={1215} y={838} text="独立上下文" size={42} color="#646076"/>
 <circle cx={1700} cy={640} r={104} fill={p(f,27,33)>.5?INK:'#DCE1D3'}/><path d="M 1659 639 L 1687 665 L 1745 608" fill="none" stroke={LIME} strokeWidth={13} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-p(f,28,35)}/>
 <Packet f={f} from={0} to={8} points={[315,640,395,640,480,640,560,640]}/><Packet f={f} from={7} to={18} points={[740,640,930,640,850,460,1050,460]}/><Packet f={f} from={7} to={18} points={[740,640,930,640,850,805,1050,805]}/><Packet f={f} from={18} to={29} points={[1380,460,1500,460,1440,640,1590,640]}/><Packet f={f} from={18} to={29} points={[1380,805,1500,805,1440,640,1590,640]}/>
 <Label x={650} y={840} text="分派 · Handoff" size={44}/><Label x={1700} y={817} text="汇总交付" size={38}/>
 </svg>
 </AbsoluteFill>;
const Harness:React.FC<{f:number}>=({f})=><AbsoluteFill style={{background:'#111917'}}>
 <div style={{position:'absolute',left:110,top:190,fontSize:93,fontWeight:800}}>Harness</div><div style={{position:'absolute',left:113,top:303,fontSize:62,color:LIME,fontWeight:750}}>+ LLM Routing</div>
 <div style={{position:'absolute',left:113,top:476,fontSize:48,lineHeight:1.75,fontWeight:600}}>权限与预算<br/>记忆与恢复<br/>评测与追踪</div><div style={{position:'absolute',left:113,top:855,fontSize:44,color:'#ADBCAF'}}>把 Agent 做成企业级系统</div>
 <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
 <circle cx={1040} cy={572} r={248} fill="none" stroke="#455747" strokeWidth={2}/><circle cx={1040} cy={572} r={222} fill="none" stroke={LIME} strokeWidth={5} strokeDasharray="24 10" transform={`rotate(${30*(1-p(f,0,15))} 1040 572)`}/>
 <Route d="M 1184 527 C 1330 527 1300 327 1480 327" t={.17} color="#6B7B69" light/><Route d="M 1190 572 H 1480" t={p(f,2,19)} color={LIME} light/><Route d="M 1184 618 C 1330 618 1300 830 1480 830" t={.17} color="#6B7B69" light/>
 <Packet f={f} from={3} to={19} points={[1190,572,1290,572,1390,572,1480,572]} color={LIME}/><circle cx={1040} cy={572} r={154} fill={PAPER}/><Label x={1040} y={549} text="LLM" size={61}/><Label x={1040} y={615} text="Router" size={49}/>
 <Label x={1040} y={258} text="PRODUCTION HARNESS" size={44} color={LIME}/><Label x={1040} y={895} text="Hooks · Memory · Evals" size={44} color="#BDCCBF"/>
 {['Model A','Model B','Model C'].map((t,i)=><g key={t}><rect x={1480} y={[267,512,770][i]} width={310} height={120} rx={60} fill={i===1&&f>=16?LIME:'#25352C'} stroke={i===1?LIME:'#59705D'} strokeWidth={2}/><Label x={1635} y={[327,572,830][i]} text={t} size={43} color={i===1&&f>=16?INK:PAPER}/></g>)}
 <Label x={1635} y={662} text="质量 / 成本 / 延迟" size={42} color={LIME}/>
 </svg>
 </AbsoluteFill>;
const Finale:React.FC<{f:number}>=({f})=><AbsoluteFill style={{background:LIME,color:INK,clipPath:`circle(${p(f,0,6)*2300}px at 85% 53%)`}}>
 <Img src={staticFile('logo-official-black.svg')} style={{position:'absolute',left:98,top:100,width:485,height:175,objectFit:'contain',opacity:p(f,1,7),transform:`translateY(${18*(1-p(f,1,7))}px)`}}/><div style={{position:'absolute',left:611,top:167,fontSize:42,fontWeight:700}}>第七期</div>
 <div style={{position:'absolute',left:101,top:274,fontSize:130,fontWeight:850,letterSpacing:-7,lineHeight:1.05}}>AI<br/>ENGINEER</div>
 <div style={{position:'absolute',left:106,top:642,fontSize:64,fontWeight:750}}>带你一步步，把项目做出来。</div>
 <div style={{position:'absolute',left:110,top:792,fontSize:44,lineHeight:1.8}}>AI Coding · RAG · Multi-Agent · Harness · LLM Routing<br/>三年打磨 / 13 周项目实践 / 系统学习</div>
 <div style={{position:'absolute',right:100,top:182,fontSize:460,fontWeight:800,letterSpacing:-40,lineHeight:1,color:'transparent',WebkitTextStroke:'3px #17211F',opacity:.24}}>07</div>
 </AbsoluteFill>;
export const Outro:React.FC<{bgm?:boolean}>=({bgm=true})=>{
 const f=useCurrentFrame();const light=f>=71&&f<118;return <AbsoluteFill style={{fontFamily:'"PingFang SC",Arial,sans-serif',color:PAPER,overflow:'hidden'}}>
 {f<72&&<Build f={f}/>}
 {f>=66&&f<120&&<AbsoluteFill style={{clipPath:`inset(${100*(1-travel(f,66,72))}% 0 0 0)`}}><Flow f={Math.max(0,f-72)}/></AbsoluteFill>}
 {f>=114&&<AbsoluteFill style={{clipPath:`circle(${2200*travel(f,114,120)}px at 88.54% 59.26%)`}}><Harness f={Math.max(0,f-120)}/></AbsoluteFill>}{f>=156&&<Finale f={f-156}/>}
 {f<156&&<div style={{position:'absolute',left:110,top:49,display:'flex',alignItems:'center',gap:26}}><Img src={staticFile(light?'logo-official-black.svg':'logo.png')} style={{width:260,height:87,objectFit:'contain'}}/><span style={{fontSize:40,color:light?INK:'#C2CCBE'}}>AI ENGINEER · 第七期</span></div>}
 <Audio src={staticFile('shotcraft/voice.wav')}/>{bgm&&<Audio src={staticFile('shotcraft/bed.wav')} volume={.22}/>}
 {[{from:72,src:'whoosh.mp3',volume:.18,duration:14,trim:16},{from:120,src:'whoosh.mp3',volume:.14,duration:14,trim:16},{from:156,src:'impact.mp3',volume:.11,duration:36,trim:21}].map((s,i)=><Sequence key={i} from={s.from} durationInFrames={s.duration}><Audio src={staticFile('shotcraft/'+s.src)} startFrom={s.trim} volume={s.volume}/></Sequence>)}
 </AbsoluteFill>
};
