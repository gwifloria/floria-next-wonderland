// src/app/blog/toc/Aside.tsx

import { TocItem } from "./util";

export function TocAside({
  items,
  activeId,
}: {
  items: TocItem[];
  activeId: string;
}) {
  if (!items.length) return null;
  return (
    <aside className="hidden md:block sticky top-20 self-start pr-2">
      <nav
        aria-label="Table of contents"
        className="rounded-lg border border-neutral-200 bg-white/80 backdrop-blur p-3 shadow-sm"
      >
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
          On this page
        </p>
        <ul className="space-y-1.5 text-[13px] leading-5">
          {items.map((it) => {
            const isActive = it.id === activeId;
            const base =
              "group flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors";
            const state = isActive
              ? "bg-neutral-100 text-nepal-700"
              : "text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50";
            return (
              <li key={it.id} className={it.level === 3 ? "ml-3" : undefined}>
                <a
                  href={`#${it.id}`}
                  className={`${base} ${state}`}
                  data-active={isActive ? "true" : undefined}
                >
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-nepal-600" : "bg-neutral-300 group-hover:bg-neutral-500"}`}
                  />
                  <span className="truncate">{it.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
