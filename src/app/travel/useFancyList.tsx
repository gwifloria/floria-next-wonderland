import { Destination } from "@/types";

export const useFancyList = (data?: Destination[]) => {
  return (
    <div className="fancy-container">
      {data?.map((d, i) => <div key={i}>{d.destination}</div>)}
    </div>
  );
};
