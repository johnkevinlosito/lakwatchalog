"use client";

import * as React from "react";
import { ArrowLeft, CirclePlus, LogOut, Map, MapPinPen } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SidebarItems from "./sidebar-items";
import { signOut } from "@/lib/auth-client";
import { useParams, usePathname, useRouter } from "next/navigation";
import SidebarLocationItems from "./sidebar-location-items";
import { getFileRoutePath } from "@/lib/utils";

const data = (slug?: string) => ({
  navMain: [
    {
      title: "Locations",
      url: "/dashboard",
      icon: Map,
    },
    {
      title: "Add Location",
      url: "/dashboard/locations/add",
      icon: CirclePlus,
    },
  ],
  navLocation: [
    {
      title: "Back to Locations",
      url: "/dashboard",
      icon: ArrowLeft,
    },
    {
      title: "Logs",
      url: `/dashboard/locations/${slug}`,
      icon: Map,
    },
    {
      title: "Edit Location",
      url: `/dashboard/locations/${slug}/edit`,
      icon: MapPinPen,
    },
    {
      title: "Add Location Log",
      url: `/dashboard/locations/${slug}/add`,
      icon: CirclePlus,
    },
  ],
});

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const routePath = getFileRoutePath(pathname, params);

  const handleLogOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      collapsible="icon"
      {...props}
    >
      <SidebarContent>
        <SidebarItems
          items={
            routePath.startsWith("/dashboard/locations/[slug]")
              ? data(params?.slug as string).navLocation
              : data().navMain
          }
        />
        <SidebarLocationItems />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogOut}>
              <LogOut /> Log out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
