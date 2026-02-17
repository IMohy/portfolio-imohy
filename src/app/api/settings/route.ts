import { prisma } from "@/lib/prisma";
import { jsonResponse, errorResponse, requireAuth } from "@/lib/api-utils";

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: "settings" } });
    if (!settings) {
      settings = await prisma.siteSettings.create({ data: { id: "settings" } });
    }
    return jsonResponse(settings);
  } catch {
    return errorResponse("Failed to fetch settings");
  }
}

export async function PUT(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const body = await req.json();
    const settings = await prisma.siteSettings.upsert({
      where: { id: "settings" },
      update: body,
      create: { id: "settings", ...body },
    });
    return jsonResponse(settings);
  } catch {
    return errorResponse("Failed to update settings");
  }
}
