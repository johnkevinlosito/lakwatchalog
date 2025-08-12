import GithubSignin from "@/components/github-signin";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex flex-col gap-16 px-8 py-24 text-center">
      <div className="flex flex-col items-center justify-center gap-8  max-w-2xl mx-auto">
        <h1 className="mb-0 text-balance font-medium text-6xl md:text-7xl xl:text-[5.25rem]">
          LakwatchaLog
        </h1>
        <p className="mt-0 mb-0 text-balance text-lg text-muted-foreground">
          Keep track of your travels and adventures with this simple travel log
          app. Add locations, photos, and notes to create a digital journal of
          your journeys.
        </p>
        <div className="flex items-center gap-2">
          {!session?.user ? (
            <GithubSignin />
          ) : (
            <Button asChild>
              <Link href={"/dashboard"}>Go to Dashboard</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
