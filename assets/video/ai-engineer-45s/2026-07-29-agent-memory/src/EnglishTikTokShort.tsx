import React from 'react';
import {Audio} from '@remotion/media';
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from 'remotion';

export const ENGLISH_TIKTOK_FRAMES = 1365;
export const ENGLISH_TIKTOK_FPS = 30;

export type EnglishCue = {
  from: number;
  to: number;
  lines: [string, string?];
};

export type EnglishTikTokConfig = {
  episode: string;
  accent: string;
  hook: [string, string];
  verdict: string;
  failureTitle: string;
  failurePath: [string, string, string];
  exampleTitle: string;
  before: [string, string];
  after: [string, string];
  fixTitle: string;
  fixPath: [string, string, string];
  close: [string, string];
  footer: string;
  narrationPath: string;
  bgmPath: string;
  captions: EnglishCue[];
  actorLabel: string;
  journeyNodes: [string, string, string, string, string, string];
  mechanismStates: Array<{
    from: number;
    to: number;
    node: number;
    label: string;
    tone: 'neutral' | 'failure' | 'success';
  }>;
  duplicateWindow?: [number, number];
  returnWindow?: [number, number];
};

export type EnglishTikTokShortProps = {
  withBgm: boolean;
  config: EnglishTikTokConfig;
};

const C = {
  navy: '#0B1024',
  navy2: '#171B3D',
  white: '#FFFCF6',
  muted: '#B7BEDC',
  coral: '#FF7557',
  cyan: '#3DD6D0',
  yellow: '#FFD154',
  red: '#FF5364',
  green: '#41D38A',
  violet: '#9672FF',
};
const FONT = 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
const MONO = '"SFMono-Regular", Menlo, Monaco, monospace';
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const fadeWindow = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, from + 12, to - 12, to], [0, 1, 1, 0], clamp);

const Grid: React.FC = () => (
  <AbsoluteFill
    style={{
      opacity: 0.2,
      backgroundImage:
        'linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)',
      backgroundSize: '54px 54px',
      maskImage: 'linear-gradient(to bottom,black,transparent 90%)',
    }}
  />
);

const Brand: React.FC<{episode: string}> = ({episode}) => (
  <div
    style={{
      position: 'absolute',
      left: 58,
      right: 58,
      top: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 50,
      color: C.white,
    }}
  >
    <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{width: 52, height: 52, padding: 7, borderRadius: 14, background: '#fff'}}>
        <Img src={staticFile('brand/jr-box.svg')} style={{width: '100%', height: '100%'}} />
      </div>
      <div style={{font: `900 29px ${FONT}`, letterSpacing: -0.6}}>AI ENGINEER</div>
    </div>
    <div style={{font: `800 19px ${MONO}`, color: C.muted}}>{episode}</div>
  </div>
);

const Hook: React.FC<{config: EnglishTikTokConfig}> = ({config}) => {
  const frame = useCurrentFrame();
  const enter = spring({frame: frame - 3, fps: 30, config: {damping: 17, stiffness: 145}});
  const verdict = spring({frame: frame - 55, fps: 30, config: {damping: 14, stiffness: 175}});
  return (
    <AbsoluteFill style={{padding: '170px 62px 360px', justifyContent: 'center'}}>
      <div style={{font: `850 22px ${MONO}`, color: config.accent, letterSpacing: 1.8}}>
        PRODUCTION REALITY
      </div>
      <div
        style={{
          marginTop: 20,
          font: `950 91px/0.98 ${FONT}`,
          letterSpacing: -5.2,
          color: C.white,
          opacity: enter,
          transform: `translateY(${interpolate(enter, [0, 1], [48, 0])}px)`,
        }}
      >
        {config.hook[0]}
        <br />
        <span style={{color: config.accent}}>{config.hook[1]}</span>
      </div>
      <div
        style={{
          marginTop: 54,
          display: 'inline-flex',
          alignSelf: 'flex-start',
          padding: '18px 28px',
          borderRadius: 18,
          background: 'rgba(255,83,100,.13)',
          border: `2px solid ${C.red}`,
          color: C.white,
          font: `900 35px ${FONT}`,
          opacity: verdict,
          transform: `scale(${interpolate(verdict, [0, 1], [0.82, 1])})`,
        }}
      >
        {config.verdict}
      </div>
    </AbsoluteFill>
  );
};

const FlowNode: React.FC<{
  label: string;
  index: number;
  start: number;
  color: string;
  failed?: boolean;
}> = ({label, index, start, color, failed = false}) => {
  const frame = useCurrentFrame();
  const enter = spring({frame: frame - start - index * 15, fps: 30, config: {damping: 16, stiffness: 155}});
  return (
    <div style={{display: 'flex', alignItems: 'center', flex: 1}}>
      <div
        style={{
          width: 228,
          minHeight: 156,
          padding: '24px 18px',
          borderRadius: 24,
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          color: C.white,
          background: failed ? 'rgba(255,83,100,.17)' : 'rgba(255,255,255,.065)',
          border: `2px solid ${failed ? C.red : color}`,
          boxShadow: `0 18px 60px ${failed ? 'rgba(255,83,100,.16)' : 'rgba(0,0,0,.25)'}`,
          font: `900 30px/1.08 ${FONT}`,
          opacity: enter,
          transform: `translateY(${interpolate(enter, [0, 1], [35, 0])}px) scale(${interpolate(enter, [0, 1], [0.9, 1])})`,
        }}
      >
        {label}
      </div>
      {index < 2 ? (
        <div style={{width: 58, height: 3, background: failed ? C.red : color, opacity: enter, position: 'relative'}}>
          <div style={{position: 'absolute', right: -1, top: -7, borderLeft: `14px solid ${failed ? C.red : color}`, borderTop: '8px solid transparent', borderBottom: '8px solid transparent'}} />
        </div>
      ) : null}
    </div>
  );
};

const FailureFlow: React.FC<{config: EnglishTikTokConfig}> = ({config}) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame % 24, [0, 12, 24], [0.55, 1, 0.55]);
  return (
    <AbsoluteFill style={{padding: '185px 58px 360px'}}>
      <div style={{font: `850 23px ${MONO}`, color: C.red, letterSpacing: 1.7}}>THE FAILURE PATH</div>
      <div style={{marginTop: 18, color: C.white, font: `950 63px/1.02 ${FONT}`, letterSpacing: -3}}>{config.failureTitle}</div>
      <div style={{display: 'flex', alignItems: 'center', marginTop: 145}}>
        {config.failurePath.map((label, index) => (
          <FlowNode key={label} label={label} index={index} start={220} color={C.coral} failed={index === 2} />
        ))}
      </div>
      <div style={{marginTop: 70, padding: '26px 30px', borderRadius: 22, background: 'rgba(255,83,100,.12)', border: '1px solid rgba(255,83,100,.5)', color: C.white, font: `850 30px ${FONT}`, opacity: pulse}}>
        The red state is real. Treating it as success creates the incident.
      </div>
    </AbsoluteFill>
  );
};

const Compare: React.FC<{config: EnglishTikTokConfig}> = ({config}) => {
  const frame = useCurrentFrame();
  const divider = spring({frame: frame - 480, fps: 30, config: {damping: 20, stiffness: 115}});
  const Card: React.FC<{title: string; lines: [string, string]; good?: boolean}> = ({title, lines, good}) => (
    <div style={{flex: 1, minHeight: 490, padding: '34px 30px', borderRadius: 30, background: good ? 'rgba(65,211,138,.12)' : 'rgba(255,83,100,.11)', border: `2px solid ${good ? C.green : C.red}`}}>
      <div style={{font: `900 22px ${MONO}`, color: good ? C.green : C.red, letterSpacing: 1.4}}>{title}</div>
      <div style={{marginTop: 80, color: C.white, font: `950 50px/1.08 ${FONT}`, letterSpacing: -2}}>{lines[0]}</div>
      <div style={{marginTop: 34, color: C.muted, font: `750 30px/1.24 ${FONT}`}}>{lines[1]}</div>
      <div style={{marginTop: 54, width: 86, height: 8, borderRadius: 99, background: good ? C.green : C.red}} />
    </div>
  );
  return (
    <AbsoluteFill style={{padding: '180px 58px 350px'}}>
      <div style={{font: `850 23px ${MONO}`, color: config.accent, letterSpacing: 1.7}}>CONCRETE EXAMPLE</div>
      <div style={{marginTop: 16, color: C.white, font: `950 60px/1 ${FONT}`, letterSpacing: -2.8}}>{config.exampleTitle}</div>
      <div style={{display: 'flex', gap: 24, marginTop: 80, opacity: divider, transform: `translateY(${interpolate(divider, [0, 1], [36, 0])}px)`}}>
        <Card title="BEFORE" lines={config.before} />
        <Card title="AFTER" lines={config.after} good />
      </div>
    </AbsoluteFill>
  );
};

const FixFlow: React.FC<{config: EnglishTikTokConfig}> = ({config}) => (
  <AbsoluteFill style={{padding: '185px 58px 350px'}}>
    <div style={{font: `850 23px ${MONO}`, color: C.green, letterSpacing: 1.7}}>THE ENGINEERING FIX</div>
    <div style={{marginTop: 18, color: C.white, font: `950 64px/1.02 ${FONT}`, letterSpacing: -3}}>{config.fixTitle}</div>
    <div style={{display: 'flex', alignItems: 'center', marginTop: 145}}>
      {config.fixPath.map((label, index) => (
        <FlowNode key={label} label={label} index={index} start={780} color={C.green} />
      ))}
    </div>
    <div style={{marginTop: 74, display: 'flex', gap: 14}}>
      {['observable', 'bounded', 'reversible'].map((word, index) => (
        <div key={word} style={{padding: '13px 17px', borderRadius: 999, border: '1px solid rgba(255,255,255,.18)', color: index === 1 ? config.accent : C.muted, font: `800 19px ${MONO}`}}>{word.toUpperCase()}</div>
      ))}
    </div>
  </AbsoluteFill>
);

const Close: React.FC<{config: EnglishTikTokConfig}> = ({config}) => {
  const frame = useCurrentFrame();
  const enter = spring({frame: frame - 1142, fps: 30, config: {damping: 18, stiffness: 130}});
  return (
    <AbsoluteFill style={{padding: '180px 62px 520px', justifyContent: 'center'}}>
      <div style={{font: `850 22px ${MONO}`, color: config.accent, letterSpacing: 1.7}}>REMEMBER THIS</div>
      <div style={{marginTop: 24, color: C.white, font: `950 82px/1 ${FONT}`, letterSpacing: -4.6, opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [42, 0])}px)`}}>
        {config.close[0]}
        <br />
        <span style={{color: config.accent}}>{config.close[1]}</span>
      </div>
      <div style={{marginTop: 52, width: 180, height: 8, borderRadius: 99, background: config.accent}} />
      <div style={{marginTop: 30, color: C.muted, font: `800 28px ${MONO}`}}>{config.footer}</div>
    </AbsoluteFill>
  );
};

const Captions: React.FC<{cues: EnglishCue[]}> = ({cues}) => {
  const frame = useCurrentFrame();
  const cue = cues.find((item) => frame >= item.from && frame < item.to);
  if (!cue) return null;
  const enter = interpolate(frame, [cue.from, cue.from + 5], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', left: 48, right: 48, bottom: 198, zIndex: 100, minHeight: 142, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '18px 30px', borderRadius: 24, background: 'rgba(7,10,24,.94)', border: '1px solid rgba(255,255,255,.2)', boxShadow: '0 24px 72px rgba(0,0,0,.36)', opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [14, 0])}px)`}}>
      {cue.lines.filter(Boolean).map((line, index) => (
        <div key={line} style={{color: index === cue.lines.length - 1 ? C.white : '#EEF0FA', font: `900 48px/1.16 ${FONT}`, letterSpacing: -1.2, textAlign: 'center'}}>{line}</div>
      ))}
    </div>
  );
};

const MechanismSpine: React.FC<{config: EnglishTikTokConfig}> = ({config}) => {
  const frame = useCurrentFrame();
  const stateIndex = Math.max(
    0,
    config.mechanismStates.findIndex(
      (state) => frame >= state.from && frame < state.to,
    ),
  );
  const state =
    config.mechanismStates[stateIndex] ??
    config.mechanismStates[config.mechanismStates.length - 1];
  const previousNode =
    stateIndex > 0 ? config.mechanismStates[stateIndex - 1].node : 0;
  const nodeProgress = interpolate(
    frame,
    [state.from, Math.min(state.from + 18, state.to)],
    [previousNode, state.node],
    clamp,
  );
  const railWidth = 856;
  const actorX = (nodeProgress / 5) * railWidth;
  const actorWidth = 210;
  const actorLeft = Math.min(
    Math.max(actorX - actorWidth / 2, 0),
    railWidth - actorWidth,
  );
  const toneColor =
    state.tone === 'failure'
      ? C.red
      : state.tone === 'success'
        ? C.green
        : config.accent;
  const duplicateVisible =
    config.duplicateWindow &&
    frame >= config.duplicateWindow[0] &&
    frame < config.duplicateWindow[1];
  const returnVisible =
    config.returnWindow &&
    frame >= config.returnWindow[0] &&
    frame < config.returnWindow[1];

  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        top: 1030,
        height: 300,
        zIndex: 75,
        padding: '24px 28px',
        borderRadius: 26,
        background: 'rgba(7,10,24,.86)',
        border: '1px solid rgba(255,255,255,.16)',
        boxShadow: '0 26px 90px rgba(0,0,0,.28)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: C.white,
        }}
      >
        <div style={{font: `850 22px ${MONO}`, color: C.muted, letterSpacing: 1.4}}>
          LIVE SYSTEM STATE
        </div>
        <div style={{maxWidth: 690, textAlign: 'right', font: `900 30px ${FONT}`, color: toneColor}}>
          {state.label}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 42,
          right: 42,
          top: 139,
          height: 4,
          borderRadius: 99,
          background: 'rgba(255,255,255,.16)',
        }}
      >
        <div
          style={{
            width: `${(nodeProgress / 5) * 100}%`,
            height: '100%',
            borderRadius: 99,
            background: toneColor,
            boxShadow: `0 0 24px ${toneColor}`,
          }}
        />
        {returnVisible ? (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: -42,
              width: railWidth,
              height: 3,
              borderRadius: 99,
              background: `linear-gradient(90deg, ${config.accent}, ${config.accent}33)`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: -1,
                top: -7,
                borderRight: `14px solid ${config.accent}`,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
              }}
            />
          </div>
        ) : null}
        {returnVisible ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: -74,
              width: 170,
              padding: '8px 10px',
              boxSizing: 'border-box',
              borderRadius: 12,
              background: config.accent,
              color: C.navy,
              textAlign: 'center',
              font: `950 21px ${MONO}`,
              boxShadow: `0 8px 28px ${config.accent}55`,
            }}
          >
            TOOL_RESULT
          </div>
        ) : null}
        {config.journeyNodes.map((node, index) => {
          const x = (index / 5) * railWidth;
          const active = nodeProgress >= index - 0.05;
          return (
            <div key={node} style={{position: 'absolute', left: x, top: 0}}>
              <div
                style={{
                  position: 'absolute',
                  left: -9,
                  top: -7,
                  width: 18,
                  height: 18,
                  borderRadius: 99,
                  background: active ? toneColor : C.navy2,
                  border: `2px solid ${active ? toneColor : 'rgba(255,255,255,.3)'}`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: -80,
                  top: 30,
                  width: 160,
                  color: active ? C.white : C.muted,
                  textAlign: 'center',
                  font: `850 28px/1.05 ${MONO}`,
                }}
              >
                {node}
              </div>
            </div>
          );
        })}
        <div
          style={{
            position: 'absolute',
            left: actorLeft,
            top: -18,
            width: actorWidth,
            padding: '10px 14px',
            boxSizing: 'border-box',
            borderRadius: 13,
            background: toneColor,
            color: C.navy,
            textAlign: 'center',
            font: `950 24px ${MONO}`,
            boxShadow: `0 10px 34px ${toneColor}55`,
          }}
        >
          {config.actorLabel}
        </div>
        {duplicateVisible ? (
          <div
            style={{
              position: 'absolute',
              left: actorX - 44,
              top: -95,
              padding: '8px 12px',
              borderRadius: 11,
              background: C.red,
              color: C.white,
              font: `950 21px ${MONO}`,
              transform: 'rotate(4deg)',
            }}
          >
            DUPLICATE
          </div>
        ) : null}
      </div>
    </div>
  );
};

const AudioBed: React.FC<EnglishTikTokShortProps> = ({withBgm, config}) => (
  <>
    <Sequence from={9} premountFor={30}>
      <Audio src={staticFile(config.narrationPath)} volume={1} />
    </Sequence>
    {withBgm ? (
      <Audio src={staticFile(config.bgmPath)} loop volume={(f) => interpolate(f, [0, 24, 1290, 1364], [0, 0.075, 0.075, 0], clamp)} />
    ) : null}
  </>
);

export const EnglishTikTokShort: React.FC<EnglishTikTokShortProps> = ({withBgm, config}) => {
  const frame = useCurrentFrame();
  const fixOpacity =
    frame < 1142 ? interpolate(frame, [756, 768], [0, 1], clamp) : 0;
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 76% 16%,rgba(150,114,255,.24),transparent 30%),radial-gradient(circle at 18% 70%,rgba(61,214,208,.12),transparent 34%),linear-gradient(180deg,#121735,#070B1A)', overflow: 'hidden', fontFamily: FONT}}>
      <Grid />
      <Brand episode={config.episode} />
      <div style={{opacity: fadeWindow(frame, 0, 198)}}><Hook config={config} /></div>
      <div style={{opacity: fadeWindow(frame, 186, 462)}}><FailureFlow config={config} /></div>
      <div style={{opacity: fadeWindow(frame, 450, 768)}}><Compare config={config} /></div>
      <div style={{opacity: fixOpacity}}><FixFlow config={config} /></div>
      <div style={{opacity: frame >= 1142 ? 1 : 0}}><Close config={config} /></div>
      <MechanismSpine config={config} />
      <Captions cues={config.captions} />
      <AudioBed withBgm={withBgm} config={config} />
    </AbsoluteFill>
  );
};
