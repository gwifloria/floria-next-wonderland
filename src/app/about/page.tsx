"use client";
import Image from "next/image";
import { useState } from "react";
import { skills } from "../../components/PersonalIntro/constant";
import { education, experiences, labels } from "./constant";
import { GapMarkdown } from "./Gap";
import "./print.css";

// Shared types / utils
type Lang = "zh" | "en";

const HAND_FONT = {
  fontFamily:
    "'Caveat', 'Patrick Hand', 'Segoe UI', system-ui, -apple-system, sans-serif",
} as const;

const PAPER_BG_STYLE: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url('/images/paper-fiber.png')",
  backgroundRepeat: "repeat",
  backgroundSize: "auto, 1024px 1024px",
};

const HERO_TITLE_STYLE: React.CSSProperties = {
  ...HAND_FONT,
  textShadow: "0.5px 0.5px 0.6px rgba(0,0,0,0.08)",
};

const TAPE_SOURCES = {
  pink: "/images/tape-pink.png",
  beige: "/images/tape-beige.png",
  blue: "/images/tape-blue.png",
} as const;

type CardSectionProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const ScrapbookCard = ({
  title,
  children,
  className = "",
  tape = true,
  tapeVariant,
}: CardSectionProps & {
  tape?: boolean;
  tapeVariant?: keyof typeof TAPE_SOURCES;
}) => {
  const chosen = tapeVariant ?? "beige";
  const tapeSrc = TAPE_SOURCES[chosen];
  return (
    <div
      className={
        `relative p-6 rounded-3xl mb-10 border border-milktea-200 shadow-sm ` +
        className
      }
      style={PAPER_BG_STYLE}
    >
      {tape && (
        <div className="pointer-events-none absolute -top-3 -left-4 rotate-9 opacity-90 w-[60px] h-[40px]">
          <Image src={tapeSrc} alt="tape" fill className="object-contain" />
        </div>
      )}

      {title && (
        <h2
          className="mb-6 text-xl font-semibold text-rose-700"
          style={HAND_FONT}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

const TimelineBar = () => (
  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-gradient-to-b from-rose-200 to-rose-400" />
);

export default function AboutMePage() {
  const [lang, setLang] = useState<Lang>("zh");
  const L = labels[lang];

  return (
    <>
      <main className="about-page min-h-screen">
        <div className="container bg-milktea-100/90 border border-milktea-200 shadow-sm rounded-3xl mx-auto p-12 my-12 md:my-16 lg:my-20 bg-[url('/images/paper-fiber.png')] bg-[length:1024px_1024px] bg-repeat">
          {/* Hero Section */}
          <div className="text-center mb-16 bg-milktea-50/85 border border-milktea-200 rounded-2xl p-6">
            <div className="flex justify-center gap-3 mb-4">
              <div
                role="radiogroup"
                aria-label="Language"
                className="inline-flex rounded-lg bg-neutral-100 p-1"
              >
                {(["zh", "en"] as const).map((v) => {
                  const label = v === "zh" ? "中文" : "EN";
                  const checked = lang === v;
                  return (
                    <button
                      key={v}
                      role="radio"
                      aria-checked={checked}
                      onClick={() => setLang(v)}
                      className={[
                        "px-3 py-1.5 rounded-md text-sm focus:outline-none focus-visible:ring-2 transition-colors",
                        checked
                          ? "bg-white shadow text-neutral-900"
                          : "text-neutral-600 hover:bg-neutral-200",
                      ].join(" ")}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="relative inline-block mb-6">
              <div className="pointer-events-none absolute -top-6 left-2 rotate-24 opacity-90 w-10 h-10">
                <Image
                  priority
                  src="/images/white-bow.png"
                  alt="bow"
                  fill
                  className="object-contain"
                />
              </div>
              <Image
                priority
                width={120}
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
              Hi there! I&apos;m a passionate developer who loves creating
              beautiful and functional web experiences. I believe in writing
              clean, maintainable code and always learning new technologies.
            </p>
          </div>
          <div className="space-y-10 md:space-y-0 ">
            {/* Resume Section */}
            <section>
              <ScrapbookCard title={L.personal} tape tapeVariant="beige">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <strong className="text-neutral-500">{L.name}:</strong>{" "}
                    龚慧珏 / Floria
                    <br />
                    <strong className="text-neutral-500">
                      {L.location}:
                    </strong>{" "}
                    —
                    <br />
                    <strong className="text-neutral-500">
                      {L.email}:
                    </strong>{" "}
                    gwifloria@outlook.com
                    <br />
                    <strong className="text-neutral-500">
                      {L.available}:
                    </strong>{" "}
                    Full-time, Freelance
                  </div>
                  <div>
                    <strong className="text-neutral-500">
                      {L.experience}:
                    </strong>{" "}
                    5+ years
                    <br />
                    <strong className="text-neutral-500">
                      {L.languages}:
                    </strong>{" "}
                    中文 / English (TEM-8)
                    <br />
                    <strong className="text-neutral-500">
                      {L.interests}:
                    </strong>{" "}
                    Web Development, Maps, Reusable UI
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute -bottom-3 right-6 opacity-60"
                  style={{ width: 75, height: 87 }}
                >
                  <Image
                    src="/images/fav_sheep.png"
                    alt="sheep"
                    fill
                    className="object-contain"
                  />
                </div>
              </ScrapbookCard>

              <ScrapbookCard title={L.skills} tapeVariant="pink">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 text-sm font-medium rounded-full bg-milktea-100 text-neutral-700 border border-milktea-300 hover:bg-rose-100 transition-colors"
                    >
                      {typeof skill === "string" ? skill : skill[lang]}
                    </div>
                  ))}
                </div>
              </ScrapbookCard>

              <ScrapbookCard title={L.work} tapeVariant="beige">
                <div className="space-y-6">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="relative pl-6">
                      <TimelineBar />
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="mb-0 text-lg font-semibold">
                          {typeof exp.company === "string"
                            ? exp.company
                            : exp.company[lang]}
                          {" — "}
                          {typeof exp.role === "string"
                            ? exp.role
                            : exp.role[lang]}
                        </h3>
                        <span className="text-sm text-neutral-500">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-neutral-700 mb-0">
                        {typeof exp.description === "string"
                          ? exp.description
                          : exp.description[lang]}
                      </p>
                      {Array.isArray((exp as any).projects) &&
                        (exp as any).projects.length > 0 && (
                          <div className="mt-3 space-y-4">
                            {(exp as any).projects.map((p: any, i: number) => (
                              <div
                                key={i}
                                className="pl-3 border-l border-slate-200"
                              >
                                <div className="flex justify-between items-start">
                                  <strong className="text-neutral-500">
                                    {"✎ "}
                                    {p.name[lang]}
                                  </strong>
                                  <span className="text-xs text-neutral-500">
                                    {p.period}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2 my-2">
                                  {p.tech.map(
                                    (
                                      t: { zh: string; en: string },
                                      j: number,
                                    ) => (
                                      <span
                                        key={j}
                                        className="px-2 py-1 text-xs rounded-full bg-white border border-neutral-300 text-neutral-700"
                                      >
                                        {t[lang]}
                                      </span>
                                    ),
                                  )}
                                </div>
                                <ul className="list-disc pl-5 text-neutral-700">
                                  {p.highlights[lang].map(
                                    (li: string, k: number) => (
                                      <li key={k} className="mb-1">
                                        {li}
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
                <div className="pointer-events-none absolute -bottom-4 right-5 opacity-60 w-12 h-12">
                  <Image
                    src="/images/phone-white.png"
                    alt="phone"
                    fill
                    className="object-contain"
                  />
                </div>
              </ScrapbookCard>

              <ScrapbookCard title={L.edu} tape tapeVariant="pink">
                <div className="space-y-6">
                  {education.map((edu, idx) => (
                    <div key={idx} className="relative pl-6">
                      <TimelineBar />
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="mb-1 text-lg font-semibold">
                          {typeof edu.degree === "string"
                            ? edu.degree
                            : edu.degree[lang]}
                        </h3>
                        <span className="text-sm text-neutral-500">
                          {edu.period}
                        </span>
                      </div>
                      <span className="mb-2 block bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent font-semibold">
                        {typeof edu.school === "string"
                          ? edu.school
                          : edu.school[lang]}
                      </span>
                      <p className="text-neutral-700 mb-0">
                        {typeof edu.description === "string"
                          ? edu.description
                          : edu.description[lang]}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrapbookCard>
              <ScrapbookCard
                title={L.journey}
                className="space-y-6 print:hidden"
                tapeVariant="beige"
              >
                <div className="mx-auto leading-8">
                  <GapMarkdown />
                </div>
              </ScrapbookCard>
            </section>
          </div>
        </div>
        <button
          aria-label="导出 PDF"
          title="导出 PDF"
          className="fixed print:hidden right-6 bottom-6 h-12 w-12 rounded-full bg-rose-600 text-white shadow-lg hover:bg-rose-700 focus:outline-none focus-visible:ring-2"
          onClick={() => typeof window !== "undefined" && window.print()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 mx-auto"
          >
            <path d="M6 9V2h12v7h2a2 2 0 012 2v6h-4v4H8v-4H4v-6a2 2 0 012-2h0zm2-5v5h8V4H8zm8 14H8v2h8v-2zM6 13h12v2H6v-2z" />
          </svg>
        </button>
      </main>
    </>
  );
}
