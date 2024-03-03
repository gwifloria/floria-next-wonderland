import Image from "next/image";

export function PortfolioImageContainer({ src }: { src: string }) {
  return (
    <Image
      className="relative rounded-lg border-4 "
      alt={src}
      src={src}
    ></Image>
  );
}
