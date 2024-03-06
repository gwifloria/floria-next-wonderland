"use client";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import "animate.css";
import classNames from "classnames";
import { useRef } from "react";
import { useIntersection } from "react-use";
import { BlogItemIF } from "../type";
import "./index.scss";
import { useSWRMutation } from "@/api/useFetch";

export const BlogItem = ({ blog }: { blog: BlogItemIF }) => {
  const ref = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(ref, {
    rootMargin: "0px",
    threshold: 0,
  });

  const claZZ = classNames(
    "blog-item",
    intersection?.isIntersecting ? "animate__fadeIn" : "animate__fadeOut"
  );

  const { trigger } = useSWRMutation("/floria-service/excerpt/delete", {
    method: "POST",
  });

  const handleDelete = () => {
    trigger({ id: blog.id });
  };

  return (
    <div
      ref={ref}
      className={`animate__animated ${claZZ} flex flex-1 justify-between items-center bg-mint-200 py-4 rounded-md px-6 my-8 br-16`}
    >
      <div>
        <span className="block my-2">{blog.content}</span>
        <span className="block text-lg text-right font-medium">
          {blog.bookName}
        </span>
      </div>

      <div onClick={handleDelete} className="ml-4 ">
        <EditOutlined style={{ color: "#FFF" }} />
        <CloseOutlined style={{ color: "#FFF" }} />
      </div>
    </div>
  );
};
