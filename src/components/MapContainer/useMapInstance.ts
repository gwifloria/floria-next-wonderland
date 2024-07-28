import { useSWR } from "@/api/useFetch";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl, { IControl } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

export const useMapInstance = () => {
  const mapContainerRef = useRef(null);
  const [mapE, setMap] = useState<mapboxgl.Map | undefined>();

  const mapSearchRef = useRef<IControl>();

  const { data: mapKeyData } = useSWR<{ mapKey: string }>(
    "/floria-service/auth/info",
  );
  useEffect(() => {
    if (!mapKeyData) {
      return;
    }

    const geocoder = new MapboxGeocoder({
      accessToken: mapKeyData.mapKey,
      // @ts-ignore
      mapboxgl: mapboxgl,
    });
    mapSearchRef.current = geocoder;
  }, [mapKeyData]);

  useEffect(() => {
    if (!mapKeyData) {
      return;
    }

    mapboxgl.accessToken = mapKeyData.mapKey;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0, 0],
      zoom: 2,
    });

    map.on("load", () => {
      if (!mapSearchRef.current) {
        return;
      }

      map.addControl(mapSearchRef.current);
    });
    setMap(map);

    return () => {
      mapSearchRef?.current && map?.removeControl(mapSearchRef.current);
    };
  }, [mapKeyData]);

  return {
    mapContainerRef,
    mapE,
  };
};
