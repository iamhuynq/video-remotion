export type RankingCharacter = {
  rank: number;
  name: string;
  subtitle: string;
  accent: string;
  /** Optional path relative to public/, e.g. images/character.png */
  image?: string;
};

// Replace these sample entries with your own ranking and add images under public/images.
export const characters: RankingCharacter[] = [
  { rank: 5, name: "ĐỆ TAM KAZEKAGE", subtitle: "Bậc thầy Hắc Thiết Sa", accent: "#D76A45" },
  { rank: 4, name: "NAGATO", subtitle: "Sức mạnh của Lục Đạo", accent: "#A65DE8" },
  { rank: 3, name: "ITACHI UCHIHA", subtitle: "Thiên tài của tộc Uchiha", accent: "#E64C5B" },
  { rank: 2, name: "HASHIRAMA", subtitle: "Thần Shinobi", accent: "#4FB78A" },
  { rank: 1, name: "MADARA UCHIHA", subtitle: "Huyền thoại chiến trường", accent: "#E6AD4A" }
];
