"use client";

export default function CommitInfo() {
  const app = process.env.NEXT_PUBLIC_COMMIT_ID ?? "unknown";
  const content = process.env.NEXT_PUBLIC_SUBMODULE_COMMIT_ID ?? "unknown";

  return (
    <div className="mt-6 text-[11px] leading-4 text-neutral-500">
      <span className="mr-4">
        App: <code>{app}</code>
      </span>
      <span>
        Content: <code>{content}</code>
      </span>
    </div>
  );
}
