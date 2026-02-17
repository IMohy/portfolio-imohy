import { prisma } from "@/lib/prisma";
import { jsonResponse, errorResponse, requireAuth } from "@/lib/api-utils";

export async function GET() {
  try {
    const hero = await prisma.hero.findFirst();
    if (!hero) return jsonResponse(null);
    return jsonResponse(hero);
  } catch {
    return errorResponse("Failed to fetch hero data");
  }
}

export async function PUT(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const body = await req.json();
    const existing = await prisma.hero.findFirst();

    if (existing) {
      const hero = await prisma.hero.update({
        where: { id: existing.id },
        data: body,
      });
      return jsonResponse(hero);
    }

    const hero = await prisma.hero.create({ data: body });
    return jsonResponse(hero);
  } catch {
    return errorResponse("Failed to update hero data");
  }
}
