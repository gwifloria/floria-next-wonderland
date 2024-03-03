import { FixedNavBar } from "@/components/FixedNavBar";
import PageHeader from "@/components/PageHeader";
import { PersonalIntroduction } from "@/components/PersonalIntroduction";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <PersonalIntroduction></PersonalIntroduction>
    </main>
  );
}
