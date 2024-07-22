import { useEffect } from "react";

const eleName = "mapboxgl-ctrl-attrib-inner";
export const useBarHidden = () => {
  useEffect(() => {
    console.log(66);
    const elements = document.getElementsByClassName(eleName);
    Array.from(elements).forEach((ele: any) => {
      ele.style.visibility = "hidden";
      const a = ele.getElementsByTagName("a");
      console.log(ele, a);
      Array.from(a).forEach((i: any) => (i.style.visibility = "hidden"));
    });
  }, []);
};
