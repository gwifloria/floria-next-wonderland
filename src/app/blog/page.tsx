import { MdxPost } from "./MdxPost";
import { Sidebar } from "./SideBar";

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawPost = Array.isArray(params?.post) ? params?.post[0] : params?.post;
  const activePost = rawPost ? decodeURIComponent(rawPost) : "";

  return (
    <div className="flex max-h[calc(100vh-2rem)]">
      <Sidebar activePost={activePost} />
      <main className="flex-1 max-w-6xl mx-auto my-4 bg-white rounded-2xl shadow-lg px-4 py-8 max-h-[calc(100vh-10rem)] overflow-auto">
        <MdxPost path={activePost} />
      </main>
    </div>
  );
}
