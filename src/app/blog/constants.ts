export type CatKey = "bytenotes" | "murmurs";

export type Category = { key: CatKey; label: string };

export type CateGroup = Category & { files: string[] };

export const categories: readonly Category[] = [
  { key: "bytenotes", label: "ByteNotes" },
  { key: "murmurs", label: "Murmurs" },
] as const;
