import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const markNotificaionAsRead = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { id: userId } = c.get("user");
  const { id: notificationId } = c.get("validatedData");

  // Optional: ensure notification belongs to the current user
  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId: userId,
    },
  });

  if (!notification) {
    return c.json({ error: "Notification not found or unauthorized" }, 404);
  }

  const updatedNotification = await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
    select: {
      id: true,
      isRead: true,
    },
  });

  return c.json({
    message: "Notification marked as read",
    notification: updatedNotification,
  });
};
