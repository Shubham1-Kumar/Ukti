import { Context } from "hono";
import { createPrismaClient } from "../../db/client";
import { compare } from "bcryptjs";

export const deleteUser = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { id: userId } = c.get("user");
  const { password, email } = c.get("validatedData");

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || user.isDeleted) {
    return c.json({ error: "Invalid request userdoesn't exits" }, 403);
  }
  // validate the email and password.
  const isPasswordValid = await compare(password, user.password);
  const isEmailMatch = email === user.email;
  const isValid = isPasswordValid && isEmailMatch;

  if (!isValid) {
    return c.json({ error: "sent wrong credentials" }, 403);
  }
  prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isDeleted: true,
    },
  });

  return c.json({message:"user deleted successfully"}, 200)
};
