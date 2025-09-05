"use client";

import { Loader2Icon } from "lucide-react";
import React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useMapLocationStore } from "@/providers/map-location-store-provider";
import { Separator } from "./ui/separator";

const SidebarLocationItems = () => {
  const { locations, loading, setSelectedPoint } = useMapLocationStore(
    (state) => state
  );

  if (loading) {
    return (
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <Loader2Icon className="animate-spin" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  if (locations.length === 0) return null;
  return (
    <>
      <Separator />
      <SidebarGroup>
        <SidebarGroupLabel>Locations</SidebarGroupLabel>
        <SidebarMenu>
          {locations.map((location) => (
            <SidebarMenuItem key={location.id}>
              <SidebarMenuButton
                tooltip={location.name}
                onMouseEnter={() =>
                  setSelectedPoint({
                    id: location.id,
                    name: location.name,
                    description: location.description,
                    lat: location.lat,
                    long: location.long,
                  })
                }
                onMouseLeave={() => setSelectedPoint(null)}
                asChild
              >
                <Link href={`/dashboard/locations/${location.slug}`}>
                  <span>{location.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

export default SidebarLocationItems;
