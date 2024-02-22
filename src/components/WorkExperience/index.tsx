import "./index.scss";
import { projectExperienceList } from "@/constants/projectExperience";

const data = projectExperienceList.map((project) => ({
  ...project,
  title: `${project.projectName}`,
  description: project.projectBackground,
  content: project.details,
}));

export const WorkExperience: React.FC = () => (
  <div className="work-experience--container"></div>
);
