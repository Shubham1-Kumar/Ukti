import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const createNewTag = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user");
  const { params, body } = c.get("updatedData");

  const { id: articleId } = params;
  const { name } = body;

  // check if the article exists and user owns it
  const articleExists = await prisma.article.findFirst({
    where: {
      id: articleId,
      authorId: userId,
    },
    select: {
      id: true,
    },
  });

  if (!articleExists) {
    return c.json({ error: "Unauthorized to create tag on this article" }, 403);
  }

  const newTag = await prisma.articleTag.create({
    data: {
      articleId: articleId,
      tag: name,
    },
  });

  return c.json({ message: "New tag created successfully", tag: newTag });
};
