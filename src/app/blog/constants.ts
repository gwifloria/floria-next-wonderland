export type CatKey = "ByteNotes" | "Murmurs";

export type BlogCategory = { key: CatKey; label: string };

export type CateGroup = BlogCategory & { files: string[] };

export const categories: readonly BlogCategory[] = [
  { key: "ByteNotes", label: "ByteNotes" },
  { key: "Murmurs", label: "Murmurs" },
];
export interface GitHubItem {
  name: string;
  path: string;
  type: string;
}
