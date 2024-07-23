import { useSWR } from "@/api/useFetch";
import { BlogItem } from "./BlogItem";
import { BlogItemIF } from "./type";
import MarkdownViewer from "./MarkdownViewer";
export const BlogList = () => {
  const { data } = useSWR<{ blogs: BlogItemIF[] }>(
    "/floria-service/excerpt/list"
  );
  return (
    <>
      {data?.blogs?.map((blog) => (
        <BlogItem key={blog.id} blog={blog}></BlogItem>
      ))}
    </>
  );
};
