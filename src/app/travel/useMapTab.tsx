"use client";
import MapContainer from "@/components/MapContainer";
import { MapDestinationMarker } from "@/types";
import { MapMouseEvent } from "mapbox-gl";
import { useCallback, useRef } from "react";
import { DestinationModal } from "./DestinationModal";

export const useMapTab = (destinations?: MapDestinationMarker[]) => {
  const ref = useRef(null);

  const clickEvent = useCallback((e: MapMouseEvent) => {
    if (!ref.current) return;
    // @ts-ignore
    ref.current.showModal(e);
  }, []);

  return (
    <>
      <MapContainer
        destinations={destinations}
        dblclick={clickEvent}
      ></MapContainer>
      <DestinationModal ref={ref}></DestinationModal>
    </>
  );
};
