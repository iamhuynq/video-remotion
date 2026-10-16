import React from "react";
import { Composition } from "remotion";
import { RankingVideo, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH, VIDEO_DURATION } from "./compositions/RankingVideo";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="NarutoRanking"
    component={RankingVideo}
    durationInFrames={VIDEO_DURATION}
    fps={VIDEO_FPS}
    width={VIDEO_WIDTH}
    height={VIDEO_HEIGHT}
  />
);
