// app/letters/page.tsx
import { SWRShell } from "@/provider/SWRShell";
import LettersListClient from "./LettersListClient";

export const metadata = {
  title: "Letters",
  robots: { index: false, follow: true },
};

export default function LettersPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const q = (searchParams.q || "").trim();
  const page = parseInt(searchParams.page || "1", 10) || 1;
  return (
    <SWRShell>
      <LettersListClient initialQ={q} initialPage={page} />
    </SWRShell>
  );
}
