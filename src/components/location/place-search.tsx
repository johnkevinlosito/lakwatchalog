"use client";

import React, { useActionState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2Icon, MapPinCheck, SearchIcon } from "lucide-react";
import { searchPlaceAction } from "@/lib/actions/map";
import { NominatimResult, SearchActionResponse } from "@/types/map";

const initialState: SearchActionResponse = {
  success: false,
  message: "",
};
const PlaceSearch = ({
  onSelect,
}: {
  onSelect: (result: NominatimResult) => void;
}) => {
  const [state, action, isPending] = useActionState(
    searchPlaceAction,
    initialState
  );

  return (
    <div className="flex flex-col gap-2 w-md">
      <form action={action}>
        <div className="flex w-full items-center gap-2">
          <Input id="q" name="q" required placeholder="Search for location" />
          <Button
            type="submit"
            variant="outline"
            size={"icon"}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <SearchIcon />
            )}
          </Button>
        </div>
      </form>
      {state.message && !state.success && (
        <p className="text-destructive p-2">{state.message}</p>
      )}
      {state.success && state.result && state.result.length > 0 && (
        <div className="p-2 space-y-2 overflow-auto max-h-60">
          {state.result.map((res) => (
            <div
              className="flex w-full items-center gap-2 bg-card text-card-foreground p-2 rounded-xl border"
              key={res.place_id}
            >
              <p className="flex-1">{res.display_name}</p>
              <Button
                variant="default"
                size={"icon"}
                onClick={() => onSelect(res)}
                className="bg-amber-500 text-white"
              >
                <MapPinCheck className="size-5" />
              </Button>
            </div>
          ))}
        </div>
      )}
      {state.success && state.result && state.result.length === 0 && (
        <p className="text-destructive p-2">No results found.</p>
      )}
    </div>
  );
};

export default PlaceSearch;
