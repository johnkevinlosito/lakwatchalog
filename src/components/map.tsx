"use client";

import React, { useCallback, useRef } from "react";
import MapLibre, { Marker } from "react-map-gl/maplibre";

import type { MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { CENTER_PH } from "@/lib/constants";
import { Location } from "@/generated/prisma";
import { MapPin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Map = ({ locations }: { locations: Location[] }) => {
  const { latitude, longitude } = CENTER_PH;
  const mapRef = useRef<MapRef>(null);

  const onMapLoad = useCallback(() => {
    if (locations.length > 0) {
      const map = mapRef.current!.getMap();
      const bounds = new maplibregl.LngLatBounds();
      locations.forEach((location) => {
        bounds.extend([location.long, location.lat]);
      });

      map.fitBounds(bounds, { padding: 50 });
    }
  }, [locations]);
  return (
    <div className="flex-1">
      <MapLibre
        ref={mapRef}
        initialViewState={{
          longitude,
          latitude,
          zoom: 4,
        }}
        style={{ width: "100%", height: "100%", borderRadius: 14 }}
        onLoad={onMapLoad}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
      >
        {locations.length > 0 ? (
          locations.map((location) => (
            <Marker
              key={location.id}
              longitude={location.long}
              latitude={location.lat}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <MapPin className="fill-red-500 size-10 text-white" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{location.name}</p>
                </TooltipContent>
              </Tooltip>
            </Marker>
          ))
        ) : (
          <Marker longitude={longitude} latitude={latitude} anchor="bottom" />
        )}
      </MapLibre>
    </div>
  );
};

export default Map;
