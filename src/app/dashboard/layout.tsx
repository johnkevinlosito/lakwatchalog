import { AppSidebar } from "@/components/app-sidebar";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-1">
      <AppSidebar />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
