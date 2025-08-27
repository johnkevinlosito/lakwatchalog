"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Location } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { useMapLocationStore } from "@/providers/map-location-store-provider";
import { MapPoint } from "@/types/map";

import React from "react";

const LocationCard = ({ location }: { location: Location }) => {
  const mapPoint: MapPoint = {
    id: location.id,
    name: location.name,
    description: location.description,
    lat: location.lat,
    long: location.long,
  };
  const { selectedPoint, setSelectedPoint } = useMapLocationStore(
    (state) => state
  );

  return (
    <Card
      className={cn(
        "w-full max-w-xs shrink-0",
        selectedPoint?.id === mapPoint.id ? "border-cyan-600" : ""
      )}
      onMouseEnter={() => setSelectedPoint(mapPoint, true)}
      onMouseLeave={() => setSelectedPoint(null, false)}
    >
      <CardHeader>
        <CardTitle>{location.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{location.description}</p>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
