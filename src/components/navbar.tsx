import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import ThemeToggle from "./theme-toggle";

const Navbar = () => {
  return (
    <header className="border-b">
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="flex items-center gap-1">
          <div className="">
            <Link href="/" className="font-bold">
              LakwatchaLog
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <ThemeToggle />
          <Button>
            Sign In with Github <SiGithub />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
