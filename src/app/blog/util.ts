import { existsSync, readdirSync } from "fs";
import path from "path";
import { Category, CateGroup, CatKey } from "./constants";
export const CONTENT_ROOT = path.join(process.cwd(), "src/app/content");

export function readMdFiles(dir: string) {
  if (!existsSync(dir)) return [] as string[];
  return readdirSync(dir).filter((f) => f.endsWith(".md"));
}

export function buildGroups(
  root: string,
  cats: readonly Category[],
): CateGroup[] {
  return cats.map((c) => ({
    ...c,
    files: readMdFiles(path.join(root, c.key)).map((f) => `${c.key}/${f}`),
  }));
}

export function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function catStyles(cat: CatKey) {
  const isByteNotes = cat === "bytenotes";
  return {
    dot: isByteNotes ? "bg-nepal-300/70" : "bg-rose-300/70",
    bar: isByteNotes ? "bg-nepal-300/70" : "bg-rose-300/70",
    mainAccent: isByteNotes ? "bg-nepal-300/40" : "bg-rose-300/40",
  } as const;
}
