"use client";
import "animate.css";
import classNames from "classnames";
import { useRef, useState } from "react";
import { useDebounce, useIntersection, useThrottleFn } from "react-use";
import { BlogItemIF } from "../type";
import "./index.scss";

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
  return (
    <div
      ref={ref}
      className={`animate__animated ${claZZ} bg-mint-200 py-4 rounded-md px-6 my-8 br-16`}
    >
      <span className="block text-lg font-medium">{blog.title}</span>
      <span className="block my-2">{blog.content}</span>
      <span>{blog.date}</span>
    </div>
  );
};
