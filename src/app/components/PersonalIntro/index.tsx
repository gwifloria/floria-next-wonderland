"use client";
import { DivideTitle } from "./DivideTitle";
import { MyPortfolio } from "./MyPortfolio";
import "./index.scss";

export const PersonalIntroduction = () => {
  return (
    <div className="personal-introduction__container min-h-screen py-16">
      <DivideTitle title="Portfolio"></DivideTitle>
      <MyPortfolio></MyPortfolio>

      <div className="intro-footer py-8">Let’s keep in touch.🐶</div>
    </div>
  );
};
