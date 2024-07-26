import { useRef } from "react";
import Image from "next/image";
import pu from "/public/images/phuket.jpg";

export const useMarkerEle = () => {
  const d = useRef<HTMLDivElement>();

  const dom = (
    <div style={{ visibility: "hidden" }}>
      <div className="rounded-full border-2 border-inherit	border-solid" ref={d}>
        <Image className="rounded-full h-24 w-24" alt="" src={pu} />
      </div>
    </div>
  );

  return { dom, d };
};
