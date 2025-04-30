import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const unLikeArticle = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user");
  const { params } = c.get("validatedData");
  const { id: articleId } = params;

  // Check if article exists
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: {
      id: true,
      likes: true,
    }, // optimize: only fetch id
  });

  if (!article) {
    return c.json({ error: "Article not found" }, 404);
  }

  // Check if user liked this article or not
  const alreadyLiked = await prisma.articleLike.findUnique({
    where: {
      articleId_userId: {
        articleId,
        userId,
      },
    },
  });

  if (!alreadyLiked) {
    return c.json({ message: "you haven't liked this article" }, 200);
  }

  // unlike the article
  await prisma.articleLike.delete({
    where: {
      articleId_userId: {
        articleId,
        userId,
      },
    },
  });

  // decrement the like count
  await prisma.article.update({
    where: { id: articleId },
    data: {
      likes: {
        decrement: article.likes > 0 ? 1 : 0,
      },
    },
  });

  return c.json({ message: "Article unLiked successfully" }, 201);
};
