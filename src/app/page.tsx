import HeroSection from "@/app/components/HeroSection";
import ParallaxFavs from "@/app/components/ParallaxFavs";
import SayHiButton from "@/app/components/SayHiButton";
import PersonalIntroduction from "./components/PersonalIntro";

export default function HomeContainer() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-xl p-2 sm:p-8 md:p-12 lg:p-16 my-8 border-2 border-mint-100/40">
        <ParallaxFavs />
        <HeroSection />
      </div>
      <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-md p-2 sm:p-8 md:p-12 lg:p-16 my-8 border border-mint-100/30">
        <PersonalIntroduction />
      </div>
      <SayHiButton />
    </main>
  );
}
