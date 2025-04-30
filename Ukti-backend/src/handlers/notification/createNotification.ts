import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const createNotification = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { body } = c.get("validatedData"); // From createNotificationSchema

  const newNotification = await prisma.notification.create({
    data: {
      userId: body.id, // Recipient
      title: body.title,
      message: body.message,
      type: body.type,
      // We can store link in a separate field if you plan to add it later
    },
    select: {
      id: true,
      title: true,
      message: true,
      type: true,
      isRead: true,
      createdAt: true,
    },
  });
  return c.json({ notification: newNotification }, 201);
};
