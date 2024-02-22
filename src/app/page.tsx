import { PersonalIntroduction } from "@/components/PersonalIntroduction";
import Image from "next/image";

export default function Home() {
  return (
    <main className="font-sans mx-auto min-h-screen p-6 sm:p-12 md:p-24 lg:p-36 flex min-h-screen flex-col items-center justify-between ">
      <PersonalIntroduction></PersonalIntroduction>
    </main>
  );
}
