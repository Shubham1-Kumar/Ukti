import { Context } from 'hono';
import { createPrismaClient } from '../../db/client';

export const getUsersAllBookmarks = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { id: userId } = c.get("user");

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      isDeleted: false,
    },
    include: {
      bookmarks: {
        include: {
          article: true, // or select specific fields
        },
      },
    },
  });

  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({ bookmarks: user.bookmarks });
};
