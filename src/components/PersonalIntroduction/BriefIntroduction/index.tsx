import { personalDescriptions } from "../constant";

export function BriefIntroduction() {
  return (
    <div
      id="introduction"
      className="container flex flex-row py-16 items-center justify-between "
    >
      <div className="col-span-2 mr-16">
        <div className="brief-intro sm:text-xl md:text-2xl">
          <div>Hi, this is Gwi Floria</div>
        </div>
        <div className="mt-8 content-container detail-info sm:text-lg md:text-xl">
          {personalDescriptions?.map((content, i) => (
            <div key={i}>{content}</div>
          ))}
        </div>
      </div>
      <div className="col-span-6">
        {/* <Image priority alt="jasmine" src={mePng}></Image> */}
      </div>
    </div>
  );
}
