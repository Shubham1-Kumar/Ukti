import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const getAllCategories = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      tags:true,
      description:true,
    },
    orderBy: {
      name: "asc", // optional: sorts categories alphabetically
    },
  });

  return c.json({ categories }, 200);
};
