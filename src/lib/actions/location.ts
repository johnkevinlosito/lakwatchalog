"use server";

import { ActionResponse, LocationFormData } from "@/types/location";
import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "../prisma";
import slugify from "slug";
import { customAlphabet } from "nanoid";
import { revalidatePath } from "next/cache";

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

  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);
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

    const existingLocation = await prisma.location.findFirst({
      where: {
        AND: {
          name: {
            equals: rawData.name,
            mode: "insensitive",
          },
          userId: { equals: session.user.id },
        },
      },
    });

    if (existingLocation) {
      return {
        success: false,
        message: "A location with that name already exists!",
        inputs: rawData,
      };
    }

    let slug = slugify(validatedData.data.name);
    let existingSlug = !!(await findLocationBySlug(slug));
    while (existingSlug) {
      const id = nanoid();
      const idSlug = `${slug}-${id}`;
      existingSlug = !!(await findLocationBySlug(idSlug));
      if (!existingSlug) {
        slug = idSlug;
      }
    }

    await prisma.location.create({
      data: {
        ...validatedData.data,
        slug,
        userId: session.user.id,
      },
    });
    revalidatePath("/");
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

export async function getLocations() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }
  const location = await prisma.location.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return location;
}

async function findLocationBySlug(slug: string) {
  return await prisma.location.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });
}
