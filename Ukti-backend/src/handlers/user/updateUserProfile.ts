import { Context } from "hono";
import { createPrismaClient } from "../../db/client";
import bcrypt from "bcryptjs"; // Ensure this is installed

export const updateUserProfile = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { id: userId } = c.get("user");
  const { name, email, password, avatar, bio } = c.get("validatedData");

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || user.isDeleted) {
    return c.json({ error: "User doesn't exist" }, 403);
  }

  // Prepare update data
  const updateData: any = {};

  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (avatar) updateData.avatar = avatar;
  if (bio) updateData.bio = bio;
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.password = hashedPassword;
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      ...updateData,
      updatedAt: new Date(),
    },
  });

  return c.json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
};
