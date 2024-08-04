"use client";
import MapContainer from "@/components/MapContainer";
import { MapMouseEvent } from "mapbox-gl";
import { useCallback, useRef, useState } from "react";
import { DestinationModal } from "./DestinationModal";
import { Destination, MapDestinationMarker } from "@/types";

export const useMapTab = (destinations?: MapDestinationMarker[]) => {
  const ref = useRef();

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
