export type Category = "tech" | "life";
export type LabItemType = "bug" | "idea" | "issue";

export type LabEntry = {
  id: string;
  title: string;
  type: LabItemType;
  status: "open" | "thinking" | "resolved";
  tags?: string[];
  content: string;
  createdAt: string;
  category: Category;
};
