import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const unFollowUser = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user");
  const { params } = c.get("validatedData");
  const { id } = params;

  // Prevent unfollowing yourself
  if (userId === id) {
    return c.json({ error: "You cannot unfollow yourself." }, 400);
  }

  // Check if the user exists and is not deleted
  const user = await prisma.user.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!user) {
    return c.json({ error: "User doesn't exist." }, 404);
  }

  // Check if following relationship exists
  const existingFollower = await prisma.follower.findFirst({
    where: {
      followerId: userId,
      followingId: id,
    },
  });

  if (!existingFollower) {
    return c.json({ message: "You do not follow this user." }, 200);
  }

  // Unfollow by deleting the relation using the unique id
  await prisma.follower.delete({
    where: {
      id: existingFollower.id,
    },
  });

  return c.json({ message: "Successfully unfollowed the user." });
};
