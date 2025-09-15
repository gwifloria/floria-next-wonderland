import TipTapEditor from "@/components/TipTapEditor";
import { useMessage } from "@/provider/UIProviders";
import { CommentApi } from "@/types/letter";
import { fmtDateTime } from "@/util/date";
import { fetcherFactory } from "@/util/fetch";
import { Popconfirm } from "antd";
import DOMPurify from "isomorphic-dompurify";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export function MailComment({ threadId }: { threadId: string }) {
  const { data: session } = useSession();

  const message = useMessage();
  const { trigger } = useSWRMutation(
    `/api/letters/${threadId}/comments`,
    fetcherFactory("POST"),
  );

  const { data: comments } = useSWR<CommentApi[]>(
    `/api/letters/${threadId}/comments`,
  );

  const { trigger: deleteComment } = useSWRMutation(
    `/api/letters/${threadId}/comments`,
    fetcherFactory("DELETE"),
  );

  const handleUpload = useCallback(
    async (content: string) => {
      try {
        await trigger({
          content: content,
          author: { name: session!.user!.name, address: session!.user!.email },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [session, trigger],
  );

  const handleDelete = useCallback(
    async (commentId: string) => {
      try {
        await deleteComment({ commentId, address: session?.user?.email });
        message.success("评论已删除");
      } catch (err) {
        console.error(err);
        message.error("删除失败");
      }
    },
    [deleteComment, message, session?.user?.email],
  );

  return (
    <>
      {comments?.length ? (
        <ul className="space-y-5">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-2xl bg-white/40 shadow-md p-4 flex flex-col gap-2 w-full mx-auto"
            >
              <div className="mb-1 text-xs text-neutral-400">
                {comment?.author?.name || comment?.author?.address || "匿名"}·{" "}
                {fmtDateTime(comment.createdAt)}
              </div>
              <div
                className="prose prose-neutral prose-sm max-w-full rounded-lg"
                style={{ wordBreak: "break-word" }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(comment.content),
                }}
              />
              {comment.author.address === session?.user?.email && (
                <div className="flex justify-end">
                  <Popconfirm
                    title="删除确认"
                    description="确定要删除这条留言吗？"
                    okText="删除"
                    cancelText="取消"
                    onConfirm={() => handleDelete(comment.id)}
                  >
                    <button
                      className="text-rose-500 bg-rose-100 group-hover:opacity-100 transition-opacity text-xs border px-2 py-0.5 rounded"
                      aria-label="删除"
                    >
                      删除
                    </button>
                  </Popconfirm>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="my-8 flex justify-center rounded-2xl bg-white/40 shadow-md px-8 py-8 text-center text-neutral-400 w-full mx-auto">
          空空如也～
        </div>
      )}
      {session ? (
        <>
          <div className="text-[12px] text-mint-400 my-2">
            Signed in as {session?.user?.email}
            <br />
            <button onClick={() => signOut()}>sign out</button>
          </div>
          <TipTapEditor onSendSuccess={handleUpload}></TipTapEditor>
        </>
      ) : (
        <>
          Not signed in <br />
          <button
            className="rounded-2xl bg-white/60 px-4 py-2"
            onClick={() => signIn("github")}
          >
            Sign in
          </button>
        </>
      )}
    </>
  );
}
