import { HeroSection, NavCards, PaperBackdrop } from "@/components/Homepage";
import SayHiButton from "@/components/Sayhi/SayHiButton";
import Image from "next/image";
export default function HomeContainer() {
  return (
    <>
      <div className="big-bg fixed inset-0 z-11 opacity-50 pointer-events-none overflow-hidden">
        <Image
          src="/images/niupizhi-bg-cropped.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <main className="mx-auto max-w-[720px] h-full w-full overflow-hidden px-4 py-8 sm:py-16 flex flex-col">
        {/* Background sits behind everything */}
        <PaperBackdrop />

        {/* Content column */}
        <section className="flex-1 w-full">
          {/* Lighter blur on mobile to avoid muddy text */}
          <HeroSection />
          <NavCards />
        </section>

        {/* Safe-area aware CTA fixed at the bottom so it won't overlap hero text */}
        <div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
        >
          <div className="pointer-events-auto">
            <SayHiButton />
          </div>
        </div>
      </main>
    </>
  );
}
