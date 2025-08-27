import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  const locations = await prisma.location.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return NextResponse.json(locations);
}
