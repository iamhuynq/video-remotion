export type AkatsukiMember = {
  name: string;
  rank: number;
  title: string;
  accent: string;
  initials: string;
  image?: string;
};

// Ranking is an editable editorial example, not an official canon ranking.
// Add licensed/local character images under public/images/akatsuki and set image paths here.
export const akatsukiMembers: AkatsukiMember[] = [
  { rank: 10, name: "Zetsu", title: "Gián điệp và do thám", accent: "#A8D66D", initials: "Z", image: "images/akatsuki/zetsu.png" },
  { rank: 9, name: "Hidan", title: "Nghi thức bất tử", accent: "#C7C9D4", initials: "H", image: "images/akatsuki/hidan.png" },
  { rank: 8, name: "Konan", title: "Thiên sứ giấy", accent: "#82B7D8", initials: "K", image: "images/akatsuki/konan.png" },
  { rank: 7, name: "Sasori", title: "Bậc thầy rối", accent: "#D66D79", initials: "S", image: "images/akatsuki/sasori.png" },
  { rank: 6, name: "Deidara", title: "Nghệ thuật là bùng nổ", accent: "#E7B95C", initials: "D", image: "images/akatsuki/deidara.png" },
  { rank: 5, name: "Kakuzu", title: "Kẻ săn tiền thưởng", accent: "#75B7A2", initials: "K", image: "images/akatsuki/kakuzu.png" },
  { rank: 4, name: "Kisame", title: "Quái vật làng Sương Mù", accent: "#5C9BD1", initials: "Ki", image: "images/akatsuki/kisame.png" },
  { rank: 3, name: "Itachi Uchiha", title: "Thiên tài Mangekyō Sharingan", accent: "#D95B65", initials: "I", image: "images/akatsuki/itachi.png" },
  { rank: 2, name: "Obito Uchiha", title: "Không gian và thời gian", accent: "#D58A52", initials: "O", image: "images/akatsuki/obito.png" },
  { rank: 1, name: "Pain", title: "Thần của Amegakure", accent: "#B66BE0", initials: "P", image: "images/akatsuki/pain.png" },
];
