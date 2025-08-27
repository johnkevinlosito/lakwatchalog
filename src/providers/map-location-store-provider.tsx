"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";
import {
  createMapLocationStore,
  initMapLocationStore,
  MapLocationStore,
} from "@/stores/map-locations";

export const MapLocationStoreContext =
  createContext<StoreApi<MapLocationStore> | null>(null);

export interface MapLocationProviderProps {
  children: ReactNode;
}

export const MapLocationProvider = ({ children }: MapLocationProviderProps) => {
  const storeRef = useRef<StoreApi<MapLocationStore> | null>(null);
  if (!storeRef.current) {
    storeRef.current = createMapLocationStore(initMapLocationStore());
  }
  return (
    <MapLocationStoreContext.Provider value={storeRef.current}>
      {children}
    </MapLocationStoreContext.Provider>
  );
};

export const useMapLocationStore = <T,>(
  selector: (store: MapLocationStore) => T
): T => {
  const context = useContext(MapLocationStoreContext);
  if (!context) {
    throw new Error(
      "useMapLocationStore must be used within MapLocationProvider"
    );
  }
  return useStore(context, selector);
};
