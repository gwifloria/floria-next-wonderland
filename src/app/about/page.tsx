"use client";
import withTheme from "@/theme";
import { Avatar, Segmented, Typography } from "antd";
import { useState } from "react";
import { skills } from "../components/PersonalIntro/constant";
import { education, experiences, labels, personalStory } from "./constant";

const { Title, Paragraph, Text } = Typography;

const STORY_LABELS: Record<
  "zh" | "en",
  { gap: string; major: string; now: string }
> = {
  zh: { gap: "关于 Gap", major: "为什么选专业", now: "当下的思考" },
  en: { gap: "About the gap", major: "Why this major", now: "Current mindset" },
};

type CardSectionProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const CardSection = ({ title, children, className = "" }: CardSectionProps) => (
  <div
    className={`p-6 bg-rose-100 backdrop-blur-sm shadow-lg rounded-3xl mb-10 ${className}`}
  >
    {title && (
      <Title level={3} className="mb-6 text-xl font-semibold">
        {title}
      </Title>
    )}
    {children}
  </div>
);

const AboutMePage = () => {
  const [lang, setLang] = useState<"zh" | "en">("zh");

  return (
    <main className="about-page min-h-screen">
      <div className="container bg-white rounded-3xl mx-auto px-4 py-8 my-12 md:my-16 lg:my-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Segmented
              options={[
                { label: "中文", value: "zh" },
                { label: "EN", value: "en" },
              ]}
              value={lang}
              onChange={(val) => setLang(val as "zh" | "en")}
            />
          </div>
          <Avatar
            size={120}
            src="/images/me.png"
            className="mb-6 border-4 border-white shadow-lg"
          />
          <h1 className="text-rose-400 text-4xl font-bold mb-4 bg-clip-text ">
            {labels[lang].about}
          </h1>
          <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hi there! I&apos;m a passionate developer who loves creating
            beautiful and functional web experiences. I believe in writing
            clean, maintainable code and always learning new technologies.
          </Paragraph>
        </div>

        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-10">
          {/* Resume Section */}
          <section>
            <Title
              level={2}
              className="mb-6 text-2xl font-semibold bg-gradient-to-r bg-clip-text"
            >
              {labels[lang].resume}
            </Title>

            <CardSection title={labels[lang].personal}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Text strong>{labels[lang].name}:</Text> 龚慧珏 / Floria
                  <br />
                  <Text strong>{labels[lang].location}:</Text> —
                  <br />
                  <Text strong>{labels[lang].email}:</Text>{" "}
                  gwifloria@outlook.com
                  <br />
                  <Text strong>{labels[lang].available}:</Text> Full-time,
                  Freelance
                </div>
                <div>
                  <Text strong>{labels[lang].experience}:</Text> 5+ years
                  <br />
                  <Text strong>{labels[lang].languages}:</Text> 中文 / English
                  (TEM-8)
                  <br />
                  <Text strong>{labels[lang].interests}:</Text> Web Development,
                  Maps, Reusable UI
                </div>
              </div>
            </CardSection>

            <CardSection title={labels[lang].skills}>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r bg-rose-300 text-white"
                  >
                    {typeof skill === "string" ? skill : skill[lang]}
                  </div>
                ))}
              </div>
            </CardSection>

            <CardSection title={labels[lang].work}>
              <div className="space-y-6">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-gradient-to-b from-[#d8b4a6] to-[#c1a192]" />
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
                    <Paragraph className="text-gray-600 mb-0">
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
                                <Text strong className="text-slate-800">
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
                                      className="px-2 py-1 text-xs rounded-full bg-white border border-slate-300 text-slate-700"
                                    >
                                      {t[lang]}
                                    </span>
                                  ),
                                )}
                              </div>
                              <ul className="list-disc pl-5 text-slate-700">
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
            </CardSection>

            <CardSection title={labels[lang].edu}>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-gradient-to-b from-[#d8b4a6] to-[#c1a192]" />
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
                    <Text className="mb-2 block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
                      {typeof edu.school === "string"
                        ? edu.school
                        : edu.school[lang]}
                    </Text>
                    <Paragraph className="text-gray-600 mb-0">
                      {typeof edu.description === "string"
                        ? edu.description
                        : edu.description[lang]}
                    </Paragraph>
                  </div>
                ))}
              </div>
            </CardSection>
            {/* 
            <CardSection title={labels[lang].connect} className=" mb-0">
              <div className="flex justify-center space-x-6">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-700 hover:text-purple-500 transition-colors"
                >
                  <GithubOutlined />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-700 hover:text-purple-500 transition-colors"
                >
                  <LinkedinOutlined />
                </a>
                <a
                  href="mailto:gwifloria@outlook.com"
                  className="text-2xl text-gray-700 hover:text-purple-500 transition-colors"
                >
                  <MailOutlined />
                </a>
              </div>
              <Divider />
              <div className="text-center">
                <Text className="text-gray-500">
                  Made with <HeartOutlined className="text-red-500 mx-1" />{" "}
                  using Next.js & Ant Design
                </Text>
              </div>
            </CardSection> */}
          </section>
          {/* Brief Introduction Section */}
          <section>
            <CardSection title={labels[lang].journey} className="mb-8 md:mb-0">
              <div className="space-y-5 text-gray-700">
                <div>
                  <Text strong className="block mb-1">
                    {STORY_LABELS[lang].gap}
                  </Text>
                  <Paragraph className="mb-0">
                    {personalStory.gapReason[lang]}
                  </Paragraph>
                </div>
                <div>
                  <Text strong className="block mb-1">
                    {STORY_LABELS[lang].major}
                  </Text>
                  <Paragraph className="mb-0">
                    {personalStory.whyMajor[lang]}
                  </Paragraph>
                </div>
                <div>
                  <Text strong className="block mb-1">
                    {STORY_LABELS[lang].now}
                  </Text>
                  <Paragraph className="mb-0">
                    {personalStory.careerThoughts[lang]}
                  </Paragraph>
                </div>
              </div>
            </CardSection>
          </section>
        </div>
      </div>
    </main>
  );
};

const AboutPage = () => withTheme(<AboutMePage />);
export default AboutPage;
