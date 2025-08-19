import ForumItem from "./ForumItem";
import { MessageItem } from "./forumUtils";

export default function ForumList({
  messages,
  refresh,
}: {
  messages?: MessageItem[];
  refresh: () => void;
}) {
  return (
    <div className="space-y-4">
      {messages?.length === 0 ? (
        <div className="text-slate-400">还没有留言，快来占个沙发～</div>
      ) : (
        <>
          {messages?.map((m) => (
            <ForumItem onDelete={refresh} key={m._id} item={m} />
          ))}
        </>
      )}
    </div>
  );
}
