import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const updateArticle = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user"); // current logged-in user
  const { params, body } = c.get("validatedData");
  const { id:articleId} = params;

  // Check if the article exists and belongs to the user
  const existingArticle = await prisma.article.findUnique({
    where: { id:articleId },
  });

  if (!existingArticle) {
    return c.json({ error: "Article not found" }, 404);
  }

  if (existingArticle.authorId !== userId) {
    return c.json({ error: "Unauthorized" }, 403);
  }

  // Update the article
  const updatedArticle = await prisma.article.update({
    where: { id:articleId },
    data: {
      ...body,
      updatedAt: new Date(), // optional; Prisma auto-handles this if field is marked @updatedAt
    },
  });

  return c.json({
    message: "Article updated successfully",
    article: updatedArticle,
  });
};
