import { personalDescriptions, skills } from "./constant";
import "./index.scss";
import { JumpingFlags } from "./JumpingFlags";
import Image from "next/image";
import mePng from "@/assets/me.png";

export const PersonalIntroduction = () => {
  return (
    <div className="personal-introduction__container">
      <div className="container">
        <JumpingFlags />
      </div>
      <div className="flex min-h-screen items-center justify-between ">
        <div>
          <div className="brief-intro">
            <span>Hi, I&lsquo;m Jasmine Gong</span>
            <span>I am a Front End Developer</span>
          </div>
          <div className="detail-info">
            {personalDescriptions?.map((content, i) => (
              <div key={i}>{content}</div>
            ))}
          </div>
        </div>
        <Image alt="jasmine" src={mePng}></Image>
      </div>

      <div className="skills flex ">
        {skills.map((skill, index) => (
          <div className="grid grid-cols-3 gap-3 p-24" skill-card key={index}>
            {skill}
          </div>
        ))}
      </div>

      <div className="intro-footer">Let’s keep in touch.🐶</div>
    </div>
  );
};
