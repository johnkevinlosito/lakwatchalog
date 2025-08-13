"use client";

import * as React from "react";
import { CirclePlus, Map } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import SidebarItems from "./sidebar-items";

const data = {
  navMain: [
    {
      title: "Locations",
      url: "/dashboard",
      icon: Map,
    },
    {
      title: "Add Location",
      url: "/dashboard/add",
      icon: CirclePlus,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      collapsible="icon"
      {...props}
    >
      <SidebarContent>
        <SidebarItems items={data.navMain} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
