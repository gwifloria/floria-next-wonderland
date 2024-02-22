export interface WorkHistoryProps {
  companyName: string;
  responsibilities: string[];
  startTime: string;
  endTime?: string;
}

export interface ProjectExperienceProps {
  projectName: string;
  projectBackground: string;
  details: string[];
  pictures: StaticImageData[];
}
