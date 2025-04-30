import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const updateCategory = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  // Admin check (optional, but recommended)
  const { id: userId } = c.get("user");
  const { body, params } = c.get("validatedData");
  const { id: categoryId } = params;

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

  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: body.name,
      description: body.description ?? null, // Optional: if not provided, store null
    },
  });

  return c.json(
    { message: "Category updated successfully", category: updatedCategory },
    201
  );
};
