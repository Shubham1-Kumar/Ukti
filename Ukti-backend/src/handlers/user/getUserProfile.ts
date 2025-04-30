import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const getUsersProfile = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { id: userId, isVerified } = c.get("user");
  const { params } = c.get("validatedData");
  const { id } = params;

  // Block if user is not verified and requesting someone else's profile
  if (!isVerified && userId !== id) {
    return c.json(
      { error: "Verify your email to view other users' profiles." },
      403
    );
  }

  // Allow fetching own profile even if not verified
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || user.isDeleted) {
    return c.json({ error: "User doesn't exist." }, 404);
  }

  return c.json({ user });
};
