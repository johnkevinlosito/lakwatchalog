import LocationDetails from "@/components/location/details";
import Map from "@/components/map";
import { getLocationBySlug } from "@/lib/actions/location";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const LocationPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  if (!slug) redirect("/dashboard");
  const location = await getLocationBySlug(slug);
  if (!location) return <div>Location not found.</div>;
  return (
    <div className="flex flex-col gap-4 flex-1">
      <LocationDetails location={location} />
      <Map />
    </div>
  );
};

export default LocationPage;
