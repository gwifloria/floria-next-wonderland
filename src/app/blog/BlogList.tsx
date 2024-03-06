import { useSWR } from "@/api/useFetch";
import { BlogItem } from "./BlogItem";
import { BlogItemIF } from "./type";
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
