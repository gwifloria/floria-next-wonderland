"use client";
import Image from "next/image";
import { BriefIntroduction } from "./PersonalIntro/BriefIntro";
import { JumpingFlags } from "./PersonalIntro/JumpingFlags";

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center pt-24 pb-12 relative z-10">
      <div className="rounded-full bg-white/80 shadow-lg p-2 mb-6">
        <Image
          src="/images/me.png"
          alt="Avatar"
          width={160}
          height={160}
          className="rounded-full border-4 border-mint-200 shadow-xl"
          priority
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-mint-700 mb-4 font-mono text-center drop-shadow-lg">
        <JumpingFlags></JumpingFlags>
      </h1>
      <BriefIntroduction></BriefIntroduction>
      <div className="flex gap-4 mt-2">
        <a
          href="#portfolio"
          className="bg-mint-200 hover:bg-mint-300 text-mint-900 font-semibold py-2 px-6 rounded-full shadow transition-all duration-200"
        >
          View Portfolio
        </a>
        <a
          href="#blog"
          className="bg-rose-100 hover:bg-rose-200 text-rose-500 font-semibold py-2 px-6 rounded-full shadow transition-all duration-200"
        >
          Read Blog
        </a>
      </div>
    </section>
  );
}
