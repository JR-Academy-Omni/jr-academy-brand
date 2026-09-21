import React from 'react';
import {Audio} from '@remotion/media';
import {loadFont as loadNotoSerifSC} from '@remotion/google-fonts/NotoSerifSC';
import {loadFont as loadZcoolDisplay} from '@remotion/google-fonts/ZCOOLQingKeHuangYou';
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type AgentMemoryVideoProps = {
  withBgm: boolean;
};

export const TOTAL_FRAMES = 1470;

const C = {
  paper: '#F7F3EB',
  white: '#FFFEFB',
  ink: '#15171A',
  muted: '#73756F',
  line: '#D9D4CA',
  coral: '#FB6A4A',
  red: '#EF4E56',
  blue: '#2F8CCB',
  cyan: '#36B9C8',
  violet: '#7657D6',
  green: '#75B82A',
  yellow: '#F4C84A',
};

const {fontFamily: TITLE_FONT} = loadNotoSerifSC('normal', {
  weights: ['900'],
  subsets: ['chinese-simplified', 'latin'],
});
const {fontFamily: DISPLAY_FONT} = loadZcoolDisplay('normal', {
  weights: ['400'],
  subsets: ['latin'],
});
const FONT = '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = DISPLAY_FONT;
const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const SHOTS = {
  hook: {from: 0, duration: 292},
  thread: {from: 292, duration: 218},
  layers: {from: 510, duration: 173},
  compare: {from: 683, duration: 318},
  retrieve: {from: 1001, duration: 265},
  close: {from: 1266, duration: 204},
} as const;

const PaperTexture: React.FC<{dark?: boolean}> = ({dark = false}) => (
  <AbsoluteFill
    style={{
      opacity: dark ? 0.13 : 0.28,
      backgroundImage: `
        linear-gradient(${dark ? 'rgba(255,255,255,.05)' : 'rgba(21,23,26,.035)'} 1px, transparent 1px),
        linear-gradient(90deg, ${dark ? 'rgba(255,255,255,.04)' : 'rgba(21,23,26,.028)'} 1px, transparent 1px)
      `,
      backgroundSize: '52px 52px',
    }}
  />
);

const BrandBar: React.FC<{dark?: boolean; label: string}> = ({dark = false, label}) => (
  <div
    style={{
      position: 'absolute',
      left: 52,
      right: 52,
      top: 46,
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: dark ? '#fff' : C.ink,
      fontFamily: FONT,
    }}
  >
    <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 13,
          background: '#fff',
          padding: 6,
          boxSizing: 'border-box',
          boxShadow: dark
            ? '0 0 0 1px rgba(255,255,255,.2), 0 12px 32px rgba(0,0,0,.3)'
            : '0 8px 24px rgba(35,28,18,.14)',
        }}
      >
        <Img
          src={staticFile('brand/jr-box.svg')}
          style={{width: '100%', height: '100%', objectFit: 'contain'}}
        />
      </div>
      <div style={{fontFamily: MONO, fontSize: 50, fontWeight: 400, letterSpacing: 0.5}}>AI ENGINEER</div>
    </div>
    <div style={{fontFamily: MONO, fontSize: 50, opacity: 0.82}}>{label}</div>
  </div>
);

const SourceChip: React.FC<React.PropsWithChildren<{dark?: boolean}>> = ({
  children,
  dark = false,
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px 20px',
      borderRadius: 999,
      border: `1px solid ${dark ? 'rgba(255,255,255,.3)' : C.line}`,
      background: dark ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.86)',
      color: dark ? '#fff' : C.ink,
      fontFamily: MONO,
      fontSize: 50,
      fontWeight: 800,
      letterSpacing: 0.5,
    }}
  >
    <span style={{width: 8, height: 8, borderRadius: 99, background: C.coral}} />
    {children}
  </div>
);

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const title = spring({frame: frame - 12, fps: 30, config: {damping: 18, stiffness: 135}});
  const warning = spring({frame: frame - 116, fps: 30, config: {damping: 16, stiffness: 150}});
  const scroll = interpolate(frame, [0, 260], [0, -330], clamp);
  const messages = [
    'TypeScript 项目',
    'Atlas 项目',
    '回答简洁',
    '继续架构',
    '隐藏日志',
    '中文输出',
  ];
  return (
    <AbsoluteFill style={{background: C.paper, overflow: 'hidden', fontFamily: FONT}}>
      <PaperTexture />
      <BrandBar dark label="01 HISTORY" />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 890,
          background: C.ink,
          clipPath: 'polygon(0 0, 100% 0, 100% 91%, 0 100%)',
          overflow: 'hidden',
        }}
      >
        <PaperTexture dark />
        <div style={{position: 'absolute', left: 54, top: 160, color: '#fff'}}>
          <div style={{fontFamily: MONO, fontSize: 50, color: C.coral}}>
            CONTEXT WINDOW
          </div>
          <div
            style={{
              fontSize: 78,
              fontFamily: TITLE_FONT,
              lineHeight: 1.02,
              fontWeight: 950,
              letterSpacing: -3,
              marginTop: 20,
              opacity: title,
              transform: `translateY(${interpolate(title, [0, 1], [58, 0])}px)`,
            }}
          >
            聊天记录
            <br />
            会一直记得吗？
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            right: 42,
            top: 175,
            width: 390,
            height: 620,
            borderRadius: 30,
            border: '1px solid rgba(255,255,255,.18)',
            background: 'rgba(255,255,255,.07)',
            overflow: 'hidden',
            boxShadow: '0 30px 100px rgba(0,0,0,.38)',
          }}
        >
          <div
            style={{
              height: 84,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              borderBottom: '1px solid rgba(255,255,255,.12)',
              color: '#fff',
              fontFamily: MONO,
              fontSize: 50,
              fontWeight: 800,
            }}
          >
            <span>A</span>
            <span style={{color: C.green}}>LIVE</span>
          </div>
          <div style={{padding: 20, transform: `translateY(${scroll}px)`}}>
            {[...messages, ...messages].map((message, index) => (
              <div
                key={`${message}-${index}`}
                style={{
                  marginBottom: 15,
                  borderRadius: 18,
                  padding: '20px 21px',
                  background: index % 2 === 0 ? '#fff' : '#292C31',
                  color: index % 2 === 0 ? C.ink : '#fff',
                  fontSize: 50,
                  lineHeight: 1.35,
                  fontWeight: 750,
                  opacity: 0.98,
                }}
              >
                {message}
              </div>
            ))}
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 180,
              background: 'linear-gradient(transparent, #15171A 78%)',
            }}
          />
        </div>
      </div>
      <div style={{position: 'absolute', left: 54, right: 54, top: 930}}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 50,
            color: C.coral,
            fontWeight: 900,
            letterSpacing: 1.3,
          }}
        >
          HISTORY ≠ MEMORY
        </div>
        <div
          style={{
            fontSize: 76,
            fontFamily: TITLE_FONT,
            lineHeight: 1.08,
            fontWeight: 950,
            letterSpacing: -3,
            marginTop: 22,
          }}
        >
          聊天记录
          <span style={{color: C.coral}}> ≠ </span>
          <br />
          完整记忆系统
        </div>
        <div
          style={{
            marginTop: 44,
            width: `${interpolate(warning, [0, 1], [0, 100])}%`,
            height: 8,
            borderRadius: 99,
            background: C.coral,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const ThreadBoundary: React.FC = () => {
  const frame = useCurrentFrame();
  const switchProgress = interpolate(frame, [38, 86], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const erased = interpolate(frame, [78, 118], [1, 0.05], clamp);
  const alert = spring({frame: frame - 96, fps: 30, config: {damping: 18, stiffness: 140}});
  return (
    <AbsoluteFill style={{background: C.paper, overflow: 'hidden', fontFamily: FONT}}>
      <PaperTexture />
      <BrandBar label="02 THREAD" />
      <div style={{position: 'absolute', left: 54, right: 54, top: 155}}>
        <div style={{fontFamily: MONO, fontSize: 50, color: C.red}}>
          THREAD BOUNDARY
        </div>
        <div style={{fontFamily: TITLE_FONT, fontSize: 70, lineHeight: 1.07, fontWeight: 900, letterSpacing: -2.6, marginTop: 18}}>
          换个 Thread，
          <br />
          历史就可能断掉
        </div>
      </div>
      <div style={{position: 'absolute', left: 54, right: 54, top: 510, height: 760}}>
        <div
          style={{
            position: 'absolute',
            left: interpolate(switchProgress, [0, 1], [0, -520]),
            top: 0,
            width: 460,
            height: 620,
            borderRadius: 30,
            background: '#fff',
            border: `1px solid ${C.line}`,
            boxShadow: '0 24px 70px rgba(35,28,18,.13)',
            padding: 28,
            boxSizing: 'border-box',
            opacity: erased,
          }}
        >
          <div style={{fontFamily: MONO, fontSize: 50}}>THREAD_A</div>
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              style={{
                height: 80,
                borderRadius: 16,
                background: item === 2 ? '#FFE6E0' : '#F0EEE8',
                marginTop: 24,
                padding: '20px 22px',
                boxSizing: 'border-box',
              }}
            >
              <div style={{height: 10, width: `${70 - item * 8}%`, borderRadius: 8, background: item === 2 ? C.coral : '#B5B2AA'}} />
              <div style={{height: 8, width: `${44 + item * 7}%`, borderRadius: 8, background: '#D7D2C8', marginTop: 13}} />
            </div>
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            right: interpolate(switchProgress, [0, 1], [-520, 0]),
            top: 0,
            width: 460,
            height: 620,
            borderRadius: 30,
            background: C.ink,
            color: '#fff',
            boxShadow: '0 28px 80px rgba(0,0,0,.24)',
            padding: 28,
            boxSizing: 'border-box',
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 50}}>
            <span>THREAD_B</span>
            <span style={{color: C.coral}}>NEW</span>
          </div>
          <div style={{marginTop: 155, textAlign: 'center'}}>
            <div style={{fontFamily: MONO, fontSize: 50, color: '#B6B7BB'}}>LOOKUP</div>
            <div style={{fontFamily: MONO, fontSize: 64, lineHeight: 1.08, marginTop: 20}}>NOT FOUND</div>
          </div>
          <div style={{position: 'absolute', left: 28, right: 28, bottom: 28, height: 10, borderRadius: 99, background: '#34373E'}}>
            <div style={{width: '18%', height: '100%', background: C.coral, borderRadius: 99}} />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 125,
            right: 125,
            bottom: 0,
            borderRadius: 22,
            background: C.red,
            color: '#fff',
            padding: '23px 28px',
            textAlign: 'center',
            fontSize: 50,
            fontWeight: 900,
            opacity: alert,
            transform: `translateY(${interpolate(alert, [0, 1], [35, 0])}px)`,
          }}
        >
          不是记忆故障，是边界没有设计
        </div>
      </div>
    </AbsoluteFill>
  );
};

const MemoryLayers: React.FC = () => {
  const frame = useCurrentFrame();
  const layers = [
    {number: '01', en: 'TASK STATE', zh: '当前任务状态', color: C.yellow},
    {number: '02', en: 'SHORT-TERM', zh: '线程内短期记忆', color: C.cyan},
    {number: '03', en: 'LONG-TERM', zh: '跨会话长期记忆', color: C.coral},
  ];
  return (
    <AbsoluteFill style={{background: C.ink, overflow: 'hidden', color: '#fff', fontFamily: FONT}}>
      <PaperTexture dark />
      <BrandBar dark label="03 MEMORY" />
      <div style={{position: 'absolute', left: 54, right: 54, top: 158}}>
        <div style={{fontFamily: MONO, fontSize: 50, color: C.cyan}}>3 MEMORY LAYERS</div>
        <div style={{fontFamily: TITLE_FONT, fontSize: 68, lineHeight: 1.06, fontWeight: 900, letterSpacing: -2.4, marginTop: 18}}>
          工程上，至少
          <br />
          先分清这三层
        </div>
      </div>
      <div style={{position: 'absolute', left: 54, right: 54, top: 520}}>
        {layers.map((layer, index) => {
          const enter = spring({
            frame: frame - index * 12,
            fps: 30,
            config: {damping: 18, stiffness: 150},
          });
          return (
            <div
              key={layer.number}
              style={{
                height: 240,
                marginBottom: 24,
                borderRadius: 28,
                padding: '30px 34px',
                boxSizing: 'border-box',
                background: index === 2 ? layer.color : 'rgba(255,255,255,.08)',
                border: `1px solid ${index === 2 ? layer.color : 'rgba(255,255,255,.15)'}`,
                color: index === 2 ? C.ink : '#fff',
                opacity: enter,
                transform: `translateX(${interpolate(enter, [0, 1], [110, 0])}px)`,
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                alignItems: 'center',
              }}
            >
              <div style={{fontFamily: MONO, fontSize: 58, color: index === 2 ? C.ink : layer.color}}>
                {layer.number}
              </div>
              <div>
                <div style={{fontFamily: MONO, fontSize: 50, letterSpacing: 0.5, opacity: 0.86}}>{layer.en}</div>
                <div style={{fontFamily: TITLE_FONT, fontSize: 52, fontWeight: 900, marginTop: 8}}>{layer.zh}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const HistoryVsMemory: React.FC = () => {
  const frame = useCurrentFrame();
  const historyMove = interpolate(frame, [0, 262], [0, -270], clamp);
  const memoryEnter = spring({frame: frame - 34, fps: 30, config: {damping: 17, stiffness: 140}});
  const ratio = spring({frame: frame - 15, fps: 30, config: {damping: 15, stiffness: 150}});
  return (
    <AbsoluteFill style={{background: C.paper, overflow: 'hidden', fontFamily: FONT}}>
      <PaperTexture />
      <BrandBar label="04 STORE" />
      <div style={{position: 'absolute', left: 54, right: 54, top: 150}}>
        <div style={{fontFamily: MONO, fontSize: 50, color: C.violet}}>127 MESSAGES → 1 MEMORY</div>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 28, marginTop: 12}}>
          <div style={{fontFamily: MONO, fontSize: 150, lineHeight: 0.94, letterSpacing: -8, opacity: ratio}}>127</div>
          <div style={{fontSize: 50, fontWeight: 950, color: C.coral, marginBottom: 14}}>→</div>
          <div style={{fontFamily: MONO, fontSize: 150, lineHeight: 0.94, color: C.violet, letterSpacing: -8, opacity: ratio}}>1</div>
        </div>
        <div style={{fontFamily: TITLE_FONT, fontSize: 50, fontWeight: 900, marginTop: 8}}>整段聊天，还是一条结构化偏好？</div>
      </div>
      <div style={{position: 'absolute', left: 54, right: 54, top: 520, height: 880, display: 'grid', gridTemplateColumns: '0.9fr 1.15fr', gap: 26}}>
        <div style={{borderRadius: 30, background: '#fff', border: `1px solid ${C.line}`, overflow: 'hidden', boxShadow: '0 24px 70px rgba(35,28,18,.12)'}}>
          <div style={{height: 92, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.line}`, fontFamily: MONO, fontSize: 50}}>
            <span>CHAT</span>
            <span style={{color: C.red}}>127 MSG</span>
          </div>
          <div style={{padding: 18, transform: `translateY(${historyMove}px)`}}>
            {Array.from({length: 15}).map((_, index) => (
              <div key={index} style={{height: 68, marginBottom: 13, borderRadius: 14, background: index === 8 ? '#FFE6E0' : '#EEECE7', padding: '17px', boxSizing: 'border-box'}}>
                <div style={{height: 9, width: `${42 + (index % 4) * 13}%`, background: index === 8 ? C.coral : '#A9A69E', borderRadius: 7}} />
                <div style={{height: 8, width: `${64 - (index % 3) * 11}%`, background: '#D0CBC1', borderRadius: 7, marginTop: 11}} />
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            borderRadius: 30,
            background: C.ink,
            color: '#fff',
            padding: 30,
            boxSizing: 'border-box',
            boxShadow: '0 28px 80px rgba(0,0,0,.2)',
            opacity: memoryEnter,
            transform: `translateY(${interpolate(memoryEnter, [0, 1], [70, 0])}px)`,
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 50}}>
            <span>MEMORY</span>
            <span style={{color: C.cyan}}>USER</span>
          </div>
          <div style={{marginTop: 100, fontFamily: MONO, fontSize: 50, lineHeight: 1.55}}>
            <div style={{color: C.muted}}>{'{'}</div>
            <div style={{paddingLeft: 28}}>
              <span style={{color: C.cyan}}>"preference"</span>
              <span>: </span>
              <br />
              <span style={{color: C.yellow}}>"TypeScript"</span>
            </div>
            <div style={{color: C.muted}}>{'}'}</div>
          </div>
          <div style={{position: 'absolute', left: 30, right: 30, bottom: 34}}>
            <div style={{fontFamily: MONO, color: C.coral, fontSize: 50}}>CONTEXT COST</div>
            <div style={{height: 10, borderRadius: 99, background: '#363941', marginTop: 13}}>
              <div style={{width: '16%', height: '100%', background: C.cyan, borderRadius: 99}} />
            </div>
            <div style={{fontFamily: TITLE_FONT, fontSize: 50, fontWeight: 900, marginTop: 19}}>按需检索</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Retrieval: React.FC = () => {
  const frame = useCurrentFrame();
  const flow = interpolate(frame, [16, 104], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const nodes = [
    {x: 55, label: 'USER', sub: '身份', color: C.yellow},
    {x: 382, label: 'MEMORY', sub: '偏好', color: C.coral},
    {x: 710, label: 'CTX', sub: '注入', color: C.cyan},
  ];
  return (
    <AbsoluteFill style={{background: C.ink, overflow: 'hidden', color: '#fff', fontFamily: FONT}}>
      <PaperTexture dark />
      <BrandBar dark label="05 FETCH" />
      <div style={{position: 'absolute', left: 54, right: 54, top: 160}}>
        <div style={{fontFamily: MONO, fontSize: 50, color: C.cyan}}>RETRIEVE ON DEMAND</div>
        <div style={{fontFamily: TITLE_FONT, fontSize: 68, lineHeight: 1.06, fontWeight: 900, letterSpacing: -2.4, marginTop: 18}}>
          需要时检索，
          <br />
          不是全部重放
        </div>
      </div>
      <div style={{position: 'absolute', left: 54, right: 54, top: 680, height: 500}}>
        <div style={{position: 'absolute', left: 145, right: 145, top: 120, height: 8, borderRadius: 99, background: '#34373E'}}>
          <div style={{height: '100%', width: `${flow * 100}%`, borderRadius: 99, background: `linear-gradient(90deg, ${C.yellow}, ${C.coral}, ${C.cyan})`, boxShadow: '0 0 28px rgba(54,185,200,.4)'}} />
        </div>
        {nodes.map((node, index) => {
          const enter = spring({
            frame: frame - 20 - index * 26,
            fps: 30,
            config: {damping: 18, stiffness: 145},
          });
          return (
            <div
              key={node.label}
              style={{
                position: 'absolute',
                left: node.x,
                top: 30,
                width: 260,
                height: 260,
                borderRadius: 34,
                background: index === 1 ? node.color : '#fff',
                color: C.ink,
                padding: 27,
                boxSizing: 'border-box',
                boxShadow: '0 24px 70px rgba(0,0,0,.35)',
                opacity: enter,
                transform: `translateY(${interpolate(enter, [0, 1], [54, 0])}px) scale(${interpolate(enter, [0, 1], [.84, 1])})`,
              }}
            >
              <div style={{fontFamily: MONO, fontSize: 50}}>{node.label}</div>
              <div style={{fontFamily: TITLE_FONT, fontSize: 50, lineHeight: 1.1, fontWeight: 900, marginTop: 66}}>{node.sub}</div>
              <div style={{position: 'absolute', left: 27, right: 27, bottom: 24, height: 8, background: node.color, borderRadius: 99}} />
            </div>
          );
        })}
        <div style={{position: 'absolute', left: 150, right: 150, top: 370, display: 'flex', justifyContent: 'space-between'}}>
          <SourceChip dark>WRITE</SourceChip>
          <SourceChip dark>FETCH</SourceChip>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Close: React.FC = () => {
  const frame = useCurrentFrame();
  const verbs = [
    {label: 'WRITE', zh: '写入', color: C.coral},
    {label: 'RETRIEVE', zh: '检索', color: C.cyan},
    {label: 'DELETE', zh: '删除', color: C.violet},
  ];
  const title = spring({frame: frame - 46, fps: 30, config: {damping: 18, stiffness: 135}});
  const logo = spring({frame: frame - 16, fps: 30, config: {damping: 14, stiffness: 135}});
  return (
    <AbsoluteFill style={{background: '#101217', overflow: 'hidden', color: '#fff', fontFamily: FONT}}>
      <PaperTexture dark />
      <BrandBar dark label="06 TAKEAWAY" />
      <div style={{position: 'absolute', left: 54, right: 54, top: 210, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18}}>
        {verbs.map((verb, index) => {
          const enter = spring({frame: frame - index * 10, fps: 30, config: {damping: 17, stiffness: 145}});
          return (
            <div
              key={verb.label}
              style={{
                height: 210,
                borderRadius: 28,
                background: verb.color,
                color: C.ink,
                padding: 24,
                boxSizing: 'border-box',
                opacity: enter,
                transform: `translateY(${interpolate(enter, [0, 1], [45, 0])}px)`,
              }}
            >
              <div style={{fontFamily: MONO, fontSize: 50}}>{verb.label}</div>
              <div style={{fontFamily: TITLE_FONT, fontSize: 50, fontWeight: 900, marginTop: 54}}>{verb.zh}</div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 665,
          width: 210,
          height: 210,
          borderRadius: 52,
          padding: 26,
          boxSizing: 'border-box',
          background: '#fff',
          boxShadow: '0 0 0 12px rgba(255,255,255,.07), 0 34px 100px rgba(0,0,0,.44)',
          opacity: logo,
          transform: `translate(-50%, -50%) scale(${interpolate(logo, [0, 1], [.55, 1])})`,
        }}
      >
        <Img
          src={staticFile('brand/jr-box.svg')}
          style={{width: '100%', height: '100%', objectFit: 'contain'}}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 62,
          right: 62,
          top: 900,
          opacity: title,
          transform: `translateY(${interpolate(title, [0, 1], [60, 0])}px)`,
        }}
      >
        <div style={{fontFamily: MONO, fontSize: 50, color: C.coral}}>HISTORY = RAW MATERIAL</div>
        <div style={{fontFamily: TITLE_FONT, fontSize: 75, lineHeight: 1.08, fontWeight: 900, letterSpacing: -2.8, marginTop: 24}}>
          聊天历史是原料
          <br />
          Memory 才是系统
        </div>
        <div style={{width: 170, height: 7, borderRadius: 99, background: C.coral, marginTop: 42}} />
        <div style={{fontFamily: TITLE_FONT, fontSize: 50, fontWeight: 900, marginTop: 28, color: '#D5D6D8'}}>
          管理写入、检索与删除
        </div>
      </div>
    </AbsoluteFill>
  );
};

type CaptionCue = {
  from: number;
  to: number;
  text: string;
  accent: string;
};

const CAPTIONS: CaptionCue[] = [
  {from: 12, to: 105, text: '把聊天记录全塞给 Agent，\n它就有记忆了吗？', accent: '记忆'},
  {from: 105, to: 288, text: '聊天历史只是当前会话的 Context，\n不是完整的 Memory 系统。', accent: 'Context'},
  {from: 292, to: 505, text: '换一个 Thread，或者 Context 被裁剪，\n历史信息就可能消失。', accent: '消失'},
  {from: 510, to: 675, text: '工程上至少分三层：任务状态、\n短期记忆、长期记忆。', accent: '三层'},
  {from: 683, to: 795, text: '比如，所有项目都用 TypeScript。', accent: 'TypeScript'},
  {from: 795, to: 995, text: '重放历史要带上一百多条消息；\nMemory 只存一条用户喜好。', accent: '一条'},
  {from: 1001, to: 1260, text: 'Agent 按用户 ID 检索用户喜好，\n需要时再放进 Context。', accent: '需要时'},
  {from: 1266, to: 1450, text: '聊天历史是原料；Agent Memory，\n才是管理写入、检索和删除的系统。', accent: '系统'},
];

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const cue = CAPTIONS.find((item) => frame >= item.from && frame < item.to);
  if (!cue) return null;
  const parts = cue.text.split(cue.accent);
  const enter = interpolate(frame, [cue.from, cue.from + 6], [0, 1], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 54,
        right: 54,
        bottom: 270,
        zIndex: 100,
        minHeight: 170,
        display: 'grid',
        placeItems: 'center',
        padding: '22px 36px',
        borderRadius: 25,
        background: 'rgba(16,18,23,.96)',
        border: '1px solid rgba(255,255,255,.2)',
        boxShadow: '0 22px 70px rgba(0,0,0,.28)',
        color: '#fff',
        textAlign: 'center',
        whiteSpace: 'pre-line',
        fontFamily: FONT,
        fontSize: 66,
        lineHeight: 1.25,
        fontWeight: 900,
        letterSpacing: -0.8,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [18, 0])}px)`,
      }}
    >
      <span>
        {parts[0]}
        <span style={{color: C.yellow}}>{cue.accent}</span>
        {parts[1] ?? ''}
      </span>
    </div>
  );
};

const Soundtrack: React.FC<{withBgm: boolean}> = ({withBgm}) => (
  <>
    <Sequence from={12} premountFor={30}>
      <Audio src={staticFile('audio/narration-elevenlabs.wav')} volume={1} />
    </Sequence>
    {withBgm ? (
      <Audio
        src={staticFile('audio/music-ai-news-49.mp3')}
        volume={(frame) =>
          interpolate(frame, [0, 18, 1350, 1410, 1469], [0, 0.105, 0.105, 0.16, 0], clamp)
        }
      />
    ) : null}
    {[
      {from: 0, file: 'sweep-short.mp3', volume: 0.15},
      {from: 380, file: 'switch-click-quick.mp3', volume: 0.14},
      {from: 540, file: 'data-scan.mp3', volume: 0.1},
      {from: 750, file: 'typewriter-hit-single.mp3', volume: 0.12},
      {from: 1080, file: 'data-scan.mp3', volume: 0.1},
      {from: 1266, file: 'bass-hit-short.mp3', volume: 0.14},
    ].map((sound, index) => (
      <Sequence key={`${sound.file}-${index}`} from={sound.from} premountFor={30}>
        <Audio src={staticFile(`audio/${sound.file}`)} volume={sound.volume} />
      </Sequence>
    ))}
  </>
);

export const AgentMemoryVideoV2: React.FC<AgentMemoryVideoProps> = ({withBgm}) => (
  <AbsoluteFill style={{background: C.paper}}>
    <Sequence from={SHOTS.hook.from} durationInFrames={SHOTS.hook.duration} premountFor={30}>
      <Hook />
    </Sequence>
    <Sequence from={SHOTS.thread.from} durationInFrames={SHOTS.thread.duration} premountFor={30}>
      <ThreadBoundary />
    </Sequence>
    <Sequence from={SHOTS.layers.from} durationInFrames={SHOTS.layers.duration} premountFor={30}>
      <MemoryLayers />
    </Sequence>
    <Sequence from={SHOTS.compare.from} durationInFrames={SHOTS.compare.duration} premountFor={30}>
      <HistoryVsMemory />
    </Sequence>
    <Sequence from={SHOTS.retrieve.from} durationInFrames={SHOTS.retrieve.duration} premountFor={30}>
      <Retrieval />
    </Sequence>
    <Sequence from={SHOTS.close.from} durationInFrames={SHOTS.close.duration} premountFor={30}>
      <Close />
    </Sequence>
    <Soundtrack withBgm={withBgm} />
    <Captions />
  </AbsoluteFill>
);
