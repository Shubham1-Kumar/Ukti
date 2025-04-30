import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const deleteArticle = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user");
  const { params } = c.get("validatedData");
  const { id: articleId } = params;

  // Check if the article exists and belongs to the user
  const existingArticle = await prisma.article.findUnique({
    where: {
      id: articleId,
    },
  });

  if (!existingArticle) {
    return c.json({ error: "Article not found" }, 404);
  }

  if(existingArticle.authorId !==userId) {
    return c.json({ error: "Unauthorized" }, 403);
  }

  // Delete the article 
  const deleteArticle = await prisma.article.delete({
    where: { id:articleId },
  })

  return c.json({
    message: "Article deleted successfully",
    article: deleteArticle
  });
};
