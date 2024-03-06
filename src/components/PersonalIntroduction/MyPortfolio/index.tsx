import { projectExperienceList } from "@/constants/projectExperience";
import { PortfolioImageContainer } from "./PortfolioImageContainer";
import "./index.scss";

const data = projectExperienceList.map((project) => ({
  ...project,
  title: `${project.projectName}`,
  description: project.projectBackground,
  content: project.details,
}));

export const MyPortfolio: React.FC = () => (
  <div id="portfolio" className="work-experience--container">
    {projectExperienceList.map((ex) => {
      return (
        <div
          key={ex.projectName}
          className="p-6 my-12 shadow-lg grid grid-cols-2 gap-4 border-4 border-nepal-300 rounded-md"
        >
          <div className="text-2xl">
            {ex.projectBackground}
            <div className="flex flex-wrap mt-6">
              {ex.skills.map((sk) => (
                <div
                  className="text-xl border-2 m-2 bg-rose-100 border-rose-200  text-rose-300 rounded-3xl py-2 px-4"
                  key={sk}
                >
                  {sk}
                </div>
              ))}
            </div>
          </div>
          <div className="relative width-50">
            <PortfolioImageContainer
              src={ex.pictures[0]}
            ></PortfolioImageContainer>
          </div>
        </div>
      );
    })}
  </div>
);
