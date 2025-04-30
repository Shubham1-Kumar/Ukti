import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const getAllArticleWithFilter = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { query } = c.get("validatedData");

  const {
    articleId,
    userId,
    tag,
    published,
    search,
    sortBy = "updatedAt",
    order = "desc",
    page = 1,
    limit = 10,
  } = query;

  if (articleId) {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: {
        author: {
          select: { id: true, name: true, avatar: true },
        },
      },
    });

    if (!article) {
      return c.json({ error: "Article not found" }, 404);
    }

    return c.json({ article });
  }

  const filters: any = {};

  if (userId) filters.authorId = userId;
  if (typeof published === "boolean") filters.isPublished = published;

  if (search) {
    filters.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }

  if (tag) {
    filters.tags = {
      has: tag,
    };
  }

  // Construct dynamic order array
  const ordering: any[] = [
    { likes: "desc" },
    { views: "desc" },
    { readingTime: "desc" },
  ];

  // Add user-defined orderBy if it's not already handled
  const shouldAddCustomOrder =
    !["likes", "views", "readingTime"].includes(sortBy);

  if (shouldAddCustomOrder) {
    ordering.push({ [sortBy]: order });
  }

  const articles = await prisma.article.findMany({
    where: filters,
    orderBy: ordering as any, // 👈 tell TypeScript to chill
    skip: (page - 1) * limit,
    take: limit,
    include: {
      author: {
        select: { id: true, name: true, avatar: true },
      },
    },
  });

  return c.json({
    page,
    limit,
    count: articles.length,
    articles,
  });
};
