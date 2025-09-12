export type PageRoute =
  | "blog"
  | "letters"
  | "about"
  | "forum"
  | "tools"
  | "space"
  | "lib"
  | "travel"
  | "dance";

type PartialRouteMap<T> = Partial<Record<PageRoute, T>>;

export const routes: PartialRouteMap<string> = {
  blog: "✏️",
  letters: "📬",
  about: "👋",
  forum: "💬",
};

export const hiddenRoutes = [
  "tools",
  "space",
  "lib",
  "travel",
  "dance",
  "about",
];
