import React from "react";
import { Composition } from "remotion";
import { RankingVideo, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH, VIDEO_DURATION } from "./compositions/RankingVideo";
import {
  AkatsukiRanking,
  AKATSUKI_DURATION,
  AKATSUKI_FPS,
  AKATSUKI_HEIGHT,
  AKATSUKI_WIDTH,
} from "./compositions/AkatsukiRanking";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="NarutoRanking"
      component={RankingVideo}
      durationInFrames={VIDEO_DURATION}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
    <Composition
      id="AkatsukiRanking"
      component={AkatsukiRanking}
      durationInFrames={AKATSUKI_DURATION}
      fps={AKATSUKI_FPS}
      width={AKATSUKI_WIDTH}
      height={AKATSUKI_HEIGHT}
    />
  </>
);
