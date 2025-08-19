"use client";

import React, { useActionState, useEffect } from "react";
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

const initialState: ActionResponse = {
  success: false,
  message: "",
};

const LocationForm = () => {
  const [state, action, isPending] = useActionState(
    submitLocationAction,
    initialState
  );
  const router = useRouter();
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard");
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <form action={action}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add Location</CardTitle>
          <CardDescription>
            A location is a place you have traveled. It can be a city, country,
            state or point of interest. You can add specific times you visited
            this location after adding it.
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
                <p id="description-error" className="text-sm text-destructive">
                  {state.errors.description[0]}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lat">Latitude</Label>
              <Input
                id="lat"
                name="lat"
                type="text"
                defaultValue={state.inputs?.lat}
                className={state?.errors?.lat ? "border-destructive" : ""}
                required
              />
              {state?.errors?.lat && (
                <p id="lat-error" className="text-sm text-destructive">
                  {state.errors.lat[0]}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="long">Longitude</Label>
              <Input
                id="long"
                name="long"
                type="text"
                defaultValue={state.inputs?.long}
                className={state?.errors?.long ? "border-destructive" : ""}
                required
              />
              {state?.errors?.long && (
                <p id="long-error" className="text-sm text-destructive">
                  {state.errors.long[0]}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LocationForm;
