"use client";

import React from "react";
import MapLibre from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { CENTER_PH } from "@/lib/constants";

const Map = () => {
  const { latitude, longitude } = CENTER_PH;
  return (
    <MapLibre
      initialViewState={{
        longitude,
        latitude,
        zoom: 3,
      }}
      style={{ width: "100%", height: "50vh" }}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
    />
  );
};

export default Map;
