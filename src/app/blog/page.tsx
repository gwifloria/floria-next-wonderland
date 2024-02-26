'use client'
import { useBlogData } from "./useBlogData";
import { BlogItem } from "./BlogItem";

export default function Blog() {
    const data = useBlogData()

    return (<div className="blog-container justify-between">
        <div>blog</div>
        <div className="blog-list">
        {data?.map((blog) =>
            <BlogItem key={blog.id} blog={blog}></BlogItem>
        )}</div>
    </div>)
} 