import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useRef } from "react";
import { useBarHidden } from "./useBarHidden";
import { useMapInstance } from "./useMapInstance";
import { useMapMarker } from "./useMapMarker";
import { Destination } from "@/types";

interface MapContainerProps {
  markers?: Destination[];
  dbclickEvent?: (e: MapMouseEvent) => void;
}

const MapContainer = ({ markers, dbclickEvent }: MapContainerProps) => {
  const { mapContainerRef, mapE } = useMapInstance();

  useBarHidden();

  useMapMarker(mapE, markers);

  const dblistener = useCallback(
    (e: MapMouseEvent) => {
      dbclickEvent && dbclickEvent(e);
    },
    [dbclickEvent],
  );

  useEffect(() => {
    const ref = mapE;

    if (!ref) {
      return;
    }
    ref?.on("dblclick", dblistener);

    return () => {
      ref?.off("dblclick", dblistener);
    };
  }, [dblistener, mapE]);

  return (
    <>
      <div id="map" ref={mapContainerRef} style={{ height: "100%" }}></div>
    </>
  );
};

export default MapContainer;
