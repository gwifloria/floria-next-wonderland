import type { CollapseProps } from "antd";

type VisionItem = CollapseProps["items"];

export interface VisionItemProps extends Omit<VisionItem, "children"> {
  children: string[];
  label: string;
}

export const visionTags = [
  "💃Dance",
  "💼Career",
  "🍷Lifestyle",
  "😎Hobbies",
  "👭Social",
  "✈️Travel",
  "📑Knowledge",
];

export const weekVisions: VisionItemProps[] = visionTags.map((i) => {
  return {
    label: i,
    children: [],
  };
});
