"use client";

import React, { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ActionResponse } from "@/types/location";
import { submitLocationAction } from "@/lib/actions/location";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMapLocationStore } from "@/providers/map-location-store-provider";
import { MapPin } from "lucide-react";
import PlaceSearch from "./place-search";
import { NominatimResult } from "@/types/map";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

const LocationForm = () => {
  const [state, action, isPending] = useActionState(
    submitLocationAction,
    initialState
  );
  const { addedPoint, refresh, setAddedPoint } = useMapLocationStore(
    (state) => state
  );
  const latRef = useRef<HTMLInputElement>(null);
  const longRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  function formatNumber(value?: number) {
    if (!value) return 0;
    return value.toFixed(5);
  }
  useEffect(() => {
    if (addedPoint) {
      if (latRef.current) latRef.current.value = String(addedPoint.lat ?? "");
      if (longRef.current)
        longRef.current.value = String(addedPoint.long ?? "");
    }
  }, [addedPoint]);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard");
        refresh();
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router, refresh]);
  const searchResultSelected = (result: NominatimResult) => {
    if (addedPoint) {
      setAddedPoint({
        ...addedPoint,
        lat: Number(result.lat),
        long: Number(result.lon),
      });
    }
    if (nameRef.current) nameRef.current.value = result.display_name;
  };
  return (
    <div className="space-y-4">
      <form action={action}>
        <Card className="w-md">
          <CardHeader>
            <CardTitle>Add Location</CardTitle>
            <CardDescription>
              A location is a place you have traveled. It can be a city,
              country, state or point of interest. You can add specific times
              you visited this location after adding it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  ref={nameRef}
                  defaultValue={state.inputs?.name}
                  className={state?.errors?.name ? "border-destructive" : ""}
                  required
                />
                {state?.errors?.name && (
                  <p id="name-error" className="text-sm text-destructive">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={state.inputs?.description as string}
                  className={
                    state?.errors?.description ? "border-destructive" : ""
                  }
                />
                {state?.errors?.description && (
                  <p
                    id="description-error"
                    className="text-sm text-destructive"
                  >
                    {state.errors.description[0]}
                  </p>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Current coordinates:{" "}
                {`${formatNumber(addedPoint?.lat)}, ${formatNumber(
                  addedPoint?.long
                )}`}
              </p>
              <div>
                <p>To set the coordinates:</p>
                <ul className="list-disc ml-4 text-sm">
                  <li>
                    Drag the{" "}
                    <MapPin
                      className={
                        "fill-amber-500 text-card inline hover:cursor-pointer"
                      }
                    />
                    marker on the map.
                  </li>
                  <li>Double click the map.</li>
                  <li>Search below.</li>
                </ul>
              </div>
              <Input
                id="lat"
                name="lat"
                type="hidden"
                defaultValue={state.inputs?.lat}
                className={state?.errors?.lat ? "border-destructive" : ""}
                required
                ref={latRef}
              />
              <Input
                id="long"
                name="long"
                type="hidden"
                defaultValue={state.inputs?.long}
                className={state?.errors?.long ? "border-destructive" : ""}
                required
                ref={longRef}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
      <PlaceSearch onSelect={searchResultSelected} />
    </div>
  );
};

export default LocationForm;
