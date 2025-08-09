export type Category = "tech" | "life";
export type LabItemType = "bug" | "idea" | "issue";
export type LabItemStatus = "open" | "thinking" | "resolved";
export type LabEntry = {
  id: string;
  title: string;
  type: LabItemType;
  status: LabItemStatus;
  tags?: string[];
  content: string;
  createdAt: string;
  category: Category;
};
