export type CatKey = "ByteNotes" | "Murmurs";

export type Category = { key: CatKey; label: string };

export type CateGroup = Category & { files: string[] };

export const categories: readonly Category[] = [
  { key: "ByteNotes", label: "ByteNotes" },
  { key: "Murmurs", label: "Murmurs" },
];
export interface GitHubItem {
  name: string;
  path: string;
  type: string;
}
