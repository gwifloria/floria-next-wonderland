import { labels, DECORATION_IMAGES, DECORATION_SIZES } from "../constant";
import { getLocalizedText } from "../utils";
import { FloatingDecoration } from "./FloatingDecoration";

type Lang = "zh" | "en";

interface PersonalInfoSectionProps {
  lang: Lang;
}

export function PersonalInfoSection({ lang }: PersonalInfoSectionProps) {
  const L = labels[lang];

  return (
    <div className="relative">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <strong className="text-neutral-500">{L.name}:</strong> 龚慧珏 /
          Floria
          <br />
          <strong className="text-neutral-500">{L.location}:</strong> —
          <br />
          <strong className="text-neutral-500">{L.email}:</strong>{" "}
          gwifloria@outlook.com
          <br />
          <strong className="text-neutral-500">{L.available}:</strong>{" "}
          Full-time, Freelance
        </div>
        <div>
          <strong className="text-neutral-500">{L.experience}:</strong> 5+ years
          <br />
          <strong className="text-neutral-500">{L.languages}:</strong> 中文 /
          English (TEM-8)
          <br />
          <strong className="text-neutral-500">{L.interests}:</strong> Web
          Development, Maps, Reusable UI
        </div>
      </div>

      <FloatingDecoration
        src={DECORATION_IMAGES.favSheep}
        alt="sheep"
        width={DECORATION_SIZES.sheep.width}
        height={DECORATION_SIZES.sheep.height}
        className="-bottom-3 right-6"
      />
    </div>
  );
}
