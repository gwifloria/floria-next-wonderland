import { Destination } from "@/types";
import mapboxgl, { Marker } from "mapbox-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMarkerEle } from "./useMapImageMarker";

export const useMapMarker = (map?: mapboxgl.Map, data?: Destination[]) => {
  const { d, dom } = useMarkerEle();
  const [markers, setMarkers] = useState<Marker[]>();
  const ele = d?.current;

  useEffect(() => {
    console.log(ele);
    if (!ele) {
      return;
    }
    const markers = data?.map((i) =>
      new mapboxgl.Marker({ element: ele }).setLngLat([
        Number(i.longitude),
        Number(i.latitude),
      ]),
    );
    setMarkers(markers);
  }, [data, ele]);

  useEffect(() => {
    if (!map) return;
    markers?.forEach((i) => i.addTo(map));
    return () => markers?.forEach((i) => i.remove());
  }, [map, markers]);

  return dom;
};
