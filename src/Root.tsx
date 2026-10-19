import React from "react";
import { Composition } from "remotion";
import { RankingVideo, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH, VIDEO_DURATION } from "./compositions/RankingVideo";
import { NarutoWalk } from "./compositions/NarutoWalk";

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
  <Composition id="NarutoWalk" component={NarutoWalk} durationInFrames={300} fps={30} width={1080} height={1920} />
  </>
);
