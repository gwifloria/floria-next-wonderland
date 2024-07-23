import MapContainer from "@/components/MapContainer";
import { MapMouseEvent } from "mapbox-gl";
import { useCallback } from "react";
import { useDestinationModal } from "./useDestinationModal";

export const useMapTab = () => {
  const { dom: EModal, showModal } = useDestinationModal();

  const clickEvent = useCallback(
    (e: MapMouseEvent) => {
      showModal(e);
    },
    [showModal]
  );

  return (
    <>
      <MapContainer clickEvent={clickEvent}></MapContainer>
      {EModal}
    </>
  );
};
