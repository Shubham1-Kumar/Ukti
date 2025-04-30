import { Context } from "hono";
import { createPrismaClient } from "../../db/client";

export const deleteComment = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const { id: userId } = c.get("user");
  const { params } = c.get("validatedData");
  const { id: commentId } = params;

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

  // Delete the comment
  const deletedComment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
    select: {
      id: true,
      content: true,
    },
  });

  return c.json({
    message: "Comment deleted successfully",
    comment: deletedComment,
  }, 200);
};
