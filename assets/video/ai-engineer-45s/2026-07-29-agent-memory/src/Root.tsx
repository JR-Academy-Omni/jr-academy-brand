import React from 'react';
import {Composition, Still} from 'remotion';
import {
  AgentMemoryVideoProps,
  AgentMemoryVideoV2,
  TOTAL_FRAMES,
} from './AgentMemoryVideoV2';
import {
  ENGLISH_TIKTOK_FPS,
  ENGLISH_TIKTOK_FRAMES,
  EnglishTikTokShort,
  EnglishTikTokShortProps,
} from './EnglishTikTokShort';
import {agentMemoryEnglishConfig} from './english-tiktok-config';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="AgentMemory"
      component={AgentMemoryVideoV2}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={TOTAL_FRAMES}
      defaultProps={{withBgm: true} satisfies AgentMemoryVideoProps}
    />
    <Still
      id="AgentMemoryStill"
      component={AgentMemoryVideoV2}
      width={1080}
      height={1920}
      defaultProps={{withBgm: false} satisfies AgentMemoryVideoProps}
    />
    <Composition
      id="AgentMemoryTikTokEnglish"
      component={EnglishTikTokShort}
      width={1080}
      height={1920}
      fps={ENGLISH_TIKTOK_FPS}
      durationInFrames={ENGLISH_TIKTOK_FRAMES}
      defaultProps={{withBgm: true, config: agentMemoryEnglishConfig} satisfies EnglishTikTokShortProps}
    />
  </>
);
