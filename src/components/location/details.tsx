"use client";

import { useMapLocationStore } from "@/providers/map-location-store-provider";
import { LocationWithLogs } from "@/types/location";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { MapPinPlus } from "lucide-react";

const LocationDetails = ({ location }: { location: LocationWithLogs }) => {
  const { setMapPoints } = useMapLocationStore((state) => state);

  useEffect(() => {
    setMapPoints([
      {
        id: location.id,
        name: location.name,
        description: location.description,
        lat: location.lat,
        long: location.long,
      },
    ]);
  }, [location, setMapPoints]);
  return (
    <div className="">
      <h2 className="text-xl font-bold">{location.name}</h2>
      <p className="text-sm">{location.description}</p>
      {!location.locationLogs.length && (
        <div className="mt-4 flex items-center gap-2">
          <p className="text-sm italic">Add a location log to get started</p>
          <Button size={"icon"}>
            <MapPinPlus />
          </Button>
        </div>
      )}
    </div>
  );
};

export default LocationDetails;
