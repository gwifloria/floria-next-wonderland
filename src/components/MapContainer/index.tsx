import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useBarHidden } from "./useBarHidden";

const MapContainer = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef<mapboxgl.Map | undefined>();
  useBarHidden();

  useEffect(() => {
    console.log("render");
  }, []);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZmxvcmlhaHVpanVlIiwiYSI6ImNseXhndTAzaTF3am8ya3B1NWNveWNhZHEifQ.p9BTWafgwslj5OTXym_B8Q";

    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0, 0],
      zoom: 2,
    });

    mapRef.current.on("load", () => {
      const width = 64;
      const bytesPerPixel = 4;
      const data = new Uint8Array(width * width * bytesPerPixel);

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
          const offset = (y * width + x) * bytesPerPixel;
          data[offset + 0] = (y / width) * 255;
          data[offset + 1] = (x / width) * 255;
          data[offset + 2] = 128;
          data[offset + 3] = 255;
        }
      }
      if (!mapRef.current) {
        return;
      }

      mapRef.current.addImage("gradient", {
        width: width,
        height: width,
        data: data,
      });

      // mapRef.current.addSource("point", {
      //   type: "geojson",
      //   data: {
      //     type: "FeatureCollection",
      //     features: [
      //       {
      //         type: "Feature",
      //         geometry: {
      //           type: "Point",
      //           coordinates: [0, 0],
      //         },
      //       },
      //     ],
      //   },
      // });

      // mapRef.current.addLayer({
      //   id: "points",
      //   type: "symbol",
      //   source: "point",
      //   layout: {
      //     "icon-image": "gradient",
      //   },
      // });
    });
  }, []);

  return <div id="map" ref={mapContainerRef} style={{ height: "100%" }}></div>;
};

export default MapContainer;
