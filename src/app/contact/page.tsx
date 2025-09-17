"use client";
import { useState } from "react";
import { labels } from "./constant";
import { GapMarkdown } from "./Gap";
import "./print.css";

// Components
import { PaperContainer } from "./components/PaperContainer";
import { HeroSection } from "./components/HeroSection";
import { ScrapbookCard } from "./components/ScrapbookCard";
import { PersonalInfoSection } from "./components/PersonalInfoSection";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { EducationSection } from "./components/EducationSection";
import { getTapeVariant } from "./utils";

type Lang = "zh" | "en";

export default function AboutMePage() {
  const [lang, setLang] = useState<Lang>("zh");
  const L = labels[lang];

  return (
    <>
      <main className="about-page min-h-screen">
        <PaperContainer>
          <HeroSection lang={lang} onLanguageChange={setLang} />

          <div className="space-y-10 md:space-y-0">
            <section>
              <ScrapbookCard title={L.personal} tapeVariant={getTapeVariant(0)}>
                <PersonalInfoSection lang={lang} />
              </ScrapbookCard>

              <ScrapbookCard title={L.skills} tapeVariant={getTapeVariant(1)}>
                <SkillsSection lang={lang} />
              </ScrapbookCard>

              <ScrapbookCard title={L.work} tapeVariant={getTapeVariant(2)}>
                <ExperienceSection lang={lang} />
              </ScrapbookCard>

              <ScrapbookCard title={L.edu} tapeVariant={getTapeVariant(3)}>
                <EducationSection lang={lang} />
              </ScrapbookCard>

              <ScrapbookCard
                title={L.journey}
                className="space-y-6 print:hidden"
                tapeVariant={getTapeVariant(4)}
              >
                <div className="mx-auto leading-8">
                  <GapMarkdown />
                </div>
              </ScrapbookCard>
            </section>
          </div>
        </PaperContainer>
        <button
          aria-label="导出 PDF"
          title="导出 PDF"
          className="fixed print:hidden right-6 bottom-6 h-10 w-10 rounded-full bg-rose-600 text-white shadow-lg hover:bg-rose-700 focus:outline-none focus-visible:ring-2 z-50"
          onClick={() => typeof window !== "undefined" && window.print()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 mx-auto"
          >
            <path d="M6 9V2h12v7h2a2 2 0 012 2v6h-4v4H8v-4H4v-6a2 2 0 012-2h0zm2-5v5h8V4H8zm8 14H8v2h8v-2zM6 13h12v2H6v-2z" />
          </svg>
        </button>
      </main>
    </>
  );
}
