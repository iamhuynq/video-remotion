import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { characters, RankingCharacter } from "../data/characters";

export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;
const INTRO_FRAMES = 90;
const CARD_FRAMES = 120;
const OUTRO_FRAMES = 90;
export const VIDEO_DURATION = INTRO_FRAMES + characters.length * CARD_FRAMES + OUTRO_FRAMES;

const Background: React.FC<{ accent?: string }> = ({ accent = "#D94C4C" }) => (
  <AbsoluteFill style={{ background: "#090B12", overflow: "hidden" }}>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, #202334 0%, #090B12 68%)" }} />
    <AbsoluteFill style={{ opacity: 0.18, backgroundImage: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
    <div style={{ position: "absolute", width: 760, height: 760, borderRadius: "50%", border: `2px solid ${accent}55`, top: 300, left: 160, boxShadow: `0 0 90px ${accent}22` }} />
    <div style={{ position: "absolute", width: 560, height: 560, borderRadius: "50%", border: `1px solid ${accent}44`, top: 400, left: 260 }} />
    <div style={{ position: "absolute", width: 10, height: 500, background: accent, opacity: 0.7, top: 680, left: 64, transform: "skewY(-24deg)" }} />
  </AbsoluteFill>
);

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const opacity = interpolate(frame, [0, 12, 76, 90], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center", opacity }}>
    <div style={{ color: "#E8B45B", fontSize: 28, letterSpacing: 12, fontWeight: 800, marginBottom: 28 }}>SHINOBI ARCHIVE</div>
    <div style={{ color: "white", fontSize: 88, lineHeight: 1.05, fontWeight: 900, transform: `translateY(${(1 - enter) * 90}px) scale(${0.88 + enter * 0.12})`, textShadow: "0 8px 40px #000" }}>NHỮNG<br />NHẪN GIẢ<br /><span style={{ color: "#E8B45B" }}>MẠNH NHẤT</span></div>
    <div style={{ width: 180, height: 8, marginTop: 44, background: "#E8B45B", transform: `scaleX(${enter})` }} />
    <div style={{ color: "#B9BDCC", fontSize: 28, marginTop: 28, letterSpacing: 4 }}>BẢNG XẾP HẠNG</div>
  </AbsoluteFill>;
};

const CharacterCard: React.FC<{ character: RankingCharacter; index: number }> = ({ character, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 18, stiffness: 100 } });
  const exit = interpolate(frame, [CARD_FRAMES - 14, CARD_FRAMES], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const imageSrc = character.image ? staticFile(character.image) : null;
  return <AbsoluteFill style={{ opacity: exit }}>
    <Background accent={character.accent} />
    <div style={{ position: "absolute", top: 100, left: 72, right: 72, display: "flex", justifyContent: "space-between", color: "#A8ADBE", fontSize: 24, letterSpacing: 4, fontWeight: 800 }}><span>TOP {characters.length}</span><span>SHINOBI ARCHIVE</span></div>
    <div style={{ position: "absolute", top: 230, left: 72, right: 72, height: 900, borderRadius: 32, border: `2px solid ${character.accent}88`, background: "linear-gradient(145deg, #171A28EE, #090B12DD)", overflow: "hidden", transform: `translateY(${(1 - enter) * 100}px) scale(${0.94 + enter * 0.06})`, boxShadow: `0 35px 100px #0008, inset 0 0 60px ${character.accent}18` }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 12, background: character.accent }} />
      <div style={{ position: "absolute", top: 42, left: 44, color: character.accent, fontSize: 24, letterSpacing: 5, fontWeight: 900 }}>RANKING / {String(index + 1).padStart(2, "0")}</div>
      {imageSrc ? <Img src={imageSrc} style={{ position: "absolute", top: 110, left: 60, width: 650, height: 590, objectFit: "contain" }} /> : <div style={{ position: "absolute", top: 120, left: 130, width: 600, height: 570, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: `3px solid ${character.accent}55`, background: `radial-gradient(circle, ${character.accent}33 0%, transparent 68%)`, color: character.accent, fontSize: 180, fontWeight: 900, textShadow: `0 0 60px ${character.accent}66` }}>{character.name.split(" ").map((word) => word[0]).join("").slice(0, 3)}</div>}
      <div style={{ position: "absolute", bottom: 64, left: 52, right: 52 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}><div style={{ color: "#090B12", background: character.accent, minWidth: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, fontWeight: 900, borderRadius: 16 }}>{character.rank}</div><div style={{ color: "white", fontSize: 50, fontWeight: 900, lineHeight: 1.08 }}>{character.name}</div></div>
        <div style={{ marginTop: 26, color: "#C4C8D5", fontSize: 30, letterSpacing: 1 }}>{character.subtitle}</div>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 170, left: 80, right: 80, display: "flex", alignItems: "center", gap: 12 }}>{characters.map((item, i) => <div key={item.name} style={{ height: 8, flex: 1, borderRadius: 8, background: i === index ? character.accent : "#FFFFFF24" }} />)}</div>
    <div style={{ position: "absolute", bottom: 100, left: 80, right: 80, color: "#73798D", fontSize: 22, letterSpacing: 3, textAlign: "center" }}>BẠN ĐỒNG Ý VỚI THỨ HẠNG NÀY?</div>
  </AbsoluteFill>;
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  return <AbsoluteFill><Background accent="#E8B45B" /><div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 90, transform: `scale(${0.9 + enter * 0.1})` }}><div style={{ color: "#E8B45B", fontSize: 30, letterSpacing: 8, fontWeight: 900 }}>ĐẾN LƯỢT BẠN</div><div style={{ color: "white", fontSize: 76, lineHeight: 1.12, fontWeight: 900, marginTop: 34 }}>AI MỚI LÀ<br /><span style={{ color: "#E8B45B" }}>MẠNH NHẤT?</span></div><div style={{ width: 160, height: 8, background: "#E8B45B", margin: "44px 0" }} /><div style={{ color: "#D0D3DE", fontSize: 32, lineHeight: 1.4 }}>Bình luận thứ hạng của bạn<br />và theo dõi để xem phần tiếp theo.</div></div></AbsoluteFill>;
};

export const RankingVideo: React.FC = () => <AbsoluteFill style={{ backgroundColor: "#090B12", fontFamily: "Arial, Helvetica, sans-serif" }}>
  <Sequence from={0} durationInFrames={INTRO_FRAMES}><Intro /></Sequence>
  {characters.map((character, index) => <Sequence key={character.name} from={INTRO_FRAMES + index * CARD_FRAMES} durationInFrames={CARD_FRAMES}><CharacterCard character={character} index={index} /></Sequence>)}
  <Sequence from={INTRO_FRAMES + characters.length * CARD_FRAMES} durationInFrames={OUTRO_FRAMES}><Outro /></Sequence>
</AbsoluteFill>;
