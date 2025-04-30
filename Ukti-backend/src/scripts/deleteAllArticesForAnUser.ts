import { Context } from "hono";
import { createPrismaClient } from "../db/client";

export const deleteAll = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { id: userId } = c.get("user");

  // Optional check: ensure user exists
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return c.json({ message: "User not found" }, 404);
  }

  const deletedArticles = await prisma.article.deleteMany({
    where: {
      authorId: userId, // ✅ Correct field name
    },
  });

  return c.json({ message: "Articles deleted", deletedArticles });
};
