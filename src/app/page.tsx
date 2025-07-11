"use client";
import { PersonalIntroduction } from "@/components/PersonalIntro";
import ParallaxFavs from "@/components/ParallaxFavs";
import HeroSection from "@/components/HeroSection";
import { AuthProvider } from "@/context";
import { StyleProvider } from "@ant-design/cssinjs";
import { useEffect } from "react";

export default function Home() {
  // useWebVital();

  return (
    <StyleProvider hashPriority="high">
      <AuthProvider>
        <main className="flex min-h-screen flex-col items-center justify-between ">
          <ParallaxFavs />
          <HeroSection />
          <PersonalIntroduction />
        </main>
      </AuthProvider>
    </StyleProvider>
  );
}
