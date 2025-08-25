import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

import { Category, CateGroup, CatKey } from "./constants";
function resolveContentRoot() {
  const cwd = process.cwd();
  // Primary: submodule path during local dev / CI
  const primary = path.join(cwd, "src/app/content");
  // Fallback: mirrored at build time into public/_content for Vercel runtime
  const fallback = path.join(cwd, "public/_content");

  if (existsSync(primary)) return primary;
  if (existsSync(fallback)) return fallback;
  return fallback; // default to fallback so callers can still attempt to read
}

export const CONTENT_ROOT = resolveContentRoot();

export function debugContentRoot() {
  try {
    const root = CONTENT_ROOT;
    const groups = readdirSync(root, { withFileTypes: true });
    return {
      root,
      entries: groups.map((d) => ({
        name: d.name,
        type: d.isDirectory() ? "dir" : "file",
      })),
    } as const;
  } catch (e) {
    return { root: CONTENT_ROOT, error: String(e) } as const;
  }
}

export function readMdFiles(dir: string) {
  if (!existsSync(dir)) return [] as string[];
  return readdirSync(dir).filter((f) => f.endsWith(".md"));
}

export function buildGroups(
  root: string,
  cats: readonly Category[]
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
