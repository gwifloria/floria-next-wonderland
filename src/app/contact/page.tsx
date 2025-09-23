import { labels } from "./constant";
import { GapMarkdown } from "./Gap";
import "./print.css";

// Components
import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { HeroSection } from "./components/HeroSection";
import { PaperContainer } from "./components/PaperContainer";
import { PersonalInfoSection } from "./components/PersonalInfoSection";
import { ScrapbookCard } from "./components/ScrapbookCard";
import { SkillsSection } from "./components/SkillsSection";
import { PrintButton } from "./PrintButton";
import { getTapeVariant } from "./utils";

export default function AboutMePage() {
  const lang = "zh";
  const L = labels[lang];

  return (
    <>
      <main id="about" className="about-page min-h-screen">
        <PaperContainer>
          <HeroSection lang={lang} />

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
        <PrintButton></PrintButton>
      </main>
    </>
  );
}
