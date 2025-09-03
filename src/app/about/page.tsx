"use client";
import { Avatar, Segmented, Typography } from "antd";
import Image from "next/image";
import { useState } from "react";
import { skills } from "../components/PersonalIntro/constant";
import { education, experiences, labels } from "./constant";
import { GapMarkdown } from "./Gap";

// Shared types / utils
type Lang = "zh" | "en";

const HAND_FONT = {
  fontFamily:
    "'Caveat', 'Patrick Hand', 'Segoe UI', system-ui, -apple-system, sans-serif",
} as const;

const PAPER_BG_STYLE: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url('/textures/paper-fiber.png')",
  backgroundRepeat: "repeat",
  backgroundSize: "auto, 1024px 1024px",
};

const HERO_TITLE_STYLE: React.CSSProperties = {
  ...HAND_FONT,
  textShadow: "0.5px 0.5px 0.6px rgba(0,0,0,0.08)",
};

const { Title, Paragraph, Text } = Typography;

const Sticker = ({
  src,
  className,
  alt = "",
}: {
  src: string;
  className?: string;
  alt?: string;
}) => (
  <Image
    src={src}
    alt={alt}
    width={120}
    height={120}
    className={className || ""}
  />
);

const TAPE_SOURCES = {
  pink: "/tape/tape-pink.png",
  beige: "/tape/tape-beige.png",
  blue: "/tape/tape-blue.png",
} as const;

const STORY_LABELS: Record<Lang, { gap: string; major: string; now: string }> =
  {
    zh: { gap: "关于 Gap", major: "为什么选专业", now: "当下的思考" },
    en: {
      gap: "About the gap",
      major: "Why this major",
      now: "Current mindset",
    },
  };

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
        <Sticker
          src={tapeSrc}
          className="pointer-events-none absolute -top-3 left-6 -rotate-6 opacity-90 w-28 h-7"
          alt="tape"
        />
      )}

      {title && (
        <Title
          level={3}
          className="mb-6 text-xl font-semibold text-rose-700"
          style={HAND_FONT}
        >
          {title}
        </Title>
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
    <main className="about-page min-h-screen">
      <div className="container bg-milktea-100/90 border border-milktea-200 shadow-sm rounded-3xl mx-auto p-12 my-12 md:my-16 lg:my-20 bg-[url('/textures/paper-fiber.png')] bg-[length:1024px_1024px] bg-repeat">
        {/* Hero Section */}
        <div className="text-center mb-16 bg-milktea-50/85 border border-milktea-200 rounded-2xl p-6">
          <div className="flex justify-center gap-3 mb-4">
            <Segmented
              options={[
                { label: "中文", value: "zh" },
                { label: "EN", value: "en" },
              ]}
              value={lang}
              onChange={(val) => setLang(val as Lang)}
            />
          </div>
          <div className="relative inline-block mb-6">
            <Sticker
              src="/tape/white-bow.png"
              className="pointer-events-none absolute -top-6 left-1 -rotate-6 opacity-90 w-24 h-10"
              alt="bow"
            />
            <Avatar
              size={120}
              src="/images/me.png"
              className="border-4 border-white shadow-lg"
            />
          </div>
          <h1
            className="text-rose-600 text-4xl font-bold mb-4 tracking-wide"
            style={HERO_TITLE_STYLE}
          >
            {L.about}
          </h1>
          <Paragraph className="text-base leading-relaxed text-neutral-700/90 max-w-2xl mx-auto">
            Hi there! I&apos;m a passionate developer who loves creating
            beautiful and functional web experiences. I believe in writing
            clean, maintainable code and always learning new technologies.
          </Paragraph>
        </div>
        <div className="space-y-10 md:space-y-0 ">
          {/* Resume Section */}
          <section>
            <ScrapbookCard title={L.personal} tape tapeVariant="beige">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Text strong>{L.name}:</Text> 龚慧珏 / Floria
                  <br />
                  <Text strong>{L.location}:</Text> —
                  <br />
                  <Text strong>{L.email}:</Text> gwifloria@outlook.com
                  <br />
                  <Text strong>{L.available}:</Text> Full-time, Freelance
                </div>
                <div>
                  <Text strong>{L.experience}:</Text> 5+ years
                  <br />
                  <Text strong>{L.languages}:</Text> 中文 / English (TEM-8)
                  <br />
                  <Text strong>{L.interests}:</Text> Web Development, Maps,
                  Reusable UI
                </div>
              </div>
              <Sticker
                src="/tape/small-envelop.png"
                className="pointer-events-none absolute -bottom-3 right-6 opacity-60 w-16 h-10"
                alt="envelope"
              />
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
                      <Title level={4} className="mb-0 text-lg font-semibold">
                        {typeof exp.company === "string"
                          ? exp.company
                          : exp.company[lang]}
                        {" — "}
                        {typeof exp.role === "string"
                          ? exp.role
                          : exp.role[lang]}
                      </Title>
                      <Text type="secondary" className="text-sm">
                        {exp.period}
                      </Text>
                    </div>
                    <Paragraph className="text-neutral-700 mb-0">
                      {typeof exp.description === "string"
                        ? exp.description
                        : exp.description[lang]}
                    </Paragraph>
                    {Array.isArray((exp as any).projects) &&
                      (exp as any).projects.length > 0 && (
                        <div className="mt-3 space-y-4">
                          {(exp as any).projects.map((p: any, i: number) => (
                            <div
                              key={i}
                              className="pl-3 border-l border-slate-200"
                            >
                              <div className="flex justify-between items-start">
                                <Text strong className="text-neutral-800">
                                  {"✎ "}
                                  {p.name[lang]}
                                </Text>
                                <Text type="secondary" className="text-xs">
                                  {p.period}
                                </Text>
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
              <Sticker
                src="/tape/phone-white.png"
                className="pointer-events-none absolute -bottom-4 right-5 opacity-60 w-12 h-12"
                alt="phone"
              />
            </ScrapbookCard>

            <ScrapbookCard title={L.edu} tape tapeVariant="pink">
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6">
                    <TimelineBar />
                    <div className="flex justify-between items-start mb-2">
                      <Title level={4} className="mb-1 text-lg font-semibold">
                        {typeof edu.degree === "string"
                          ? edu.degree
                          : edu.degree[lang]}
                      </Title>
                      <Text type="secondary" className="text-sm">
                        {edu.period}
                      </Text>
                    </div>
                    <Text className="mb-2 block bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent font-semibold">
                      {typeof edu.school === "string"
                        ? edu.school
                        : edu.school[lang]}
                    </Text>
                    <Paragraph className="text-neutral-700 mb-0">
                      {typeof edu.description === "string"
                        ? edu.description
                        : edu.description[lang]}
                    </Paragraph>
                  </div>
                ))}
              </div>
            </ScrapbookCard>
            <ScrapbookCard
              title={L.journey}
              className="space-y-6"
              tapeVariant="beige"
            >
              <div className="mx-auto leading-8">
                <GapMarkdown />
              </div>
            </ScrapbookCard>
          </section>
        </div>
      </div>
    </main>
  );
}
