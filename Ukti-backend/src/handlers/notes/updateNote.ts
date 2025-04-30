import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const updateNote = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user");
  const { params, body } = c.get("validatedData");
  const { id: noteId } = params;
  const { content, comment } = body;

  // Check if note exists and belongs to the user
  const existingNote = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!existingNote) {
    return c.json({ error: "Note not found or unauthorized access" }, 404);
  }

  // Build update payload dynamically
  const updateData: any = {};
  if (content) {
    updateData.content = content;
  }
  if (comment !== undefined) {
    updateData.comment = comment;
  }

  const updatedNote = await prisma.note.update({
    where: {
      id: noteId,
    },
    data: updateData,
    select: {
      id: true,
      content: true,
      comment: true,
      updatedAt: true,
    },
  });

  return c.json(
    { message: "Note updated successfully", note: updatedNote },
    200
  );
};
