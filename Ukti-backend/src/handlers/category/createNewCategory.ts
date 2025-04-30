import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const createNewCategory = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  // Admin check (optional, but recommended)
  const { id: userId } = c.get("user");

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });

  if (user?.role !== "ADMIN") {
    return c.json({ error: "Unauthorized access" }, 403);
  }

  const { body } = c.get("validatedData"); // Expecting: { name: string, description?: string }

  const newCategory = await prisma.category.create({
    data: {
      name: body.name,
      tags: body.tags,
      description: body.description ?? null, // Optional: if not provided, store null
    },
  });

  return c.json(
    { message: "Category created successfully", category: newCategory },
    201
  );
};
