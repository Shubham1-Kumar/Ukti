import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const searchNotes = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user");
  const { query } = c.get("validatedData");
  const { articleId, comment, text } = query;

  // Build the where clause dynamically
  const whereClause: any = {
    userId,
    ...(articleId && { articleId }),
    ...(comment && {
      comment: {
        contains: comment,
        mode: "insensitive",
      },
    }),
    ...(text && {
      content: {
        path: ["text"],
        string_contains: text,
      },
    }),
  };

  const notes = await prisma.note.findMany({
    where: whereClause,
    select: {
      id: true,
      content: true,
      comment: true,
      createdAt: true,
      articleId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return c.json({ notes });
};
