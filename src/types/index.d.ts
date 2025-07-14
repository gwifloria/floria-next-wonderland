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
  imgUrl?: string;
}
export interface GitItem {
  download_url: string;
  git_url: string;
  html_url: string;
  name: string;
  path: string;
  sha: string;
  size: number;
  type: string;
  url: StaticImageData;
  _links: {
    git: string;
    html: string;
    self: string;
  };
}
export interface MapDestinationMarker extends Destination {
  gitImages?: GitItem[];
}
