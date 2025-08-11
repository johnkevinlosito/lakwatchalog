"use client";

import React from "react";
import { Button } from "./ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useAuthStore } from "@/stores/auth";
import { useShallow } from "zustand/shallow";
import { Loader2 } from "lucide-react";

const GithubSignin = () => {
  const { loading, signIn } = useAuthStore(
    useShallow((state) => ({ loading: state.loading, signIn: state.signIn }))
  );

  return (
    <Button disabled={loading} onClick={signIn}>
      Sign In with Github{" "}
      {loading ? <Loader2 className="animate-spin" /> : <SiGithub />}
    </Button>
  );
};

export default GithubSignin;
