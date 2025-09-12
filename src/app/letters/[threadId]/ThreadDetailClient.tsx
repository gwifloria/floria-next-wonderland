"use client";
import { CommentApi, MailMessageApi, ThreadApi } from "@/types/letter";
import { fmtDateTime } from "@/util/date";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { STICKER_IMGS, STICKER_POS } from "../constants";

/** 单条邮件：统一“信件/手帐”气质 */
function MessageCard({ m, index }: { m: MailMessageApi; index: number }) {
  return (
    <article
      id={`msg-${m.id}`}
      className="group relative overflow-visible rounded-2xl bg-transparent p-0"
    >
      {/* 和纸胶带（左上角，低饱和） */}
      <span
        aria-hidden
        className="absolute left-3 top-2 z-[2] h-1.5 w-8 -rotate-6 rounded-[2px] bg-neutral-300/30"
      />
      <div className="relative overflow-hidden z-[1] rounded-2xl px-6 md:px-8 py-5 md:py-6 ring-1 ring-neutral-200/40 bg-stone-50/90 backdrop-blur-[0.5px] shadow-[inset_0_1px_0_rgba(255,255,255,.6)] transition-transform duration-200">
        <Image
          src="/images/env-beige.png"
          alt=""
          width={220}
          height={160}
          className="absolute -left-12 bottom-2 -rotate-3 opacity-40 drop-shadow-md pointer-events-none z-1"
        />
        <Image
          fill
          alt=""
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-45 mix-blend-multiply object-cover"
          src="/images/bg-white-paper.png"
        />

        <header className="relative mb-3 flex items-start justify-between gap-3 pr-2">
          {/* 中：地址与主题 */}
          <div className="min-w-0 flex-1 truncate font-medium text-neutral-800 flex min-w-0 items-center gap-2 text-[13px] leading-5">
            {m.from?.address}
          </div>

          {/* 右：时间 */}
          <time className="ml-2 shrink-0 pt-0.5 text-[12px] leading-5 text-neutral-500">
            {fmtDateTime(m.sentAt)}
          </time>
        </header>

        {/* 撕纸感分隔（轻虚线） */}
        <hr className="relative my-2 border-0 border-t border-dashed border-neutral-300/80" />

        <div
          className="relative prose prose-neutral prose-sm max-w-none leading-relaxed text-neutral-800"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(m.html),
          }}
        />
      </div>
      {/* 随机贴纸 */}
      {(() => {
        const img = STICKER_IMGS[index % STICKER_IMGS.length];
        const pos = STICKER_POS[index % STICKER_POS.length];
        return (
          <Image
            width={32}
            height={48}
            src={img}
            alt=""
            className={`pointer-events-none absolute z-[2] opacity-60 ${pos}`}
          />
        );
      })()}
    </article>
  );
}

/** 历史消息折叠区 */
function HistorySection({ historyMsgs }: { historyMsgs: MailMessageApi[] }) {
  const [open, setOpen] = useState(false);

  if (!historyMsgs.length) return null;

  return (
    <section className="mb-4">
      {!open ? (
        <button
          className="w-full rounded-xl bg-neutral-50/80 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 shadow-sm transition"
          onClick={() => setOpen(true)}
        >
          ➕ 展开历史 {historyMsgs.length} 封
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[13px] text-neutral-500">
            <span>历史</span>
            <button
              className="rounded px-2 py-1 hover:bg-neutral-100"
              onClick={() => setOpen(false)}
            >
              ▾ 收起历史
            </button>
          </div>
          {historyMsgs.map((m, i) => (
            <MessageCard key={m.id} m={m} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------- Page ---------- */
export default function ThreadDetailClient({ threadId }: { threadId: string }) {
  const { data, error, isLoading } = useSWR<{
    thread: ThreadApi;
    messages: MailMessageApi[];
    comments: CommentApi[];
  }>(`/api/letters/${threadId}`);
  if (isLoading)
    return <div className="p-8 text-center text-neutral-500">加载中…</div>;
  if (error)
    return <div className="p-8 text-center text-red-500">加载失败</div>;
  if (!data)
    return <div className="p-8 text-center text-neutral-500">未找到</div>;

  const { thread, messages, comments } = data;
  const MAX_VISIBLE = 5; // 默认展示最早的 5 封
  const visibleMsgs = (messages || []).slice(0, MAX_VISIBLE);
  const restMsgs = (messages || []).slice(MAX_VISIBLE);

  return (
    <main className="mx-auto w-full max-w-2xl px-3 md:px-4 py-6">
      <header className="mb-5 space-y-1">
        <Link
          href="/letters"
          className="inline-flex items-center gap-1 text-[13px] text-neutral-500 hover:text-neutral-700"
        >
          ← 返回列表
        </Link>
        <h1 className="text-[22px] md:text-2xl font-semibold text-neutral-900 tracking-[.2px]">
          {thread.subject || "(无标题)"}
        </h1>
        <p className="text-[13px] text-neutral-500">
          {fmtDateTime(thread?.firstAt)} · 更新 {fmtDateTime(thread?.updatedAt)}{" "}
          · {thread.messageCount ?? messages.length} 封
        </p>
      </header>

      {/* 最近两封 */}
      <section className="space-y-6">
        {visibleMsgs.map((m, i) => (
          <MessageCard key={m.id} m={m} index={i} />
        ))}
      </section>

      {/* 历史（默认折叠） */}
      <HistorySection historyMsgs={restMsgs} />

      {/* 评论 */}
      <section className="mt-8">
        <h2 className="mb-3 text-[15px] font-medium tracking-wide">评论</h2>
        {comments?.length ? (
          <ul className="space-y-3">
            {comments.map((c) => (
              <li key={c.id} className="rounded-2xl bg-white/60 shadow-sm p-4">
                <div className="mb-1 text-[12px] text-neutral-500">
                  {c.author?.name || c.author?.id || "匿名"} ·{" "}
                  {fmtDateTime(c.createdAt)}
                </div>
                <div
                  className="prose prose-neutral prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(c.content),
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl bg-neutral-50/60 p-6 text-center text-neutral-500 shadow-inner">
            暂无评论
          </p>
        )}
      </section>
    </main>
  );
}
