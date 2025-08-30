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
// -----------------------------
// UI constants
// -----------------------------
export const CONTAINER_CLASS =
  "max-w-4xl mx-auto bg-white/90 rounded-xl  transition-all duration-200 ease-in-out";

export const PROSE_CLASS = [
  "prose prose-slate dark:prose-invert dark:text-neutral-300 max-w-none leading-relaxed",
  "prose-headings:font-medium prose-headings:text-neutral-800 dark:prose-headings:text-neutral-200",
  "prose-h1:mt-0 prose-h1:text-2xl md:prose-h1:text-3xl",
  "prose-h2:pt-4 prose-h2:mt-8 prose-h2:border-t prose-h2:border-neutral-200 dark:prose-h2:border-neutral-800",
  "prose-a:no-underline hover:prose-a:underline prose-a:text-nepal-600 dark:prose-a:text-nepal-300",
  "prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-1 prose-code:py-0.5 prose-code:before:content-[''] prose-code:after:content-['']",
  "prose-pre:bg-neutral-950/90 dark:prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:rounded-lg prose-pre:p-0",
  "prose-img:rounded-md prose-blockquote:border-nepal-500",
].join(" ");

// -----------------------------
// Date formatter (memoized instance)
// -----------------------------
export const dtf = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});
export interface CommitMeta {
  updatedAt?: string; // ISO string
}
