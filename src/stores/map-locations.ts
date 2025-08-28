import { env } from "@/env/client";
import { Location } from "@/generated/prisma";
import { CENTER_PH } from "@/lib/constants";
import { MapPoint } from "@/types/map";
import { createStore } from "zustand/vanilla";

export type MapLocationState = {
  locations: Location[];
  mapPoints: MapPoint[];
  selectedPoint: MapPoint | null;
  addedPoint: MapPoint | null;
  loading: boolean;
};

export type MapLocationActions = {
  refresh: () => Promise<void>;
  setMapPoints: (points: MapPoint[]) => void;
  setSelectedPoint: (point: MapPoint | null) => void;
  setAddedPoint: (point: MapPoint | null) => void;
};

export type MapLocationStore = MapLocationState & MapLocationActions;

export const defaultInitState: MapLocationState = {
  locations: [],
  mapPoints: [],
  selectedPoint: null,
  addedPoint: null,
  loading: false,
};
export const defaultAddedPoint: MapPoint = {
  id: "add-point",
  name: "Added Point",
  description: "",
  long: CENTER_PH.longitude,
  lat: CENTER_PH.latitude,
};
export const initMapLocationStore = async (): Promise<MapLocationState> => {
  if (typeof window === "undefined") {
    return defaultInitState;
  }
  try {
    const data = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/locations`);
    const locations: Location[] = await data.json();
    const mapPoints = locations.map((location: Location) => ({
      id: location.id,
      name: location.name,
      description: location.description,
      lat: location.lat,
      long: location.long,
    }));
    return {
      ...defaultInitState,
      addedPoint:
        window.location.pathname === "/dashboard/locations/add"
          ? defaultAddedPoint
          : null,
      locations,
      mapPoints,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return defaultInitState;
  }
};

export const createMapLocationStore = (
  initState: Promise<MapLocationState>
) => {
  const store = createStore<MapLocationStore>()((set) => ({
    ...defaultInitState,
    refresh: async () => {
      set({ loading: true });
      const data = await initMapLocationStore();
      set({
        locations: data.locations,
        mapPoints: data.mapPoints,
        loading: false,
      });
    },
    setMapPoints: (points) => set(() => ({ mapPoints: points })),
    setSelectedPoint: (point) => set(() => ({ selectedPoint: point })),
    setAddedPoint: (point) => set(() => ({ addedPoint: point })),
  }));
  initState.then(store.setState);
  return store;
};
