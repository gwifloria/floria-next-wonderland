"use client";
import { usePathname, useRouter } from "next/navigation";

const I18nControl = () => {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (lng: string) => {
    if (!pathname) return;
    // Assumes your routes are /en/xxx or /zh/xxx
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "en" || segments[0] === "zh") {
      segments[0] = lng;
    } else {
      segments.unshift(lng);
    }
    const newPath = "/" + segments.join("/");
    router.push(newPath);
  };

  return (
    <div style={{ marginLeft: 16 }}>
      <button onClick={() => changeLanguage("en")}>EN</button>
      <button onClick={() => changeLanguage("zh")} style={{ marginLeft: 8 }}>
        中文
      </button>
    </div>
  );
};

export default I18nControl;
