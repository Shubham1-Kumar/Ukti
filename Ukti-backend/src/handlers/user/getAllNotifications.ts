import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const getUsersAllNotifications = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  // Get logged-in user ID from context
  const { id: userId } = c.get("user");

  // Fetch notifications
  const notifications = await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Optional: handle empty state
  if (notifications.length === 0) {
    return c.json({ message: "No notifications found." }, 200);
  }

  return c.json({ notifications }, 200);
};
