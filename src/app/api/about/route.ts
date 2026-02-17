import { prisma } from "@/lib/prisma";
import { jsonResponse, errorResponse, requireAuth } from "@/lib/api-utils";

export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    if (!about) return jsonResponse(null);
    return jsonResponse(about);
  } catch {
    return errorResponse("Failed to fetch about data");
  }
}

export async function PUT(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const body = await req.json();
    const existing = await prisma.about.findFirst();

    if (existing) {
      const about = await prisma.about.update({
        where: { id: existing.id },
        data: body,
      });
      return jsonResponse(about);
    }

    const about = await prisma.about.create({ data: body });
    return jsonResponse(about);
  } catch {
    return errorResponse("Failed to update about data");
  }
}
