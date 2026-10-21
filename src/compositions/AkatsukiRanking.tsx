import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { akatsukiMembers, AkatsukiMember } from "../data/akatsuki";

export const AKATSUKI_WIDTH = 1080;
export const AKATSUKI_HEIGHT = 1920;
export const AKATSUKI_FPS = 30;
const INTRO = 75;
const MEMBER_FRAMES = 96; // 3.2 seconds per member
const OUTRO = 75;
export const AKATSUKI_DURATION = INTRO + MEMBER_FRAMES * akatsukiMembers.length + OUTRO;

const BG: React.FC<{ accent?: string }> = ({ accent = "#D64B54" }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 180], [-28, 28], { extrapolateRight: "extend" });
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#080910" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 38%, #28202A 0%, #11111A 42%, #05060B 100%)" }} />
      <div style={{ position: "absolute", inset: -100, opacity: 0.13, transform: `translateX(${drift}px) rotate(-12deg)`, backgroundImage: "repeating-linear-gradient(90deg, transparent 0 90px, #FFFFFF 91px 93px, transparent 94px 180px)" }} />
      <div style={{ position: "absolute", width: 760, height: 1100, left: 160, top: 300, borderRadius: "50%", border: `2px solid ${accent}30`, boxShadow: `0 0 110px ${accent}18` }} />
      <div style={{ position: "absolute", width: 520, height: 760, left: 280, top: 470, borderRadius: "50%", border: `1px solid ${accent}30` }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: 12, height: "100%", background: `linear-gradient(180deg, transparent, ${accent}, transparent)`, opacity: 0.75 }} />
      <div style={{ position: "absolute", right: -100, top: 300, width: 300, height: 700, background: accent, filter: "blur(140px)", opacity: 0.08 }} />
    </AbsoluteFill>
  );
};

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ color: "#AEB0C0", fontSize: 22, fontWeight: 800, letterSpacing: 6 }}>{children}</div>
);

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame, fps, config: { damping: 15, stiffness: 90 } });
  const opacity = interpolate(frame, [0, 10, 58, INTRO], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center", opacity }}>
      <BG />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center", padding: 64 }}>
        <Eyebrow>SHINOBI ARCHIVE / CLASSIFIED</Eyebrow>
        <div style={{ marginTop: 34, color: "#F4F0F1", fontSize: 106, lineHeight: 0.98, fontWeight: 1000, letterSpacing: -4, transform: `translateY(${(1 - reveal) * 100}px) scale(${0.86 + reveal * 0.14})`, textShadow: "0 14px 60px #000" }}>
          AKATSUKI<br /><span style={{ color: "#D94B55" }}>RANKING</span>
        </div>
        <div style={{ marginTop: 38, color: "#D6D3DB", fontSize: 28, letterSpacing: 5 }}>AI MẠNH NHẤT?</div>
        <div style={{ marginTop: 46, width: 220, height: 7, background: "#D94B55", transform: `scaleX(${reveal})` }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const MemberCard: React.FC<{ member: AkatsukiMember; index: number }> = ({ member, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 105 } });
  const exit = interpolate(frame, [MEMBER_FRAMES - 12, MEMBER_FRAMES], [1, 0], { extrapolateRight: "clamp" });
  const slide = interpolate(frame, [0, MEMBER_FRAMES], [0, -160], { extrapolateRight: "clamp" });
  const image = member.image ? staticFile(member.image) : null;
  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <BG accent={member.accent} />
      <div style={{ position: "absolute", top: 84, left: 70, right: 70, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Eyebrow>AKATSUKI / FILE {String(index + 1).padStart(2, "0")}</Eyebrow>
        <div style={{ color: member.accent, fontSize: 24, fontWeight: 900, letterSpacing: 3 }}>TOP 10</div>
      </div>

      {/* Horizontal moving strip: the active member is highlighted as the strip travels. */}
      <div style={{ position: "absolute", top: 160, left: 0, right: 0, height: 126, overflow: "hidden", opacity: 0.92 }}>
        <div style={{ display: "flex", gap: 16, width: "max-content", transform: `translateX(calc(-${index * 128}px + ${slide}px))` }}>
          {[...akatsukiMembers, ...akatsukiMembers].map((m, i) => (
            <div key={`${m.name}-${i}`} style={{ position: "relative", width: 110, height: 110, flexShrink: 0, overflow: "hidden", border: `2px solid ${m.name === member.name ? member.accent : "#FFFFFF20"}`, borderRadius: 18, background: "#11121A", display: "flex", justifyContent: "center", alignItems: "center", transform: m.name === member.name ? "scale(1.06)" : "scale(.9)", boxShadow: m.name === member.name ? `0 0 22px ${member.accent}55` : "none" }}>
              {m.image ? (
                <Img src={staticFile(m.image)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
              ) : (
                <div style={{ color: m.accent, fontSize: 34, fontWeight: 900 }}>{m.initials}</div>
              )}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "4px 0", textAlign: "center", background: "linear-gradient(transparent, #05060BEF)", color: "#FFFFFF", fontSize: 17, fontWeight: 900 }}>{String(m.rank).padStart(2, "0")}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", top: 360, left: 58, right: 58, height: 1030, borderRadius: 38, border: `2px solid ${member.accent}77`, background: "linear-gradient(145deg, #1A1924F5, #090A11F2)", overflow: "hidden", boxShadow: `0 35px 100px #0009, inset 0 0 90px ${member.accent}12`, transform: `translateY(${(1 - enter) * 100}px) scale(${0.93 + enter * 0.07})` }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 12, background: member.accent }} />
        <div style={{ position: "absolute", top: 42, left: 44, color: member.accent, fontSize: 24, fontWeight: 900, letterSpacing: 5 }}>RANK / {String(member.rank).padStart(2, "0")}</div>
        <div style={{ position: "absolute", top: 105, left: 0, right: 0, height: 630, display: "flex", alignItems: "center", justifyContent: "center", transform: `translateX(${(1 - enter) * 120}px) scale(${0.9 + enter * 0.1})` }}>
          {image ? (
            <Img src={image} style={{ width: 760, height: 630, objectFit: "contain", filter: "drop-shadow(0 24px 38px #000B)" }} />
          ) : (
            <div style={{ width: 480, height: 480, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: `3px solid ${member.accent}55`, background: `radial-gradient(circle, ${member.accent}25, transparent 68%)`, color: member.accent, fontSize: 190, fontWeight: 1000, textShadow: `0 0 70px ${member.accent}55` }}>{member.initials}</div>
          )}
        </div>
        <div style={{ position: "absolute", left: 52, right: 52, bottom: 68, transform: `translateY(${(1 - enter) * 45}px)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div style={{ width: 108, height: 108, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 20, background: member.accent, color: "#090910", fontSize: 62, fontWeight: 1000 }}>{member.rank}</div>
            <div style={{ color: "#F8F5F7", fontSize: member.name.length > 12 ? 43 : 54, fontWeight: 1000, lineHeight: 1.05 }}>{member.name.toUpperCase()}</div>
          </div>
          <div style={{ marginTop: 28, color: "#C5C2CF", fontSize: 30, letterSpacing: 1 }}>{member.title}</div>
          <div style={{ marginTop: 32, height: 5, width: `${(index + 1) / akatsukiMembers.length * 100}%`, background: member.accent }} />
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 155, left: 72, right: 72, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "#777B8E", fontSize: 20, letterSpacing: 3 }}>SWIPE THROUGH THE SHADOWS</div>
        <div style={{ color: member.accent, fontSize: 24, fontWeight: 900 }}>{index + 1} / {akatsukiMembers.length}</div>
      </div>
      <div style={{ position: "absolute", bottom: 88, left: 72, right: 72, color: "#B3B4C1", textAlign: "center", fontSize: 24, letterSpacing: 2 }}>BẠN XẾP HẠNG NHÂN VẬT NÀY Ở ĐÂU?</div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 15, stiffness: 90 } });
  return (
    <AbsoluteFill>
      <BG accent="#D94B55" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", padding: 72, transform: `scale(${0.9 + enter * 0.1})` }}>
        <Eyebrow>YOUR TURN</Eyebrow>
        <div style={{ marginTop: 32, color: "#F8F5F7", fontSize: 82, lineHeight: 1.06, fontWeight: 1000 }}>AI LÀ KẺ<br /><span style={{ color: "#D94B55" }}>MẠNH NHẤT?</span></div>
        <div style={{ marginTop: 48, width: 190, height: 7, background: "#D94B55" }} />
        <div style={{ marginTop: 42, color: "#D4D1DB", fontSize: 31, lineHeight: 1.45 }}>Comment thứ hạng của bạn<br />và theo dõi phần tiếp theo.</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const AkatsukiRanking: React.FC = () => (
  <AbsoluteFill style={{ background: "#080910", color: "white", fontFamily: "Arial, Helvetica, sans-serif" }}>
    <Sequence from={0} durationInFrames={INTRO}><Intro /></Sequence>
    {akatsukiMembers.map((member, index) => (
      <Sequence key={member.name} from={INTRO + index * MEMBER_FRAMES} durationInFrames={MEMBER_FRAMES}>
        <MemberCard member={member} index={index} />
      </Sequence>
    ))}
    <Sequence from={INTRO + akatsukiMembers.length * MEMBER_FRAMES} durationInFrames={OUTRO}><Outro /></Sequence>
  </AbsoluteFill>
);
