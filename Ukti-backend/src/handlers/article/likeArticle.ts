import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const likeArticle = async (c: Context) => {
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
    },
  });

  if (!article) {
    return c.json({ error: "Article not found" }, 404);
  }

  // Check if user already liked this article
  const alreadyLiked = await prisma.articleLike.findUnique({
    where: {
      articleId_userId: {
        articleId,
        userId,
      },
    },
  });

  if (alreadyLiked) {
    return c.json({ message: "Already liked" }, 200);
  }

  // Create the like entry
  await prisma.articleLike.create({
    data: {
      articleId,
      userId,
    },
  });

  // Increment the like count
  await prisma.article.update({
    where: { id: articleId },
    data: {
      likes: {
        increment: 1,
      },
    },
  });

  return c.json({ message: "Article liked successfully" }, 201);
};
