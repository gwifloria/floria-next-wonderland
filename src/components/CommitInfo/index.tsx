export default function CommitInfo() {
  const app = process.env.NEXT_PUBLIC_COMMIT_ID ?? "unknown";
  console.log("app", app);
  return (
    <div className="fixed bottom-2 right-2 bg-neutral-50/70 backdrop-blur-sm px-2 py-1 rounded text-[11px] leading-4 text-neutral-400">
      <span className="mr-3">
        App: <code>{app}</code>
      </span>
    </div>
  );
}
