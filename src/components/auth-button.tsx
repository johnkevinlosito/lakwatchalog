"use client";

import React from "react";
import GithubSignin from "./github-signin";
import { signOut, useSession } from "@/lib/auth-client";
import { Loader2, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

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
    <>
      {isPending ? (
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      ) : session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="0 relative isolate size-8 rounded-full"
            >
              <Avatar className="size-8">
                <AvatarImage
                  src={session.user.image || ""}
                  alt={session.user.name || ""}
                />
                <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-0.5">
                <p className="text-sm leading-tight font-medium">
                  {session.user.name}{" "}
                </p>
                <p className="text-muted-foreground text-xs leading-tight">
                  {session.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border opacity-80" />

            <DropdownMenuItem onClick={handleLogOut}>
              <LogOut /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <GithubSignin />
      )}
    </>
  );
};

export default AuthButton;
