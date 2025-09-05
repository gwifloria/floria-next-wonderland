import { HeroSection, NavCards, PaperBackdrop } from "@/components/Homepage";
import SayHiButton from "@/components/SayHiButton";

export default function HomeContainer() {
  return (
    <main className="relative px-12 py-24 flex flex-col items-center justify-between h-full overflow-auto">
      <PaperBackdrop />
      <div className="backdrop-blur-[1px] w-full">
        <HeroSection />
        <NavCards></NavCards>
      </div>
      <SayHiButton />
    </main>
  );
}
