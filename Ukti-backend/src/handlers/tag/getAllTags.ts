import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const getAllTags = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  // Fetch all unique tags from the ArticleTag table
  const rawTags = await prisma.articleTag.findMany({
    select: { tag: true },
  });

  // Remove duplicates (in case same tag is used on different articles)
  const uniqueTags = [...new Set(rawTags.map((t) => t.tag))];

  return c.json({
    message: "Tags fetched successfully",
    tags: uniqueTags,
  });
};
