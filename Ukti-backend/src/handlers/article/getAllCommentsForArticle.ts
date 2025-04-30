import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const getAllCommentsForArticle = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user");
  const { params } = c.get("validatedData");
  const { id: articleId } = params;

  // Check if article exists
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: { id: true },
  });

  if (!article) {
    return c.json({ error: "Article not found" }, 404);
  }

  const comments = await prisma.comment.findMany({
    where: { articleId },
    orderBy: { createdAt: "desc" }, // Optional: newest first
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  return c.json({ comments }, 200);
};
