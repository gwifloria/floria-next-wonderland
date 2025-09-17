import Image from "next/image";
import {
  labels,
  DECORATION_IMAGES,
  DECORATION_SIZES,
  HERO_TITLE_STYLE,
  THEME_COLORS,
} from "../constant";
import { LanguageToggle } from "./LanguageToggle";

type Lang = "zh" | "en";

interface HeroSectionProps {
  lang: Lang;
  onLanguageChange: (lang: Lang) => void;
}

export function HeroSection({ lang, onLanguageChange }: HeroSectionProps) {
  const L = labels[lang];

  return (
    <div
      className={`text-center mb-16 ${THEME_COLORS.cardBg} ${THEME_COLORS.border} border rounded-2xl p-6`}
    >
      <LanguageToggle lang={lang} onChange={onLanguageChange} />

      <div className="relative inline-block mb-6">
        <div
          className="pointer-events-none absolute -top-6 left-2 rotate-24 opacity-90"
          style={DECORATION_SIZES.bow}
        >
          <Image
            priority
            src={DECORATION_IMAGES.whiteBow}
            alt="bow"
            fill
            className="object-contain"
          />
        </div>

        <Image
          priority
          width={140}
          height={120}
          alt="avatar"
          src="/images/me.png"
          className="border-4 rounded-full object-cover border-white shadow-lg"
        />
      </div>

      <h1
        className="text-rose-600 text-4xl font-bold mb-4 tracking-wide"
        style={HERO_TITLE_STYLE}
      >
        {L.about}
      </h1>

      <p className="text-base leading-relaxed text-neutral-700/90 max-w-2xl mx-auto">
        Hi there! I&apos;m a passionate developer who loves creating beautiful
        and functional web experiences. I believe in writing clean, maintainable
        code and always learning new technologies.
      </p>
    </div>
  );
}
