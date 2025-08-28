import { CatKey } from "./constants";

export function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function catStyles(cat: CatKey) {
  const isByteNotes = cat === "ByteNotes";
  return {
    dot: isByteNotes ? "bg-nepal-300/70" : "bg-rose-300/70",
    bar: isByteNotes ? "bg-nepal-300/70" : "bg-rose-300/70",
    mainAccent: isByteNotes ? "bg-nepal-300/40" : "bg-rose-300/40",
  } as const;
}
