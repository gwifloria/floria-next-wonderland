import HeroSection from "@/components/HeroSection";
import SayHiButton from "@/components/SayHiButton";
import Link from "next/link";

type NavItem = { href: string; title: string; desc: string; emoji: string };

const NAV: NavItem[] = [
  { href: "/blog", title: "Blog", desc: "技术与笔记 Bytenotes", emoji: "📘" },
  { href: "/murmurs", title: "Murmurs", desc: "日常碎念与想法", emoji: "💭" },
  { href: "/lab", title: "Lab", desc: "小实验与交互玩具", emoji: "🧪" },
  { href: "/about", title: "About", desc: "关于我与简历", emoji: "👋" },
];

function CardLink({ item }: { item: NavItem }) {
  return (
    <Link
      href={item.href}
      aria-label={item.title}
      className="group relative rounded-2xl border border-nepal-100 bg-milktea-50/80 p-6 sm:p-7 shadow-sm transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 transform will-change-transform hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div
          aria-hidden
          className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-mint-100 text-xl sm:text-2xl select-none shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
        >
          {item.emoji}
        </div>
        <div className="min-w-0">
          <div className="text-nepal-700 font-semibold text-lg sm:text-xl tracking-tight">
            {item.title}
          </div>
          <div className="text-sm text-neutral-600 mt-1 line-clamp-2">
            {item.desc}
          </div>
        </div>
      </div>
      <span
        aria-hidden
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 translate-x-1 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 text-nepal-600 group-hover:text-nepal-700"
      >
        →
      </span>
    </Link>
  );
}

export default function HomeContainer() {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="w-full max-h-[60vh] max-w-6xl bg-white rounded-[2.5rem] shadow-xl p-2 sm:p-6 md:p-12 lg:p-16 my-4  border-2 border-mint-100/40">
        <HeroSection />
      </div>

      <section className="w-full max-w-6xl mt-2 px-2 sm:px-0">
        <header className="px-1 sm:px-2 mb-4 sm:mb-6">
          <h2 className="text-sm font-semibold tracking-wide text-neutral-500">
            Explore
          </h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {NAV.map((it) => (
            <CardLink key={it.href} item={it} />
          ))}
        </div>
      </section>

      <SayHiButton />
    </main>
  );
}
