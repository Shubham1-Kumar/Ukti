import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const publishArticle = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { id: userId } = c.get("user");
  const { params } = c.get("validatedData");
  const { id :articleId } = params;

  // Check article existence and ownership
  const article = await prisma.article.findUnique({
    where: {
      id:articleId,
    },
  });

  if (!article) {
    return c.json({ error: "Article not found." }, 404);
  }

  if (article.authorId !== userId) {
    return c.json({ error: "You are not authorized to publish this article." }, 403);
  }

  if (article.status === "PUBLISHED") {
    return c.json({ message: "Article is already published." }, 200);
  }

  const updated = await prisma.article.update({
    where: { id:articleId },
    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  return c.json({ message: "Article published successfully.", article: updated }, 200);
};
