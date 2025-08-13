"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./ui/sidebar";
import { SidebarIcon } from "lucide-react";

const SidebarToggle = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      className="h-8 w-8"
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
    >
      <SidebarIcon />
    </Button>
  );
};

export default SidebarToggle;
