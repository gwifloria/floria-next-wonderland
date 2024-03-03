import generateMockData from "./mockdata";

export const useBlogData = () => {
  const res = generateMockData();
  return res.blog;
};
