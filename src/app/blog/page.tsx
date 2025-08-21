export const runtime = "nodejs";

import path from "node:path";
import { categories, CatKey } from "./constants";
import { MdxPost } from "./MdxPost";
import { Sidebar } from "./SideBar";
import {
  buildGroups,
  catStyles,
  CONTENT_ROOT,
  cx,
  debugContentRoot,
} from "./util";

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const debugParam = Array.isArray(params?.debug)
    ? params?.debug[0]
    : params?.debug;
  const debug = debugParam === "1";
  const dbg = debug ? debugContentRoot() : null;

  const groups = buildGroups(CONTENT_ROOT, categories);
  const flat = groups.flatMap((g) => g.files);

  if (flat.length === 0) {
    return (
      <div className="mx-auto max-w-2xl p-8 text-sm text-neutral-600 dark:text-neutral-300">
        <h2 className="mb-2 text-lg font-semibold">Blog</h2>
        <p>
          暂无可用文章（.md）。本地开发请在{" "}
          <code>src/app/content/bytenotes</code> 或
          <code> src/app/content/murmurs</code> 下添加；线上运行会从
          <code> public/_content</code> 读取镜像内容（构建期已同步）。
        </p>
      </div>
    );
  }

  const postParam = Array.isArray(params?.post)
    ? params?.post[0]
    : params?.post;
  const activePost =
    postParam && flat.includes(postParam) ? postParam : flat[0];
  const filePath = path.join(CONTENT_ROOT, activePost);
  const activeCat = activePost.split("/")[0] as CatKey;

  const { mainAccent } = catStyles(activeCat);

  return (
    <div className="flex max-h-[calc(100vh-4rem)]">
      <Sidebar groups={groups} activePost={activePost} />

      <main className="flex-1 max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-lg px-6 py-8 max-h-[calc(100vh-16rem)] overflow-auto">
        <div className={cx("mb-4 h-1 w-full rounded-full", mainAccent)} />
        <MdxPost filePath={filePath} />
        {debug && dbg && (
          <pre className="mt-6 rounded-lg bg-neutral-50 p-3 text-xs text-neutral-700 border border-neutral-200 overflow-auto">
            {JSON.stringify(dbg, null, 2)}
          </pre>
        )}
      </main>
    </div>
  );
}
