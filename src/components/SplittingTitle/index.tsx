import { ReactNode, useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "./index.scss";
import classNames from "classnames";

interface SplittingProps {
  children: string | ReactNode;
}
const SplittingTitle = (props: SplittingProps) => {
  const { children } = props;
  const ref = useRef<HTMLDivElement>(null);

  const root = document.getElementById("content-container");

  const intersection = useIntersection(ref, {
    root: root,
    rootMargin: "20px",
    threshold: 1,
  });

  const claZZ = classNames(
    "splitting-title",
    intersection?.isIntersecting ? "in" : "out"
  );

  useEffect(() => {
    Splitting({
      /* target: String selector, Element, Array of Elements, or NodeList */
      // @ts-ignore
      target: ref.current,
      /* by: String of the plugin name */
      by: "chars",
      // /* key: Optional String to prefix the CSS variables */
      key: null,
    });
  }, []);

  return (
    <div className={claZZ} ref={ref} data-splitting>
      {children}
    </div>
  );
};
export default SplittingTitle;
