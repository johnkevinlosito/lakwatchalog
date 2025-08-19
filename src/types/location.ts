import { Location } from "@/generated/prisma";

export type LocationFormData = Pick<
  Location,
  "name" | "description" | "lat" | "long"
>;

export interface ActionResponse {
  success: boolean;
  message: string;
  inputs?: LocationFormData;
  errors?: {
    [K in keyof LocationFormData]?: string[];
  };
}
