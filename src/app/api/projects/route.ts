import { prisma } from "@/lib/prisma";
import { jsonResponse, errorResponse, requireAuth } from "@/lib/api-utils";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
    return jsonResponse(projects);
  } catch {
    return errorResponse("Failed to fetch projects");
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const body = await req.json();
    const project = await prisma.project.create({ data: body });
    return jsonResponse(project, 201);
  } catch {
    return errorResponse("Failed to create project");
  }
}
