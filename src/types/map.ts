export type LatLongItem = {
  lat: number;
  long: number;
};

export type MapPoint = {
  id: string;
  name: string;
  description: string | null;
} & LatLongItem;

export interface SearchActionResponse {
  success: boolean;
  message?: string;
  result?: NominatimResult[];
}

export type NominatimResult = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
};
