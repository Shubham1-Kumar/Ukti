import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const addCommentsToArticle = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user");
  const { params, body } = c.get("validatedData");
  const { id: articleId } = params;
  const { content } = body;

  // Check if article exists
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: { id: true },
  });

  if (!article) {
    return c.json({ error: "Article not found" }, 404);
  }

  // Create the comment
  const comment = await prisma.comment.create({
    data: {
      content,
      articleId,
      userId,
    },
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

  // increase the no of comments to the article
  await prisma.article.update({
    where: {
      id: userId,
    },
    data: {
      noOfComments: {
        increment: 1,
      },
    },
  });

  return c.json({ message: "Comment added successfully", comment }, 201);
};
