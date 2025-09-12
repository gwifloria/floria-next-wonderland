// src/app/letters/[threadId]/ThreadDetailClient.tsx
"use client";
import {
  AttachmentType,
  CommentApi,
  MailMessageApi,
  ThreadApi,
} from "@/types/letter";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

/* ---------- utils ---------- */
function fmtDateTime(iso?: string | null) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso || "";
  }
}
function initials(addr?: string) {
  if (!addr) return "?";
  return (addr.split("@")[0] || addr).slice(0, 1).toUpperCase();
}
function fmtKB(size?: number | null) {
  if (!size) return "";
  return `${(size / 1024).toFixed(1)}KB`;
}

/* ---------- UI atoms ---------- */
function AttachmentPills({ attachments }: { attachments?: AttachmentType[] }) {
  if (!attachments?.length) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {attachments.map((att, i) => (
        <li key={att.id || i}>
          <a
            href={att.url || undefined}
            className="inline-flex items-center rounded-full border border-dashed px-3 py-1 text-xs text-neutral-700 hover:bg-neutral-50"
          >
            {att.name || att.contentId || "附件"}
            {att.size ? (
              <span className="ml-2 text-neutral-400">{fmtKB(att.size)}</span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** 单条邮件：统一“信件/手帐”气质 */
function MessageCard({ m }: { m: MailMessageApi }) {
  return (
    <article
      id={`msg-${m.id}`}
      className="relative rounded-2xl border border-neutral-200 bg-[#fffdf8] p-4 md:p-5 shadow-sm"
    >
      {/* 邮票（右上角） */}
      <span className="absolute right-3 top-3 grid h-8 w-6 place-items-center rounded-[2px] border border-neutral-300 bg-white text-[10px] font-medium text-neutral-600">
        {initials(m.from?.address)}
      </span>
      {/* 和纸胶带（左上角，低饱和） */}
      <span
        aria-hidden
        className="absolute left-3 top-2 h-2 w-10 -rotate-6 rounded-[2px] bg-neutral-300/40"
      />

      <header className="mb-2 flex items-baseline justify-between pr-10">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-xs text-neutral-700">
            {initials(m.from?.address)}
          </div>
          <div className="min-w-0 text-sm">
            <div className="truncate font-medium text-neutral-800">
              {m.from?.name || m.from?.address}{" "}
              <span className="text-neutral-500">
                → {(m.to || []).map((t) => t.name || t.address).join(", ")}
              </span>
            </div>
            <div className="truncate text-neutral-500">
              {m.subject || "(无标题)"}
            </div>
          </div>
        </div>
        <time className="ml-3 shrink-0 text-xs text-neutral-500">
          {fmtDateTime(m.sentAt)}
        </time>
      </header>

      {/* 撕纸感分隔（轻虚线） */}
      <hr className="my-3 border-0 border-t border-dashed border-neutral-300/80" />

      <div
        className="prose prose-neutral prose-sm max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(m.html),
        }}
      />
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
          className="w-full rounded-xl border border-dashed border-neutral-300/80 bg-white/70 px-4 py-2 text-sm text-neutral-600 hover:bg-white"
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
          {historyMsgs.map((m) => (
            <MessageCard key={m.id} m={m} />
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
      <section className="space-y-3">
        {visibleMsgs.map((m) => (
          <MessageCard key={m.id} m={m} />
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
              <li
                key={c.id}
                className="rounded-2xl border border-neutral-200 bg-white/80 p-4"
              >
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
          <p className="rounded-xl border border-dashed p-6 text-center text-neutral-500">
            暂无评论
          </p>
        )}
      </section>
    </main>
  );
}
