import { Context } from "hono";
import { hash } from "bcryptjs";
import { createPrismaClient } from "../../db/client";

export const adminSignup = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { id: userId, emial } = c.get("user");
  const { body } = c.get("validatedData");
  const { email, name, password } = body;

  const isAdmin = await prisma.user.findUnique({
    where: {
      id: userId,
      email,
    },
  });

  if (!isAdmin) {
    return c.json({ error: "Only admin user's can make other's admin" }, 400);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return c.json({ message: "User already exists." }, 409);
  }

  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  return c.json({
    message: "Admin created successfully",
    user: { id: user.id, email: user.email, name: user.name },
  });
};
