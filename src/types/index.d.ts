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
  skills: string[];
}
export interface Destination {
  longitude: string;
  latitude: string;
  destination: string;
  visited: boolean;
  isDomestic: boolean;
}
