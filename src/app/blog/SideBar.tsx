"use client";
import { useSWR } from "@/api/useFetch";
import { Skeleton } from "antd";
import Link from "next/link";
import { categories, CatKey, GitHubItem } from "./constants";
import { catStyles, cx } from "./util";

function toSlugPath(p: string) {
  return p.split("/").map(encodeURIComponent).join("/");
}

function SidebarSection({
  category,
  activePost,
}: {
  category: CatKey;
  activePost: string;
}) {
  const isByteNotes = category === "ByteNotes";
  const { dot } = catStyles(category);
  const { data: group } = useSWR<GitHubItem[]>(
    `/api/github/list?dir=${category}`,
  );
  if (!group) {
    return (
      <section className="space-y-2">
        <header className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          <span className={cx("inline-block h-2 w-2 rounded-sm", dot)} />
          <span className="font-medium">{category}</span>
        </header>
        <Skeleton
          active
          title={false}
          paragraph={{ rows: 3, width: ["80%", "60%", "72%"] }}
          className="!m-0"
        />
      </section>
    );
  }

  if (group.length === 0) {
    return (
      <section className="space-y-2">
        <header className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          <span className={cx("inline-block h-2 w-2 rounded-sm", dot)} />
          <span className="font-medium">{category}</span>
        </header>
        <div className="text-xs text-neutral-400 px-3 py-2">暂无文章</div>
      </section>
    );
  }

  return (
    <section className="space-y-1">
      <header className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        <span className={cx("inline-block h-2 w-2 rounded-sm", dot)} />
        <span className="font-medium">{category}</span>
        {isByteNotes ? (
          <span className="ml-1 font-mono text-[11px] opacity-80">{"</>"}</span>
        ) : (
          <span className="ml-1 text-[13px]">💭</span>
        )}
      </header>
      <ul className="space-y-1">
        {group?.map((file) => {
          const isActive = file.path === activePost;
          const display = file.name.replace(/\.(md|mdx)$/i, "");
          const href = `/blog/${toSlugPath(file.path)}`;
          return (
            <li key={file.path}>
              <Link
                href={href}
                aria-pressed={isActive}
                className={cx(
                  "relative block rounded-md px-3 py-2 text-sm transition-colors text-neutral-700",
                  "hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800/60",
                  isActive &&
                    "bg-macaronblue-100 dark:bg-macaronblue-800/40 text-macaronblue-900 dark:text-macaronblue-100 font-semibold",
                )}
              >
                {isActive && (
                  <span
                    aria-hidden
                    className={cx(
                      "absolute left-0 top-0 h-full w-1 rounded-l-md",
                      "bg-macaronblue-500",
                    )}
                  />
                )}
                {display}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export const Sidebar = ({ activePost }: { activePost: string }) => {
  return (
    <aside className="">
      <Link
        href="/blog"
        aria-label="Go to Blog home"
        className="inline-block font-bold text-lg mb-4 text-neutral-800 dark:text-neutral-100 hover:text-nepal-600 dark:hover:text-nepal-300 transition-colors"
      >
        Blog
      </Link>
      <nav className="space-y-5">
        {categories.map((g) => (
          <SidebarSection
            key={g.key}
            category={g.key}
            activePost={activePost}
          />
        ))}
      </nav>
    </aside>
  );
};
