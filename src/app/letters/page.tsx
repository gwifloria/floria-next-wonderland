// app/letters/page.tsx
import { SWRShell } from "@/provider/SWRShell";
import LettersListClient from "./LettersListClient";

export const metadata = {
  title: "Letters",
  robots: { index: false, follow: true },
};

export default async function LettersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { page, q } = await searchParams;
  return (
    <SWRShell>
      <LettersListClient initialQ={q} initialPage={parseInt(page ?? "1")} />
    </SWRShell>
  );
}
