"use client";
import { ThreadApi } from "@/types/letter";
import Link from "next/link";
import useSWR from "swr";

type ApiResp = {
  message: string;
  data: ThreadApi[];
  pagination: { page: number; limit: number; total: number; pages: number };
};

function fmtDate(iso?: string | null) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("zh-CN", { dateStyle: "medium" }).format(d);
  } catch {
    return iso || "";
  }
}

function highlight(text: string, q?: string) {
  if (!q) return text;
  try {
    const re = new RegExp(
      `(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "ig",
    );
    return text.split(re).map((seg, i) =>
      i % 2 === 1 ? (
        <mark key={i} className="bg-yellow-100">
          {seg}
        </mark>
      ) : (
        <span key={i}>{seg}</span>
      ),
    );
  } catch {
    return text;
  }
}

function initials(addr?: string) {
  if (!addr) return "?";
  const name = addr.split("@")[0] || addr;
  return name.slice(0, 1).toUpperCase();
}

export default function LettersListClient({
  initialQ,
  initialPage,
}: {
  initialQ?: string;
  initialPage?: number;
}) {
  const q = (initialQ || "").trim();
  const page = initialPage && initialPage > 0 ? initialPage : 1;

  const params = new URLSearchParams();
  if (q) params.set("q", q);
  params.set("page", String(page));
  params.set("limit", "20");

  const { data, error, isLoading } = useSWR<ApiResp>(
    `/api/letters/list?${params.toString()}`,
    {
      keepPreviousData: true,
    },
  );

  const items = data?.data || [];
  const currentPage = data?.pagination?.page || page;
  const pages = data?.pagination?.pages || 1;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Letters</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Archive Mail With yiceng
          </p>
        </div>
        <form className="w-full sm:w-auto" action="/letters" method="get">
          <input
            name="q"
            defaultValue={q}
            placeholder="搜索主题…"
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300"
          />
        </form>
      </header>

      {isLoading && !items.length && (
        <div className="rounded-lg border border-dashed p-8 text-center text-neutral-500">
          加载中…
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          加载失败，请稍后重试
        </div>
      )}

      {!items.length && !isLoading ? (
        <Empty q={q} />
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <li key={t.id}>
              <ThreadCard t={t} q={q} />
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          {currentPage > 1 && (
            <Link
              className="rounded-md border px-4 py-2 text-sm hover:bg-neutral-50"
              href={`/letters?${new URLSearchParams({ ...(q ? { q } : {}), page: String(currentPage - 1) }).toString()}`}
            >
              上一页
            </Link>
          )}
          {currentPage < pages && (
            <Link
              className="rounded-md border px-4 py-2 text-sm hover:bg-neutral-50"
              href={`/letters?${new URLSearchParams({ ...(q ? { q } : {}), page: String(currentPage + 1) }).toString()}`}
            >
              下一页
            </Link>
          )}
        </div>
      )}
    </main>
  );
}

function ThreadCard({ t, q }: { t: ThreadApi; q?: string }) {
  const who = t.participants?.[0]?.address || "";
  const init = initials(who);
  const title = t.subject || "(无标题)";

  return (
    <Link
      href={`/letters/${encodeURIComponent(t.id)}`}
      className={[
        // 信纸外观：柔和纸色 + 细描边 + 内高光
        "group relative block overflow-hidden rounded-2xl border border-stone-300/80",
        "bg-[radial-gradient(120%_120%_at_10%_0%,#ffffff_0%,#fbf8f1_55%,#f4efe6_100%)]",
        "shadow-[inset_0_1px_0_#fff,0_1px_2px_rgba(0,0,0,.04)]",
        // 悬停微抬起
        "transition-all duration-200 hover:-translate-y-[2px] hover:shadow-md hover:border-stone-400/80",
        // 内边距
        "p-4 sm:p-5",
      ].join(" ")}
    >
      {/* 右上角折角 */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-8 w-8 overflow-hidden"
      >
        <span className="absolute -right-4 -top-4 block h-8 w-8 rotate-45 bg-gradient-to-br from-white to-stone-200/70 shadow-[0_0_1px_rgba(0,0,0,.15)]" />
      </span>

      {/* 右上角邮票：用发件人首字母 */}
      <span
        aria-hidden
        title={who}
        className={[
          "absolute right-3 top-3 grid h-10 w-8 place-items-center",
          "rounded-[3px] border border-stone-300/90 bg-white/90",
          "text-[10px] font-semibold tracking-wide text-stone-600",
          "shadow-[inset_0_0_0_1px_rgba(255,255,255,.8)]",
          "before:absolute before:inset-0 before:[background:repeating-linear-gradient(45deg,rgba(0,0,0,.05)_0_2px,transparent_2px_4px)]",
        ].join(" ")}
      >
        <span className="relative z-10">{init}</span>
      </span>

      {/* 抬头（居中，信件题头味道） */}
      <header className="pr-14">
        {/* 留出邮票空间 */}
        <h2 className="text-center font-serif text-[17px] sm:text-[18px] leading-snug text-stone-800">
          {highlight(title, q)}
        </h2>
        <p className="mt-2 text-center text-xs text-stone-500">
          更新于 {fmtDate(t.updatedAt)} · {t.messageCount ?? 0} 封
        </p>
      </header>

      {/* 撕纸感分隔线（虚线） */}
      <hr className="my-4 border-0 border-t border-dashed border-stone-300/80" />

      {/* CTA 行文：更像打开信件 */}
      <p className="text-center text-sm text-stone-700">
        <span className="underline decoration-dotted underline-offset-4 transition-colors group-hover:text-stone-900">
          点击打开信件 →
        </span>
      </p>

      {/* 角落和纸胶带（低饱和，手帐感） */}
      <span
        aria-hidden
        className="absolute left-3 top-3 h-2.5 w-12 rotate-[-6deg] rounded-[2px] bg-stone-300/40"
      />
      <span
        aria-hidden
        className="absolute bottom-3 right-5 h-2.5 w-9 rotate-[8deg] rounded-[2px] bg-stone-300/30"
      />
    </Link>
  );
}

function Empty({ q }: { q?: string }) {
  return (
    <div className="rounded-lg border border-dashed p-8 text-center text-neutral-500">
      {q ? (
        <p>
          没找到与 <span className="font-medium text-neutral-700">“{q}”</span>{" "}
          匹配的线程。
          <Link className="ml-2 underline" href="/letters">
            清除搜索
          </Link>
        </p>
      ) : (
        <p>还没有线程数据，先去同步一把吧～</p>
      )}
    </div>
  );
}
