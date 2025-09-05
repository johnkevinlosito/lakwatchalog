import LocationCard from "@/components/location/location-card";
import Map from "@/components/map";
import { Button } from "@/components/ui/button";
import { getLocations } from "@/lib/actions/location";
import { auth } from "@/lib/auth";
import { CirclePlus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }
  const locations = await getLocations();

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div>
        <h2 className="text-2xl font-bold">Locations</h2>

        {locations.length > 0 ? (
          <div className="flex flex-nowrap gap-4 mt-4 overflow-x-auto pb-2">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            <p>Add a location to get started</p>
            <Button className="w-max" asChild>
              <Link href={"/dashboard/locations/add"}>
                <CirclePlus />
                Add Location
              </Link>
            </Button>
          </div>
        )}
      </div>
      <Map />
    </div>
  );
};

export default DashboardPage;
