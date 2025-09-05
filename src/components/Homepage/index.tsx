import { BriefIntroduction } from "@/components/BriefIntro";
import Image from "next/image";
import Link from "next/link";

type NavItem = { href: string; title: string; desc: string; emoji: string };

const NAV: NavItem[] = [
  { href: "/blog", title: "Blog", desc: "碎碎念", emoji: "📘" },
  { href: "/lab", title: "Lab", desc: "小想法", emoji: "🧪" },
  { href: "/about", title: "About", desc: "About Me", emoji: "👋" },
  { href: "/forum", title: "Forum", desc: "讨论区", emoji: "💭" },
];

export const PaperBackdrop = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 mx-auto w-full min-w-[960px] max-w-[1600px] aspect-[7/5] z-0 bg-no-repeat bg-center"
      style={{
        backgroundImage: `url('/textures/paper-beige-texture-trimmed.png')`,
        backgroundSize: "contain",
        opacity: 0.95,
      }}
    />
  );
};

export const HeroSection = () => {
  return (
    <section className="relative px-24 w-full flex flex-col items-center justify-center pt-10 pb-6 z-10">
      {/* Avatar */}
      <div className="relative mb-4 sm:mb-6">
        <div className="rounded-full bg-white/80 shadow-lg p-1.5 sm:p-2">
          <Image
            src="/images/me.png"
            alt="Avatar"
            width={104}
            height={104}
            className="rounded-full border-4 border-mint-200 shadow-xl"
            priority
          />
        </div>
      </div>

      {/* Welcome Title */}
      <h1 className="typing text-center text-[22px] sm:text-2xl md:text-3xl font-serif italic font-bold text-neutral-700 tracking-wide [text-shadow:0.5px_0.5px_0_rgba(0,0,0,0.06)]">
        Welcome to My Wonderland
      </h1>

      <BriefIntroduction />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-3 -left-2 sm:-top-2 sm:left-2 -rotate-6 opacity-95"
      >
        <Image
          src="/tape/tape-blue.png"
          alt=""
          width={120}
          height={48}
          aria-hidden
          className="w-24 sm:w-28 h-auto drop-shadow-sm"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-7 -right-2 sm:-bottom-6 sm:-right-3 rotate-6 opacity-95"
      >
        <Image
          src="/tape/small-envelop.png"
          alt=""
          width={96}
          height={72}
          aria-hidden
          className="w-20 sm:w-24 h-auto drop-shadow-md"
        />
      </div>
    </section>
  );
};

export const CardLink = ({ item }: { item: NavItem }) => {
  return (
    <Link
      href={item.href}
      aria-label={item.title}
      className="
      border border-neutral-300 border-dashed
    group flex items-start gap-3 px-2 py-2 rounded-xl
    hover:bg-neutral-50/60 transition-colors
  "
    >
      <div
        aria-hidden
        className="inline-flex h-8 w-8 items-center justify-center rounded-full  text-base"
      >
        {item.emoji}
      </div>
      <div className="min-w-0">
        <div className="text-neutral-800 font-semibold text-[15px] tracking-tight">
          {item.title}
          <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </span>
        </div>
        <div className="text-xs text-neutral-600/90 mt-0.5 line-clamp-2">
          {item.desc}
        </div>
        {/* 下划线动画 */}
        <span className="block h-[1px] w-0 bg-neutral-300 mt-1 transition-all duration-300 group-hover:w-full" />
      </div>
    </Link>
  );
};
export const NavCards = () => {
  return (
    <nav aria-label="Main sections" className="w-full flex justify-center">
      <div className="relative z-10 w-full max-w-sm grid px-12 grid-cols-1 py-10 sm:py-12 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
        {NAV.map((it) => (
          <CardLink key={it.href} item={it} />
        ))}
      </div>
    </nav>
  );
};
