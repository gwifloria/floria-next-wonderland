import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useRef } from "react";
import { useBarHidden } from "./useBarHidden";
import { useMapInstance } from "./useMapInstance";
import { useMapMarker } from "./useMapMarker";
import { Destination } from "@/types";

const MapContainer = ({
  clickEvent,
  markers,
}: {
  clickEvent?: (e: MapMouseEvent) => void;
  markers?: Destination[];
}) => {
  const { mapRef } = useMapInstance();
  const mapContainerRef = useRef(null);

  useBarHidden();

  const ele = useMapMarker(mapRef.current, markers);

  const listener = useCallback(
    (e: MapMouseEvent) => {
      clickEvent && clickEvent(e);
    },
    [clickEvent],
  );

  useEffect(() => {
    const ref = mapRef?.current;
    if (!ref) {
      return;
    }
    ref?.on("dblclick", listener);

    return () => {
      ref?.off("dblclick", listener);
    };
  }, [listener, mapRef]);

  return (
    <>
      <div id="map" ref={mapContainerRef} style={{ height: "100%" }}></div>
      {ele}
    </>
  );
};

export default MapContainer;
