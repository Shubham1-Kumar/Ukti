import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const getUsersFollowings = async (c: Context) => {
    const prisma = createPrismaClient(c.env);
  
    const { isVerified, id: userId } = c.get("user");
    const { params } = c.get("validatedData");
    const { id } = params;
  
    if (!isVerified && userId !== id) {
      return c.json({ error: "Only verified users can see others' followings." }, 403);
    }
  
    const user = await prisma.user.findUnique({
      where: { id },
    });
  
    if (!user || user.isDeleted) {
      return c.json({ error: "User doesn't exist." }, 404);
    }
  
    const followings = await prisma.follower.findMany({
      where: {
        followerId: id,
        following: {
          isDeleted: false, // filter out deleted users
        },
      },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            bio: true,
          },
        },
      },
    });
  
    const formattedFollowings = followings.map(f => f.following);
  
    return c.json({ followings: formattedFollowings });
  };
  