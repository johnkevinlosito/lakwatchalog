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
  const {
    mapPoints,
    selectedPoint,
    setSelectedPoint,
    addedPoint,
    setAddedPoint,
  } = useMapLocationStore((state) => state);

  const { latitude, longitude } = CENTER_PH;
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<MapPoint | null>(null);

  const onMapLoad = useCallback(() => {
    if (addedPoint) {
      const map = mapRef.current!.getMap();
      map.flyTo({
        center: [addedPoint.long, addedPoint.lat],
        speed: 0.8,
        zoom: 3,
      });
    } else if (mapPoints.length > 0) {
      const map = mapRef.current!.getMap();
      fitBounds(mapPoints, map);
    }
  }, [mapPoints, addedPoint]);

  useEffect(() => {
    if (mapRef.current) {
      if (mapPoints.length > 0) {
        const map = mapRef.current.getMap();
        fitBounds(mapPoints, map);
      }
    }
  }, [mapPoints]);
  useEffect(() => {
    if (addedPoint && mapRef.current) {
      const map = mapRef.current.getMap();
      map.flyTo({
        center: [addedPoint.long, addedPoint.lat],
        speed: 0.8,
        zoom: 3,
      });
    }
  }, [addedPoint]);
  return (
    <div className="flex-1 min-h-[50dvh] lg:min-h-0">
      <MapLibre
        ref={mapRef}
        initialViewState={{
          longitude,
          latitude,
          zoom: 4,
        }}
        style={{ width: "100%", height: "100%", borderRadius: 14 }}
        onLoad={onMapLoad}
        doubleClickZoom={!addedPoint}
        onDblClick={(e) => {
          if (addedPoint) {
            setAddedPoint({
              ...addedPoint,
              lat: e.lngLat.lat,
              long: e.lngLat.lng,
            });
          }
        }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
      >
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        {mapPoints.length > 0 &&
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
              <Tooltip open={selectedPoint?.id === point.id}>
                <TooltipTrigger asChild>
                  <MapPin
                    className={cn(
                      "size-10 text-white",
                      selectedPoint?.id === point.id
                        ? "fill-cyan-600"
                        : "fill-red-500"
                    )}
                    onMouseEnter={() => setSelectedPoint(point)}
                    onMouseLeave={() => setSelectedPoint(null)}
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 text-slate-100 [&_svg]:fill-slate-800 [&_svg]:bg-slate-800">
                  <p>{point.name}</p>
                </TooltipContent>
              </Tooltip>
            </Marker>
          ))}
        {addedPoint && (
          <Marker
            longitude={addedPoint.long}
            latitude={addedPoint.lat}
            draggable
            onDragEnd={(e) =>
              setAddedPoint({
                ...addedPoint,
                lat: e.lngLat.lat,
                long: e.lngLat.lng,
              })
            }
          >
            <Tooltip open={true}>
              <TooltipTrigger asChild>
                <MapPin
                  className={"size-11 fill-amber-500 hover:cursor-pointer"}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-slate-800 text-slate-100 [&_svg]:fill-slate-800 [&_svg]:bg-slate-800">
                <p>Drag to your desired location</p>
              </TooltipContent>
            </Tooltip>
          </Marker>
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

  map.fitBounds(bounds, { padding: 50, maxZoom: 10 });
}
