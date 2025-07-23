"use client";
import { useState, useEffect } from "react";

const themes = [
  { name: "Light", class: "theme-light" },
  { name: "Pastel", class: "theme-pastel" },
  { name: "Dark", class: "theme-dark" },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(0);

  useEffect(() => {
    document.body.classList.remove(...themes.map((t) => t.class));
    document.body.classList.add(themes[theme].class);
  }, [theme]);

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white/80 rounded-full shadow-lg px-3 py-2 border border-mint-200 backdrop-blur-md">
      {themes.map((t, i) => (
        <button
          key={t.name}
          className={`px-3 py-1 rounded-full font-bold text-xs transition-all duration-200 ${theme === i ? "bg-mint-200 text-mint-900" : "bg-white text-mint-500 hover:bg-mint-100"}`}
          onClick={() => setTheme(i)}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}
