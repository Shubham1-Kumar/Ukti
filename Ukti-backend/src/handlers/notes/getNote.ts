import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const getUsersAllNotes = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user");

  // Get all notes by the user
  const notes = await prisma.note.findMany({
    where: {
      userId,
    },
    include: {
      article: true, // includes article data for each note
    },
    orderBy: {
      createdAt: "desc", // optional: latest notes first
    },
  });
  if (!notes || notes.length === 0) {
    return c.json({ message: "You haven't created any notes yet." }, 200);
  }
  return c.json({ notes });
};
