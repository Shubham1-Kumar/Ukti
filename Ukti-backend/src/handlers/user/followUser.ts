import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const followUser = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { id: userId } = c.get("user");

  const { params } = c.get("validatedData");
  const { id } = params;

  // Prevent following yourself
  if (userId === id) {
    return c.json({ error: "You cannot follow yourself." }, 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!user) {
    return c.json({ error: "User doesn't exist." }, 404);
  }

  // Check if already following
  const existingFollow = await prisma.follower.findFirst({
    where: {
      followerId: userId,
      followingId: id,
    },
  });

  if (existingFollow) {
    return c.json({ message: "Already following this user." }, 200);
  }

  // Create follow relationship
  const newFollow = await prisma.follower.create({
    data: {
      followerId: userId,
      followingId: id,
    },
  });

  return c.json({
    message: "Successfully followed the user.",
    data: newFollow,
  });
};
