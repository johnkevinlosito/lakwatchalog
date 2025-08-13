import Link from "next/link";
import React from "react";
import ThemeToggle from "./theme-toggle";
import AuthButton from "./auth-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SidebarToggle from "./sidebar-toggle";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2 p-4">
        <div className="flex items-center gap-1">
          {session?.user && <SidebarToggle />}
          <div className="">
            <Link href="/" className="font-bold">
              LakwatchaLog
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
