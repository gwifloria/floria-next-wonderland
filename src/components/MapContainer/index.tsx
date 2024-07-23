import React, { useEffect, useRef } from "react";
import mapboxgl, { MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useBarHidden } from "./useBarHidden";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useSWR } from "@/api/useFetch";

const MapContainer = ({
  clickEvent,
}: {
  clickEvent?: (e: MapMouseEvent) => void;
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef<mapboxgl.Map | undefined>();
  useBarHidden();

  const { data } = useSWR<{ mapKey: string }>("/floria-service/auth/info");

  useEffect(() => {
    if (!data) {
      return;
    }
    mapboxgl.accessToken = data.mapKey;

    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0, 0],
      zoom: 2,
    });

    mapRef.current.on("load", () => {
      if (!mapRef.current) {
        return;
      }
      mapRef.current.on("dblclick", (e) => {
        clickEvent && clickEvent(e);
      });

      mapRef.current.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          // @ts-ignore
          mapboxgl: mapboxgl,
        })
      );
    });
  }, [clickEvent, data]);

  return <div id="map" ref={mapContainerRef} style={{ height: "100%" }}></div>;
};

export default MapContainer;
