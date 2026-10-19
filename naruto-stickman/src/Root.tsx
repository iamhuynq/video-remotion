import React from 'react';
import {Composition} from 'remotion';
import {NarutoWalk} from './NarutoWalk';
export const Root: React.FC = () => <Composition id="NarutoWalk" component={NarutoWalk} durationInFrames={300} fps={30} width={1080} height={1920} />;
