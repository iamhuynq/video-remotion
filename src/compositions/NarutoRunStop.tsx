import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

const W = 1080;
const H = 1920;

const trees = Array.from({ length: 16 }, (_, i) => ({
  x: (i * 173 + 31) % W,
  y: 160 + ((i * 239) % 1600),
  scale: 0.65 + ((i * 7) % 8) / 10,
}));

const NarutoFigure: React.FC<{ crouch: number; run: number }> = ({ crouch, run }) => {
  const legSwing = Math.sin(run * Math.PI * 2) * 18;
  return (
    <g transform={`translate(540 1080) rotate(${crouch * -12}) scale(${1 + crouch * 0.06})`}>
      {/* legs */}
      <path d={`M -24 170 L ${-72 + legSwing} 300 L ${-118 + legSwing} 318 L ${-112 + legSwing} 340 L -55 337 L 12 205 Z`} fill="#20252e" stroke="#111820" strokeWidth="12" strokeLinejoin="round" />
      <path d={`M 26 170 L ${70 - legSwing} 265 L ${120 - legSwing} 285 L ${116 - legSwing} 306 L 53 304 L -4 216 Z`} fill="#ef7a22" stroke="#b94b16" strokeWidth="12" strokeLinejoin="round" />
      {/* torso */}
      <path d={`M -70 -60 Q -120 15 -62 190 L 50 190 Q 95 45 63 -60 Z`} fill="#ef7a22" stroke="#222733" strokeWidth="14" />
      <path d="M -65 -55 L 60 -55 L 43 28 L -40 28 Z" fill="#20252e" />
      {/* arms */}
      <path d={`M -65 -35 Q -125 8 ${-125 - run * 15} 80 L ${-98 - run * 15} 92 Q -65 45 -25 18 Z`} fill="#20252e" stroke="#111820" strokeWidth="18" strokeLinejoin="round" />
      <path d={`M 55 -35 Q 110 2 ${90 + crouch * 22} 48 L ${65 + crouch * 22} 43 Q 40 10 22 8 Z`} fill="#ef7a22" stroke="#20252e" strokeWidth="18" strokeLinejoin="round" />
      {/* neck and face */}
      <rect x="-30" y="-102" width="60" height="60" rx="14" fill="#e7a777" />
      <ellipse cx="0" cy="-145" rx="74" ry="83" fill="#f1bc91" stroke="#d88d61" strokeWidth="7" />
      {/* ears */}
      <ellipse cx="-72" cy="-145" rx="15" ry="24" fill="#f1bc91" />
      <ellipse cx="72" cy="-145" rx="15" ry="24" fill="#f1bc91" />
      {/* spiky hair */}
      <path d="M -72 -160 L -102 -203 L -62 -195 L -75 -242 L -35 -211 L -12 -264 L 10 -218 L 48 -246 L 42 -201 L 88 -218 L 72 -177 L 58 -155 Z" fill="#f6c52f" stroke="#d59c20" strokeWidth="8" strokeLinejoin="round" />
      {/* headband */}
      <path d="M -72 -178 Q 0 -198 72 -178 L 78 -149 Q 0 -167 -78 -149 Z" fill="#303b4c" />
      <rect x="-33" y="-181" width="66" height="31" rx="5" fill="#aeb7bf" stroke="#687684" strokeWidth="4" />
      <path d="M -9 -174 Q 7 -184 9 -173 Q 8 -162 -4 -161 L 5 -169" fill="none" stroke="#34414e" strokeWidth="4" />
      {/* eyes + whisker marks */}
      <path d="M -48 -145 L -14 -140 L -26 -127 Z" fill="#fff" />
      <path d="M 14 -140 L 48 -145 L 26 -127 Z" fill="#fff" />
      <circle cx="-27" cy="-137" r="7" fill="#2a83b9" />
      <circle cx="27" cy="-137" r="7" fill="#2a83b9" />
      <path d="M -62 -120 L -35 -114 M -62 -108 L -35 -104 M 35 -114 L 62 -120 M 35 -104 L 62 -108" stroke="#b87555" strokeWidth="4" />
      {/* headband ties */}
      <path d="M 65 -169 Q 112 -153 145 -176 L 130 -151 L 92 -145" fill="#303b4c" />
    </g>
  );
};

export const NarutoRunStop: React.FC = () => {
  const frame = useCurrentFrame();
  const run = interpolate(frame, [0, 70], [0, 1], { extrapolateRight: "clamp" });
  const stop = interpolate(frame, [66, 91, 110], [0, 1, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const settle = interpolate(frame, [105, 135, 149], [0.2, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x = interpolate(frame, [0, 66, 85, 149], [-240, 0, 0, 0], { easing: Easing.out(Easing.quad), extrapolateRight: "clamp" });
  const shake = frame >= 68 && frame <= 88 ? Math.sin(frame * 2.4) * (1 - (frame - 68) / 21) * 13 : 0;
  const crouch = stop * settle;
  const speed = frame < 68 ? 1 : 0;
  const dust = interpolate(frame, [66, 77, 112, 149], [0, 1, 0.4, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const vignette = interpolate(frame, [0, 30, 149], [0.18, 0.02, 0.2]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#152c2a", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `translate(${shake}px, ${shake * 0.4}px)` }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#203c42"/><stop offset="60%" stopColor="#52765b"/><stop offset="100%" stopColor="#b2a36e"/></linearGradient>
            <radialGradient id="sun"><stop offset="0%" stopColor="#fff3b0" stopOpacity=".8"/><stop offset="100%" stopColor="#fff3b0" stopOpacity="0"/></radialGradient>
            <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#6c7650"/><stop offset="100%" stopColor="#293c32"/></linearGradient>
          </defs>
          <rect width={W} height={H} fill="url(#sky)"/>
          <circle cx="690" cy="410" r="440" fill="url(#sun)"/>
          {trees.map((tree, i) => <g key={i} transform={`translate(${tree.x} ${tree.y}) scale(${tree.scale})`} opacity={0.4 + (i % 4) * 0.1}>
            <path d="M 0 0 L -95 560 L 85 560 Z" fill={i % 2 ? "#132e2a" : "#274537"}/>
            <path d="M 0 40 L -125 190 L -50 180 L -130 320 L 35 260 L 85 150 Z" fill="#315a40"/>
          </g>)}
          <path d="M 0 1200 Q 220 1120 440 1200 T 1080 1180 L 1080 1920 L 0 1920 Z" fill="url(#ground)"/>
          {Array.from({length: 24}, (_, i) => <path key={i} d={`M ${(i * 97) % W} 1920 l ${-20 + (i % 5) * 9} -${180 + (i % 6) * 60}`} stroke={i % 2 ? "#9c9b5b" : "#3f6442"} strokeWidth={2 + i % 4} opacity=".5"/>)}
          <g transform={`translate(${x} 0)`}>
            <g transform={`translate(0 ${Math.sin(frame * 0.8) * 8 * speed})`}>
              <NarutoFigure crouch={crouch} run={run * speed}/>
            </g>
          </g>
          {Array.from({length: 22}, (_, i) => {
            const active = frame >= 66;
            const p = ((frame - 66) * (1.5 + (i % 5) * 0.2) + i * 31) % 120;
            return <ellipse key={i} cx={540 + Math.cos(i * 2.4) * (45 + p * 2.2)} cy={1410 + Math.sin(i * 2.4) * (15 + p * 0.7)} rx={8 + (i % 5) * 4} ry={4 + (i % 3) * 3} fill={i % 2 ? "#d6c19a" : "#8b8b65"} opacity={active ? dust * Math.max(0, 0.8 - p / 150) : 0}/>
          })}
          <rect width={W} height={H} fill="#061614" opacity={vignette}/>
        </svg>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 58, right: 58, top: 72, display: "flex", justifyContent: "space-between", color: "#f7e9c9", fontFamily: "Arial, sans-serif", letterSpacing: 5, fontWeight: 800, fontSize: 24, textShadow: "0 3px 12px #000" }}>
        <span>SHINOBI FILES</span><span>01 / 05s</span>
      </div>
      <div style={{ position: "absolute", bottom: 86, left: 60, right: 60, color: "#fff3d5", fontFamily: "Arial, sans-serif", textAlign: "center", textShadow: "0 4px 18px #07110d" }}>
        <div style={{ fontSize: 22, letterSpacing: 7, opacity: 0.8 }}>KONOHA • FOREST EDGE</div>
        <div style={{ fontSize: 50, fontWeight: 900, marginTop: 14, letterSpacing: 2 }}>{frame < 66 ? "MOVING IN" : frame < 110 ? "TARGET ACQUIRED" : "READY TO STRIKE"}</div>
      </div>
    </AbsoluteFill>
  );
};
