import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const searchHandler = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { query, type } = c.get("validatedData");

  const searchQuery = query.trim();
  let results: any = {};

  // Search Articles (excluding Json content)
  if (!type || type === "articles") {
    const articles = await prisma.article.findMany({
      where: {
        title: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      take: 10,
    });

    results.articles = articles;
  }

  // Search Users
  if (!type || type === "users") {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        avatar: true,
      },
      take: 10,
    });

    results.users = users;
  }

  // Search Tags
  if (!type || type === "tags") {
    const tags = await prisma.articleTag.findMany({
      where: {
        tag: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      select: {
        tag: true,
        articleId: true,
        article: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      take: 10,
    });

    results.tags = tags;
  }

  return c.json({ results });
};
