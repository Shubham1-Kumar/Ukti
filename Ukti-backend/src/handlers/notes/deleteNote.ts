import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const deleteNote = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user");
  const { params } = c.get("validatedData");
  const { id: noteId } = params;

  // Check if note exists and belongs to the user
  const note = await prisma.note.findUnique({
    where: { id: noteId },
    select: {
      id: true,
      userId: true,
    },
  });

  if (!note) {
    return c.json({ error: "Note not found" }, 404);
  }

  if (note.userId !== userId) {
    return c.json({ error: "You are not authorized to delete this note" }, 403);
  }

  // Delete the note
  await prisma.note.delete({
    where: { id: noteId },
  });

  return c.json({ message: "Note deleted successfully" }, 200);
};
