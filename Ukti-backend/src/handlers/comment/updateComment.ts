import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const updateComment = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user");
  const { params, body } = c.get("validatedData");
  const { id: commentId } = params;
  const { content } = body;

  // Check if the comment exists and belongs to the user
  const existingComment = await prisma.comment.findUnique({
    where: {
      id: commentId,
      userId: userId,
    },
    select: { id: true },
  });

  if (!existingComment) {
    return c.json({ error: "Comment not found or unauthorized" }, 404);
  }

  // Update the comment
  const updatedComment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
    select: {
      id: true,
      content: true,
    },
  });

  return c.json({
    message: "Comment updated successfully",
    comment: updatedComment,
  }, 200);
};
