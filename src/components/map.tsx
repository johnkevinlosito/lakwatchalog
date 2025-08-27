"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import MapLibre, {
  FullscreenControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl/maplibre";

import type { MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { CENTER_PH } from "@/lib/constants";
import { MapPin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMapLocationStore } from "@/providers/map-location-store-provider";
import { MapPoint } from "@/types/map";
import { cn } from "@/lib/utils";

const Map = () => {
  const { mapPoints, selectedPoint, setSelectedPoint, shouldFly } =
    useMapLocationStore((state) => state);

  const { latitude, longitude } = CENTER_PH;
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<MapPoint | null>(null);

  const onMapLoad = useCallback(() => {
    if (mapPoints.length > 0) {
      const map = mapRef.current!.getMap();
      fitBounds(mapPoints, map);
    }
  }, [mapPoints]);

  useEffect(() => {
    if (mapPoints.length > 0 && mapRef.current) {
      const map = mapRef.current.getMap();
      fitBounds(mapPoints, map);
    }
  }, [mapPoints]);

  useEffect(() => {
    if (mapRef.current) {
      if (selectedPoint) {
        if (shouldFly) {
          const map = mapRef.current.getMap();
          map.flyTo({
            center: [selectedPoint.long, selectedPoint.lat],
            speed: 0.8,
          });
        }
      } else if (mapPoints.length > 0) {
        const map = mapRef.current.getMap();
        fitBounds(mapPoints, map);
      }
    }
  }, [mapPoints, selectedPoint, shouldFly]);
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
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        {mapPoints.length > 0 ? (
          mapPoints.map((point) => (
            <Marker
              key={point.id}
              longitude={point.long}
              latitude={point.lat}
              onClick={(e) => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                setPopupInfo(point);
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <MapPin
                    className={cn(
                      " size-10 text-white",
                      selectedPoint?.id === point.id
                        ? "fill-cyan-600"
                        : "fill-red-500"
                    )}
                    onMouseEnter={() => setSelectedPoint(point, false)}
                    onMouseLeave={() => setSelectedPoint(null, false)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{point.name}</p>
                </TooltipContent>
              </Tooltip>
            </Marker>
          ))
        ) : (
          <Marker longitude={longitude} latitude={latitude} anchor="bottom" />
        )}

        {popupInfo && (
          <Popup
            longitude={Number(popupInfo.long)}
            latitude={Number(popupInfo.lat)}
            onClose={() => setPopupInfo(null)}
          >
            <div className=" flex flex-col">
              <h3 className="text-xl">{popupInfo.name}</h3>
              <p>{popupInfo.description}</p>
            </div>
          </Popup>
        )}
      </MapLibre>
    </div>
  );
};

export default Map;

function fitBounds(mapPoints: MapPoint[], map: maplibregl.Map) {
  const bounds = new maplibregl.LngLatBounds();
  mapPoints.forEach((location) => {
    bounds.extend([location.long, location.lat]);
  });

  map.fitBounds(bounds, { padding: 50 });
}
