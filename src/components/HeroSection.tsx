"use client";
import Image from "next/image";
import Link from "next/link";
import { BriefIntroduction } from "./BriefIntro";

export default function HeroSection() {
  return (
    <section className="relative w-full max-h-[55vh] sm:max-h-[60vh] overflow-hidden flex flex-col items-center justify-center pt-8 pb-10 z-10">
      {/* Avatar */}
      <div className="rounded-full bg-white/80 shadow-lg p-1.5 sm:p-2 mb-4 sm:mb-6">
        <Image
          src="/images/me.png"
          alt="Avatar"
          width={104}
          height={104}
          className="rounded-full border-4 border-mint-200 shadow-xl"
          priority
        />
      </div>

      {/* Welcome Title */}
      <h1 className="text-center text-[22px] sm:text-2xl md:text-3xl font-serif italic font-bold text-neutral-700 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
        Welcome to My Wonderland
      </h1>

      <BriefIntroduction></BriefIntroduction>

      {/* CTA */}
      <div className="mt-4 sm:mt-5">
        <Link
          href="/blog"
          aria-label="Go to Blog"
          className="inline-flex items-center gap-2 rounded-full bg-nepal-600 text-white px-3.5 py-1.5 text-sm sm:text-[15px] hover:bg-nepal-700 transition-colors"
        >
          Start →
        </Link>
      </div>

      {/* Bottom fade mask to soften overflow */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
