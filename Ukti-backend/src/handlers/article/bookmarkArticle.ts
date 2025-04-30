import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const bookmarkArticle = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user");
  const { params } = c.get("validatedData");
  const { id: articleId } = params;

  // Check if article exists
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: {
      id: true,
    }, // optimize: only fetch id
  });

  if (!article) {
    return c.json({ error: "Article not found" }, 404);
  }

  // check if already bookmarked!
  const existingBookmark = await prisma.bookmark.findUnique({
    where: {
      articleId_userId: {
        userId,
        articleId,
      },
    },
    select: { id: true },
  });

  if (existingBookmark) {
    return c.json({ message: "You have already bookmarked this article" }, 200);
  }

  // Bookmark the article
  await prisma.bookmark.create({
    data: {
      userId,
      articleId,
    },
  });
  return c.json({ message: "Article saved to bookmark" }, 201);
};
