export type PageRoute =
  | "blog"
  | "letters"
  | "contact"
  | "tools"
  | "space"
  | "lab"
  | "travel"
  | "dance";

type PartialRouteMap<T> = Partial<Record<PageRoute, T>>;

export const routes: PartialRouteMap<string> = {
  blog: "✏️",
  letters: "📬",
  lab: "🧪",
  contact: "👋",
};

export const hiddenRoutes = ["tools", "space", "travel", "dance"];

export const routeLabels: PartialRouteMap<string> = {
  blog: "Blog",
  letters: "Letters",
  contact: "Contact",
  tools: "Tools",
  space: "Space",
  lab: "Lab",
  travel: "Travel",
  dance: "Dance",
};
