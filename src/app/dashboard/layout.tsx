import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { MapLocationProvider } from "@/providers/map-location-store-provider";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <MapLocationProvider>
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset className="p-4">{children}</SidebarInset>
      </div>
    </MapLocationProvider>
  );
};

export default DashboardLayout;
