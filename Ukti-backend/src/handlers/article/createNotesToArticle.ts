import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const createNotesToArticle = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user");
  const { params, body } = c.get("validatedData");
  const { id: articleId } = params;
  const { content, comment } = body;

  // Check if article exists
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: { id: true },
  });

  if (!article) {
    return c.json({ error: "Article not found" }, 404);
  }

  // Create the note
  const newNote = await prisma.note.create({
    data: {
      userId,
      articleId,
      content, // content is Json type
      comment,
    },
    select: {
      id: true,
      content: true,
      comment: true,
      createdAt: true,
    },
  });

  return c.json({ message: "Note created successfully", note: newNote }, 201);
};
