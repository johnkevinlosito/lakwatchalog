"use client";
import LocationForm from "@/components/location/form";
import Map from "@/components/map";
import { useMapLocationStore } from "@/providers/map-location-store-provider";
import { defaultAddedPoint } from "@/stores/map-locations";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

const AddLocationPage = () => {
  const { setAddedPoint } = useMapLocationStore((state) => state);
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    prevPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    setAddedPoint(defaultAddedPoint);
    return () => {
      if (prevPathRef.current !== window.location.pathname) {
        setAddedPoint(null);
      }
    };
    // Only run cleanup when navigating away from this page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-4 flex-1 flex-col lg:flex-row">
      <LocationForm />
      <Map />
    </div>
  );
};

export default AddLocationPage;
