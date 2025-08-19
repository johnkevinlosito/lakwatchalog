import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-1">
      <AppSidebar />
      <SidebarInset className="p-4">{children}</SidebarInset>
    </div>
  );
};

export default DashboardLayout;
