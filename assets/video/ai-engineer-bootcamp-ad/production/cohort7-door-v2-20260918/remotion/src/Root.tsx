import {SeedanceStack} from './SeedanceStack';
import React from 'react';
import {Composition} from 'remotion';
import {Outro} from './Composition';
import {TechStack} from './TechStack';
import {Overseas} from './Overseas';
export const RemotionRoot:React.FC=()=> <><Composition id="Cohort7Outro" component={Outro} width={1920} height={1080} fps={24} durationInFrames={192}/><Composition id="OverseasPage" component={Overseas} width={1920} height={1080} fps={24} durationInFrames={180}/><Composition id="TechStack" component={TechStack} width={1920} height={1080} fps={24} durationInFrames={192}/><Composition id="SeedanceStack" component={SeedanceStack} width={1920} height={1080} fps={24} durationInFrames={192}/></>;
