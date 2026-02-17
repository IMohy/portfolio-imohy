import { prisma } from "@/lib/prisma";
import { jsonResponse, errorResponse, requireAuth } from "@/lib/api-utils";
import { contactFormSchema } from "@/lib/validations";

export async function GET() {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return jsonResponse(messages);
  } catch {
    return errorResponse("Failed to fetch messages");
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("Invalid form data", 400);
    }

    const message = await prisma.contactMessage.create({
      data: parsed.data,
    });

    return jsonResponse(message, 201);
  } catch {
    return errorResponse("Failed to send message");
  }
}

export async function PUT(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const body = await req.json();
    const { id, ...data } = body;
    const message = await prisma.contactMessage.update({ where: { id }, data });
    return jsonResponse(message);
  } catch {
    return errorResponse("Failed to update message");
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return errorResponse("Missing id", 400);

    await prisma.contactMessage.delete({ where: { id } });
    return jsonResponse({ success: true });
  } catch {
    return errorResponse("Failed to delete message");
  }
}
