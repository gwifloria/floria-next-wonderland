"use client";
import PageIntro from "@/components/PageIntro";
import { ThreadApi } from "@/types/letter";
import { fmtDateTime } from "@/util/date";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { ApiResp, COVERS, STICKER_IMGS, STICKER_POS } from "./constants";
import LettersTechDetails from "./LettersTechDetails";
import { initials } from "./util";

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
        <div className="flex align-center">
          <h1 className="text-2xl mr-8 font-semibold">Letters</h1>

          <PageIntro title="Letters" emoji="📬">
            <LettersTechDetails />
          </PageIntro>
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
          {items.map((t, i) => (
            <li key={t.id}>
              <ThreadCard t={t} q={q} index={i} />
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

export function ThreadHeader({ t, index }: { t: ThreadApi; index: number }) {
  const cover = COVERS[index % COVERS.length];
  const who = t.participants?.[0]?.address || "";
  const init = initials(who);
  return (
    <>
      {" "}
      {/* 封面背景（按 1~4 轮换） */}
      <span
        aria-hidden
        style={{ backgroundImage: `url(${cover})` }}
        className="pointer-events-none absolute inset-0 rounded-2xl bg-cover bg-center"
      />
      {/* 米白遮罩，保证文字可读性 */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[#fffdf8]/30 backdrop-blur-[0.5px]"
      />
      {/* 顶部标题背景区分（无渐变，纯色半透明） */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 rounded-t-2xl bg-white/40 transition-all group-hover:bg-white/30 backdrop-blur-[1px]"
      />
      {/* 右上角折角 */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-[1] h-8 w-8 overflow-hidden"
      >
        <span className="absolute -right-4 -top-4 block h-8 w-8 rotate-45 bg-gradient-to-br from-white to-stone-200/70 shadow-[0_0_1px_rgba(0,0,0,.15)]" />
      </span>
      {/* 右上角邮票：用发件人首字母 */}
      <span
        aria-hidden
        title={who}
        className={[
          "absolute right-3 top-3 z-[1] grid h-10 w-8 place-items-center",
          "rounded-[3px] border border-stone-300/90 bg-white/95",
          "text-[9px] font-semibold tracking-wide text-stone-600",
          "shadow-[inset_0_0_0_1px_rgba(255,255,255,.8)]",
          "before:absolute before:inset-0 before:[background:repeating-linear-gradient(45deg,rgba(0,0,0,.05)_0_2px,transparent_2px_4px)]",
        ].join(" ")}
      >
        <span className="relative z-10">{init}</span>
      </span>
    </>
  );
}

function ThreadCard({
  t,
  q,
  index,
}: {
  t: ThreadApi;
  q?: string;
  index: number;
}) {
  const title = t.subject || "(无标题)";

  return (
    <Link
      href={`/letters/${encodeURIComponent(t.id)}`}
      className="group relative block overflow-hidden rounded-2xl border border-stone-300/80 bg-[#fdfdfc] p-4 shadow-[inset_0_1px_0_#fff,0_1px_2px_rgba(0,0,0,.04)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg/30 sm:p-5 h-56 flex flex-col justify-between"
    >
      {" "}
      <ThreadHeader t={t} index={index}></ThreadHeader>
      <div className="flex-1 relative z-[1]">
        {/* 抬头（居中，信件题头味道） */}
        <header className="flex flex-col justify-between pr-14 min-h-[104px] h-28 pt-3 pb-2">
          {/* 留出邮票空间 */}
          <h2 className="font-serif text-[17px] sm:text-[18px] leading-snug text-stone-900 line-clamp-2 [-webkit-text-stroke:0.25px_white] [text-shadow:0_1px_0_#fff,0_0_2px_rgba(0,0,0,.06)]">
            {highlight(title, q)}
          </h2>
          <p className="mt-2 text-xs text-stone-700/90 [text-shadow:0_1px_0_#fff]">
            更新于 {fmtDateTime(t.updatedAt)} · {t.messageCount ?? 0} 封
          </p>
        </header>
      </div>
      {/* CTA 行文：更像打开信件 */}
      <p className="mt-auto text-center text-sm text-stone-700">
        <span className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-4 transition-colors group-hover:text-stone-900">
          Open
          <span
            aria-hidden
            className="relative -mt-[1px] inline-block h-[14px] w-[20px]"
          >
            <span className="absolute inset-0 rounded-[2px] border border-stone-400/80 bg-white shadow-[0_0_0_1px_rgba(255,255,255,.6)_inset]" />
            <span className="absolute left-0 right-0 top-0 h-[50%] origin-top transition-transform duration-300 ease-out [clip-path:polygon(0_0,100%_0,50%_100%)] bg-gradient-to-b from-stone-300/90 to-stone-200/60 group-hover:-translate-y-[2px]" />
          </span>
          <span
            aria-hidden
            className="ml-0.5 transition-transform duration-200 group-hover:translate-x-[2px]"
          >
            →
          </span>
        </span>
      </p>
      {/* 角落和纸胶带（低饱和，手帐感） */}
      <span
        aria-hidden
        className="absolute left-3 top-3 h-2 w-10 rotate-[-6deg] rounded-[2px] bg-stone-300/25"
      />
      {/* Removed bottom-right tape */}
      {/* 随机贴纸元素 */}
      {(() => {
        const mod = index % STICKER_IMGS.length;
        const img = STICKER_IMGS[mod];
        const pos = STICKER_POS[index % STICKER_POS.length];
        return (
          <Image
            width={32}
            height={48}
            src={img}
            alt=""
            className={`pointer-events-none absolute opacity-60 drop-shadow-[0_1px_1px_rgba(0,0,0,.08)] ${pos}`}
          />
        );
      })()}
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
