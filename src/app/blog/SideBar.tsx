import Link from "next/link";
import { CateGroup } from "./constants";
import { catStyles, cx } from "./util";
function SidebarSection({
  group,
  activePost,
}: {
  group: CateGroup;
  activePost: string;
}) {
  const isByteNotes = group.key === "bytenotes";
  const { dot, bar } = catStyles(group.key);

  return (
    <section className="space-y-1">
      <header className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        <span className={cx("inline-block h-2 w-2 rounded-sm", dot)} />
        <span className="font-medium">{group.label}</span>
        {isByteNotes ? (
          <span className="ml-1 font-mono text-[11px] opacity-80">
            {"<"}
            {"/"}
            {">"}
          </span>
        ) : (
          <span className="ml-1 text-[13px]">💭</span>
        )}
      </header>
      <ul className="space-y-1">
        {group.files.map((file) => {
          const isActive = file === activePost;
          const display = file
            .replace(`${group.key}/`, "")
            .replace(/\.md$/, "");
          return (
            <li key={file}>
              <Link
                href={{ pathname: "/blog", query: { post: file } }}
                className={cx(
                  "relative block rounded-md px-3 py-2 text-sm transition-colors text-neutral-700",
                  "hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800/60",
                  isActive &&
                    "bg-neutral-100 dark:bg-neutral-800/50 text-neutral-900 dark:text-neutral-100 font-semibold",
                )}
              >
                {isActive && (
                  <span
                    aria-hidden
                    className={cx(
                      "absolute left-0 top-0 h-full w-1 rounded-l-md",
                      bar,
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

export const Sidebar = ({
  groups,
  activePost,
}: {
  groups: CateGroup[];
  activePost: string;
}) => {
  return (
    <aside className="w-64 bg-neutral-50 border-r p-6 my-12 overflow-y-auto max-h-[calc(100vh-16rem)]">
      <h2 className="font-bold text-lg mb-4">Posts</h2>
      <nav className="space-y-5">
        {groups.map((g) => (
          <SidebarSection key={g.key} group={g} activePost={activePost} />
        ))}
      </nav>
    </aside>
  );
};
