import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const getUsersFollowers = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { isVerified, id: userId } = c.get("user");
  const { params } = c.get("validatedData");
  const { id } = params;

  if (!isVerified && userId !== id) {
    return c.json(
      { error: "Only verified users can see others' followers" },
      403
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!user) {
    return c.json({ error: "User doesn't exist" }, 404);
  }

  // ✅ Get list of followers from Follow table
  const followers = await prisma.follower.findMany({
    where: {
      followingId: id,
      follower: {
        isDeleted: false,
      },
    },
    select: {
      follower: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  // ✅ Extract actual user info
  const followerList = followers.map((f) => f.follower);

  return c.json({ followers: followerList });
};
