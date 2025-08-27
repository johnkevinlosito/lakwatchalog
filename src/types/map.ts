export type LatLongItem = {
  lat: number;
  long: number;
};

export type MapPoint = {
  id: string;
  name: string;
  description: string | null;
} & LatLongItem;
