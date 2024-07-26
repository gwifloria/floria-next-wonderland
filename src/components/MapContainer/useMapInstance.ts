import { useSWR } from "@/api/useFetch";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl, { IControl } from "mapbox-gl";
import { useEffect, useRef } from "react";

export const useMapInstance = () => {
  const mapRef = useRef<mapboxgl.Map | undefined>();

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

    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0, 0],
      zoom: 2,
    });

    mapRef.current.on("load", () => {
      if (!mapRef.current || !mapSearchRef.current) {
        return;
      }

      mapRef.current.addControl(mapSearchRef.current);
    });

    return () => {
      mapSearchRef?.current &&
        mapRef.current?.removeControl(mapSearchRef.current);
    };
  }, [mapKeyData]);

  return {
    mapRef,
  };
};
