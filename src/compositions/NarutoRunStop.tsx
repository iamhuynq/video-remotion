import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

const W = 1080;
const H = 1920;

type Pose = {
  x: number;
  y: number;
  lean: number;
  crouch: number;
  leftArm: number;
  rightArm: number;
  leftLeg: number;
  rightLeg: number;
  head: number;
};

const POSES: Array<{ frame: number; pose: Pose }> = [
  { frame: 0, pose: { x: -280, y: 20, lean: 24, crouch: 0.1, leftArm: -45, rightArm: 36, leftLeg: -42, rightLeg: 38, head: 5 } },
  { frame: 12, pose: { x: -205, y: -12, lean: 20, crouch: 0.12, leftArm: 35, rightArm: -48, leftLeg: 38, rightLeg: -43, head: 2 } },
  { frame: 24, pose: { x: -128, y: 15, lean: 23, crouch: 0.08, leftArm: -48, rightArm: 38, leftLeg: -40, rightLeg: 42, head: 5 } },
  { frame: 36, pose: { x: -65, y: -10, lean: 20, crouch: 0.13, leftArm: 36, rightArm: -48, leftLeg: 40, rightLeg: -44, head: 1 } },
  { frame: 48, pose: { x: -18, y: 14, lean: 17, crouch: 0.1, leftArm: -40, rightArm: 32, leftLeg: -35, rightLeg: 38, head: 4 } },
  { frame: 60, pose: { x: 0, y: 0, lean: 12, crouch: 0.12, leftArm: 20, rightArm: -22, leftLeg: 22, rightLeg: -18, head: 0 } },
  { frame: 70, pose: { x: 0, y: 25, lean: -5, crouch: 0.3, leftArm: -10, rightArm: 28, leftLeg: -30, rightLeg: 24, head: -3 } },
  { frame: 82, pose: { x: 0, y: 12, lean: -8, crouch: 0.65, leftArm: -22, rightArm: 35, leftLeg: -48, rightLeg: 36, head: -4 } },
  { frame: 98, pose: { x: 0, y: 0, lean: -4, crouch: 0.85, leftArm: -28, rightArm: 32, leftLeg: -52, rightLeg: 42, head: 0 } },
  { frame: 149, pose: { x: 0, y: 0, lean: -4, crouch: 0.85, leftArm: -28, rightArm: 32, leftLeg: -52, rightLeg: 42, head: 0 } },
];

const poseAt = (frame: number): Pose => {
  let index = POSES.findIndex((item) => item.frame >= frame);
  if (index <= 0) return POSES[0].pose;
  const a = POSES[index - 1];
  const b = POSES[index];
  const t = interpolate(frame, [a.frame, b.frame], [0, 1], { easing: Easing.inOut(Easing.quad), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const result = {} as Pose;
  (Object.keys(a.pose) as Array<keyof Pose>).forEach((key) => {
    result[key] = interpolate(t, [0, 1], [a.pose[key], b.pose[key]]) as never;
  });
  return result;
};

const NarutoFigure: React.FC<{ pose: Pose; frame: number }> = ({ pose, frame }) => {
  const runBounce = frame < 64 ? Math.sin(frame * 0.52) * 13 : 0;
  const bodyDrop = pose.crouch * 95;
  const headTilt = pose.head + Math.sin(frame * 0.18) * (frame < 65 ? 2.5 : 0.4);
  return (
    <g transform={`translate(${540 + pose.x} ${1050 + pose.y + runBounce + bodyDrop}) rotate(${pose.lean}) scale(1.22)`}>
      {/* Back leg: its rotation is interpolated between hand-authored poses. */}
      <g transform={`translate(-24 105) rotate(${pose.leftLeg})`}>
        <path d="M 0 0 Q -25 65 -44 126 L -72 149 L -68 166 L -17 162 Q 16 100 30 35 Z" fill="#202630" stroke="#111820" strokeWidth="12" strokeLinejoin="round"/>
        <path d="M -71 146 L -20 146 L -11 164 L -74 172 Z" fill="#151a22"/>
      </g>
      {/* Front leg / orange trouser leg. */}
      <g transform={`translate(23 105) rotate(${pose.rightLeg})`}>
        <path d="M 0 0 Q 36 53 49 105 L 78 129 L 74 148 L 26 148 Q -12 105 -24 35 Z" fill="#ed7925" stroke="#b84c19" strokeWidth="12" strokeLinejoin="round"/>
        <path d="M 51 123 L 83 125 L 81 145 L 51 146 Z" fill="#202630"/>
      </g>
      {/* Torso, kept as a separate pivot so the lean is readable. */}
      <g transform={`translate(0 -20) rotate(${pose.lean * -0.45})`}>
        <path d={`M -66 -86 Q -105 -28 -72 ${95 + bodyDrop * 0.12} L 55 ${95 + bodyDrop * 0.12} Q 93 -18 64 -86 Z`} fill="#ef7a22" stroke="#202630" strokeWidth="15" strokeLinejoin="round"/>
        <path d="M -66 -83 L 63 -83 L 48 -28 L -46 -28 Z" fill="#202630"/>
        <path d="M -42 -13 L 42 -13 L 34 63 L -33 63 Z" fill="#f3a044" opacity=".45"/>
        <path d="M 40 -62 L 64 -52 L 58 12 L 36 7 Z" fill="#303a49"/>
      </g>
      {/* Arms swing independently at the shoulders. */}
      <g transform={`translate(-57 -65) rotate(${pose.leftArm})`}>
        <path d="M 0 0 Q -26 44 -20 83 L -3 99 Q 16 58 29 24 Z" fill="#202630" stroke="#111820" strokeWidth="17" strokeLinejoin="round"/>
        <path d="M -3 88 L 14 90 L 18 109 L -4 109 Z" fill="#e8b18a"/>
      </g>
      <g transform={`translate(52 -65) rotate(${pose.rightArm})`}>
        <path d="M 0 0 Q 24 35 17 74 L 0 92 Q -15 58 -27 22 Z" fill="#ef7a22" stroke="#202630" strokeWidth="17" strokeLinejoin="round"/>
        <path d="M 0 82 L 16 78 L 23 98 L 4 104 Z" fill="#e8b18a"/>
      </g>
      {/* Neck and face */}
      <rect x="-28" y="-133" width="56" height="55" rx="13" fill="#e8ac80"/>
      <g transform={`translate(0 -166) rotate(${headTilt})`}>
        <ellipse cx="0" cy="0" rx="67" ry="77" fill="#f1bc91" stroke="#d88d61" strokeWidth="6"/>
        <ellipse cx="-65" cy="4" rx="13" ry="22" fill="#f1bc91"/>
        <ellipse cx="65" cy="4" rx="13" ry="22" fill="#f1bc91"/>
        {/* Hair spikes are polygonal shapes, not a bitmap. */}
        <path d="M -62 -22 L -94 -62 L -55 -55 L -70 -99 L -31 -72 L -9 -119 L 13 -75 L 48 -101 L 43 -59 L 84 -74 L 68 -36 L 55 -18 Z" fill="#f6c52f" stroke="#d59c20" strokeWidth="7" strokeLinejoin="round"/>
        <path d="M -66 -37 Q 0 -56 66 -37 L 72 -10 Q 0 -28 -72 -10 Z" fill="#303b4c"/>
        <rect x="-30" y="-44" width="60" height="30" rx="4" fill="#b9c2ca" stroke="#687684" strokeWidth="4"/>
        <path d="M -8 -36 Q 6 -48 9 -35 Q 7 -26 -4 -25 L 4 -32" fill="none" stroke="#34414e" strokeWidth="4"/>
        {/* Eyes, brows, nose and signature cheek marks. */}
        <path d="M -43 -3 L -12 1 L -25 14 Z M 12 1 L 43 -3 L 25 14 Z" fill="#fff"/>
        <circle cx="-25" cy="4" r="7" fill="#2a83b9"/><circle cx="25" cy="4" r="7" fill="#2a83b9"/>
        <path d="M -46 -9 L -12 -8 M 12 -8 L 46 -9" stroke="#3a2b2a" strokeWidth="6" strokeLinecap="round"/>
        <path d="M -57 20 L -32 26 M -57 31 L -32 36 M 32 26 L 57 20 M 32 36 L 57 31" stroke="#b87555" strokeWidth="4" strokeLinecap="round"/>
        <path d="M 62 -29 Q 98 -13 132 -38 L 118 -15 L 84 -8" fill="#303b4c"/>
      </g>
    </g>
  );
};

const Forest: React.FC<{ frame: number }> = ({ frame }) => {
  const drift = interpolate(frame, [0, 70, 149], [0, -260, -260], { extrapolateRight: "clamp" });
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="runstop-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#203c42"/><stop offset="60%" stopColor="#52765b"/><stop offset="100%" stopColor="#b2a36e"/></linearGradient>
        <radialGradient id="runstop-sun"><stop offset="0%" stopColor="#fff3b0" stopOpacity=".8"/><stop offset="100%" stopColor="#fff3b0" stopOpacity="0"/></radialGradient>
        <linearGradient id="runstop-ground" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#6c7650"/><stop offset="100%" stopColor="#293c32"/></linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#runstop-sky)"/>
      <circle cx="690" cy="410" r="440" fill="url(#runstop-sun)"/>
      <g transform={`translate(${drift * 0.22} 0)`}>
        {Array.from({ length: 17 }, (_, i) => {
          const x = ((i * 173 + 31) % (W + 250)) - 100;
          const y = 130 + ((i * 239) % 1080);
          const s = 0.7 + ((i * 7) % 8) / 10;
          return <g key={i} transform={`translate(${x} ${y}) scale(${s})`} opacity={0.45 + (i % 4) * 0.1}>
            <path d="M 0 0 L -95 800 L 85 800 Z" fill={i % 2 ? "#132e2a" : "#274537"}/>
            <path d="M 0 40 L -125 190 L -50 180 L -130 320 L 35 260 L 85 150 Z" fill="#315a40"/>
          </g>;
        })}
      </g>
      <path d="M 0 1200 Q 220 1120 440 1200 T 1080 1180 L 1080 1920 L 0 1920 Z" fill="url(#runstop-ground)"/>
      {Array.from({ length: 32 }, (_, i) => <path key={i} d={`M ${((i * 97 + drift * 0.5) % W + W) % W} 1920 l ${-20 + (i % 5) * 9} -${180 + (i % 6) * 60}`} stroke={i % 2 ? "#9c9b5b" : "#3f6442"} strokeWidth={2 + i % 4} opacity=".5"/>)}
    </svg>
  );
};

export const NarutoRunStop: React.FC = () => {
  const frame = useCurrentFrame();
  const pose = poseAt(frame);
  const impact = interpolate(frame, [65, 72, 84, 92], [0, 1, 0.25, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const shake = frame >= 66 && frame <= 91 ? Math.sin(frame * 2.7) * impact * 12 : 0;
  const dust = interpolate(frame, [64, 73, 105, 149], [0, 1, 0.45, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const caption = frame < 64 ? "MOVING IN" : frame < 105 ? "TARGET ACQUIRED" : "READY TO STRIKE";
  return (
    <AbsoluteFill style={{ backgroundColor: "#152c2a", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `translate(${shake}px, ${shake * 0.4}px)` }}>
        <Forest frame={frame}/>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
          <ellipse cx="540" cy="1450" rx={180 + dust * 130} ry={24 + dust * 20} fill="#d5c19a" opacity={dust * 0.2}/>
          {Array.from({ length: 26 }, (_, i) => {
            const age = Math.max(0, frame - 66);
            const speed = 2 + (i % 5) * 0.6;
            const p = (age * speed + i * 23) % 160;
            const spread = 35 + p * 1.8;
            return <ellipse key={i} cx={540 + Math.cos(i * 2.4) * spread} cy={1430 + Math.sin(i * 2.4) * (12 + p * 0.6)} rx={5 + (i % 5) * 3} ry={3 + (i % 3) * 2} fill={i % 2 ? "#d6c19a" : "#8b8b65"} opacity={dust * Math.max(0, 0.75 - p / 190)}/>;
          })}
        </svg>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
          <NarutoFigure pose={pose} frame={frame}/>
        </svg>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 58, right: 58, top: 72, display: "flex", justifyContent: "space-between", color: "#f7e9c9", fontFamily: "Arial, sans-serif", letterSpacing: 5, fontWeight: 800, fontSize: 24, textShadow: "0 3px 12px #000" }}>
        <span>SHINOBI FILES</span><span>01 / 05s</span>
      </div>
      <div style={{ position: "absolute", bottom: 86, left: 60, right: 60, color: "#fff3d5", fontFamily: "Arial, sans-serif", textAlign: "center", textShadow: "0 4px 18px #07110d" }}>
        <div style={{ fontSize: 22, letterSpacing: 7, opacity: 0.8 }}>KONOHA • FOREST EDGE</div>
        <div style={{ fontSize: 50, fontWeight: 900, marginTop: 14, letterSpacing: 2 }}>{caption}</div>
      </div>
    </AbsoluteFill>
  );
};
