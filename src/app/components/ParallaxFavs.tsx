"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

const favImgs = [
  "/images/fav_arrow.png",
  "/images/fav_camera.png",
  "/images/fav_clock.png",
  "/images/fav_coffee.png",
  "/images/fav_sheep.png",
  "/images/fav_teddy.png",
];

const speeds = [0.3, 0.5, 0.7, 0.4, 0.6, 0.8];

const ParallaxFavs: React.FC = () => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      refs.current.forEach((div, i) => {
        if (div) {
          div.style.transform = `translateY(${-scrollY * speeds[i]}px)`;
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {favImgs.map((src, i) => (
        <div
          key={src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          style={{
            position: "absolute",
            left: `${10 + i * 15}%`,
            top: `18%`, // All icons at similar vertical position
            width: 80,
            opacity: 0.7,
            filter: "drop-shadow(0 2px 8px #b5f5ec)",
            transition: "transform 0.2s cubic-bezier(.4,2,.6,1)",
            pointerEvents: "none",
          }}
        >
          <Image
            src={src}
            alt="fav"
            width={60}
            height={60}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      ))}
    </div>
  );
};

export default ParallaxFavs;
