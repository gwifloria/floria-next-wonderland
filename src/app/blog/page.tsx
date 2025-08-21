import path from "node:path";
import { categories, CatKey } from "./constants";
import { MdxPost } from "./MdxPost";
import { Sidebar } from "./SideBar";
import { buildGroups, catStyles, CONTENT_ROOT, cx } from "./util";

// ---------- Types & utils ----------

// ---------- Small components ----------

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ post?: string }>;
}) {
  const params = await searchParams; // Next 15: searchParams is a Promise

  const groups = buildGroups(CONTENT_ROOT, categories);
  const flat = groups.flatMap((g) => g.files);

  if (flat.length === 0) {
    return (
      <div className="mx-auto max-w-2xl p-8 text-sm text-neutral-600 dark:text-neutral-300">
        <h2 className="mb-2 text-lg font-semibold">Blog</h2>
        <p>
          暂无可用文章（.md）。请在 <code>src/app/content/bytenotes</code> 或
          <code> src/app/content/murmurs</code> 目录下添加 Markdown 文件。
        </p>
      </div>
    );
  }

  const activePost =
    params?.post && flat.includes(params.post) ? params.post : flat[0];
  const filePath = path.join(CONTENT_ROOT, activePost);
  const activeCat = activePost.split("/")[0] as CatKey;

  const { mainAccent } = catStyles(activeCat);

  return (
    <div className="flex max-h-[calc(100vh-4rem)]">
      <Sidebar groups={groups} activePost={activePost} />

      <main className="flex-1 max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-lg px-6 py-8 max-h-[calc(100vh-16rem)] overflow-auto">
        <div className={cx("mb-4 h-1 w-full rounded-full", mainAccent)} />
        <MdxPost filePath={filePath} />
      </main>
    </div>
  );
}
