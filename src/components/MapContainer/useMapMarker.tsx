import { MapDestinationMarker } from "@/types";
import mapboxgl, { Marker } from "mapbox-gl";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { first } from "lodash";

export const useMapMarker = (
  map?: mapboxgl.Map,
  data?: MapDestinationMarker[],
) => {
  const [markers, setMarkers] = useState<Marker[]>();

  const getImageDom = (image: StaticImageData) => {
    const div = document.createElement("div");
    div.className = "rounded-full border-2 border-inherit	border-solid";
    const img = document.createElement("img");
    img.className = "rounded-full h-24 w-24";
    img.src = image.src;
    div.appendChild(img);
    return div;
  };

  useEffect(() => {
    const markers = data?.map((i) => {
      const firstImage = first(i.gitImages);
      return new mapboxgl.Marker({
        element: getImageDom(firstImage!.url),
      }).setLngLat([Number(i.longitude), Number(i.latitude)]);
    });

    setMarkers(markers);
  }, [data]);

  useEffect(() => {
    if (!map) return;
    markers?.forEach((i) => {
      i.addTo(map);
    });
    return () => markers?.forEach((i) => i.remove());
  }, [map, markers]);
};
