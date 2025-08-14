import { Typography } from "antd";
import { formatTime, MessageItem } from "./forumUtils";

const { Text } = Typography;

export default function ForumList({ messages }: { messages: MessageItem[] }) {
  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <div className="text-slate-400">还没有留言，快来占个沙发～</div>
      ) : (
        <>
          {messages.map((m) => (
            <article
              key={m._id}
              className="rounded-xl border border-slate-200 bg-white shadow-sm p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <Text strong>匿名</Text>
                <Text type="secondary" className="text-xs">
                  {formatTime(m.createdAt)}
                </Text>
              </div>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: m.content }}
              />
            </article>
          ))}
        </>
      )}
    </div>
  );
}
