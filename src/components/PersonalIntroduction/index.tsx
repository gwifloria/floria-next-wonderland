"use client";
import { DivideTitle } from "./DivideTitle";
import { MyPortfolio } from "./MyPortfolio";
import { BriefIntroduction } from "./BriefIntroduction";
import { JumpingFlags } from "./JumpingFlags";
import { personalDescriptions, skills } from "./constant";
import "./index.scss";
import { useSWRMutation } from "@/api/useFetch";

export const PersonalIntroduction = () => {
  return (
    <div className="personal-introduction__container min-h-screen py-16">
      <div className="container">
        <JumpingFlags />
      </div>

      <BriefIntroduction></BriefIntroduction>

      <DivideTitle title="Portfolio"></DivideTitle>
      <MyPortfolio></MyPortfolio>

      <div className="intro-footer py-8">Let’s keep in touch.🐶</div>
    </div>
  );
};
