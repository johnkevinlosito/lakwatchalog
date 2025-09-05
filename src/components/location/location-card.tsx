"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Location } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { useMapLocationStore } from "@/providers/map-location-store-provider";
import { MapPoint } from "@/types/map";
import Link from "next/link";

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
    <Link
      href={`/dashboard/locations/${location.slug}`}
      className="w-full max-w-xs shrink-0"
    >
      <Card
        className={cn(
          "w-full max-w-xs shrink-0",
          selectedPoint?.id === mapPoint.id ? "border-cyan-600" : ""
        )}
        onMouseEnter={() => setSelectedPoint(mapPoint)}
        onMouseLeave={() => setSelectedPoint(null)}
      >
        <CardHeader>
          <CardTitle>{location.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{location.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LocationCard;
