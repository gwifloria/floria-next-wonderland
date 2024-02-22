import { personalDescriptions, skills } from "./constant";
import "./index.scss";
import { JumpingFlags } from "./JumpingFlags";
import Image from "next/image";
import mePng from "/public/images/me.png";

export const PersonalIntroduction = () => {
  return (
    <div className="personal-introduction__container in-h-screen">
      <div className="container">
        <JumpingFlags />
      </div>
      <div className="container flex flex-row py-16 items-center justify-between ">
        <div className="col-span-2 mr-16">
          <div className="brief-intro sm:text-xl md:text-2xl">
            <span>Hi, I&lsquo;m Jasmine Gong</span>
            <span>I am a Front End Developer</span>
          </div>
          <div className="detail-info sm:text-lg md:text-xl">
            {personalDescriptions?.map((content, i) => (
              <div key={i}>{content}</div>
            ))}
          </div>
        </div>
        <div className="col-span-6">
          <Image priority alt="jasmine" src={mePng}></Image>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-12 ">
        {skills.map((skill, index) => (
          <div className="py-16 text-lg sm:text-2xl skill-card" key={index}>
            {skill}
          </div>
        ))}
      </div>
      <div className="intro-footer py-8">Let’s keep in touch.🐶</div>
    </div>
  );
};
