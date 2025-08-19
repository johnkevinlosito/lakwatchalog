"use server";

import { ActionResponse, LocationFormData } from "@/types/location";
import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "../prisma";

const locationSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000),
  lat: z.number().gte(-90).lte(90),
  long: z.number().gte(-180).lte(180),
});

export async function submitLocationAction(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  try {
    const rawData: LocationFormData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      lat: Number(formData.get("lat") ?? ""),
      long: Number(formData.get("long") ?? ""),
    };
    // Validate the form data
    const validatedData = locationSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: z.flattenError(validatedData.error).fieldErrors,
        inputs: rawData,
      };
    }

    await prisma.location.create({
      data: {
        ...validatedData.data,
        slug: validatedData.data.name.replaceAll(" ", "-").toLowerCase(),
        userId: session.user.id,
      },
    });

    return {
      success: true,
      message: "Location saved successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
