import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const deleteCategory = async (c: Context) => {
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

  const { params } = c.get("validatedData"); 

  const deletedCategory = await prisma.category.delete({
    where: {
      id: params.id,
    },
  });

  return c.json(
    { message: "Category deleted successfully", category: deletedCategory },
    201
  );
};
