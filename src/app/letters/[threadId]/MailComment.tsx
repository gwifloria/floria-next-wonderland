import AuthStatus from "@/components/AuthStatus";
import CommentCard from "@/components/CommentCard";
import TipTapEditor from "@/components/TipTapEditor";
import { useMessage } from "@/provider/UIProviders";
import { CommentApi } from "@/types/letter";
import { fmtDateTime } from "@/util/date";
import { fetcherFactory } from "@/util/fetch";
import DOMPurify from "isomorphic-dompurify";
import { useSession } from "next-auth/react";
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
    <div className="space-y-6">
      {/* Comments List */}
      {comments?.length ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              id={comment.id}
              author={
                comment?.author?.name || comment?.author?.address || "匿名"
              }
              createdAt={fmtDateTime(comment.createdAt)}
              content={
                <div
                  className="prose prose-neutral prose-sm max-w-full"
                  style={{ wordBreak: "break-word" }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(comment.content),
                  }}
                />
              }
              onDelete={handleDelete}
              showDeleteButton={comment.author.address === session?.user?.email}
            />
          ))}
        </div>
      ) : (
        <div className="relative bg-[#FFFDF9] border border-dashed border-rose-200 rounded-2xl p-8 text-center shadow-[0_1px_0_rgba(0,0,0,0.04)]">
          {/* Decorative element for empty state */}
          <div
            className="pointer-events-none absolute -top-2 left-1/2 transform -translate-x-1/2 w-[48px] h-[16px] -rotate-1 opacity-60"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 48 16"
              fill="none"
              className="w-full h-full text-rose-300"
            >
              <path
                d="M2 8 Q24 2 46 8 Q24 14 2 8"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2,2"
                fill="none"
              />
            </svg>
          </div>
          <p className="text-neutral-400 font-handwritten">空空如也～</p>
        </div>
      )}

      {/* Authentication and Editor Section */}
      <div className="space-y-4">
        {session ? (
          <TipTapEditor
            onSendSuccess={handleUpload}
            showAuthStatus={<AuthStatus compact />}
          />
        ) : (
          <AuthStatus />
        )}
      </div>
    </div>
  );
}
