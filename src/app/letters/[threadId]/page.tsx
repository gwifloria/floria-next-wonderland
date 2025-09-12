// app/letters/[threadId]/page.tsx
import { SWRShell } from "@/provider/SWRShell";
import ThreadDetailClient from "./ThreadDetailClient";

export const metadata = {
  title: "Letter",
  robots: { index: false, follow: true },
};

export default function ThreadPage({
  params,
}: {
  params: { threadId: string };
}) {
  return (
    <SWRShell>
      <ThreadDetailClient threadId={params.threadId} />
    </SWRShell>
  );
}
