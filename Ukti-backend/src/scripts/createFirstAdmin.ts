import { Context } from "hono";
import { createPrismaClient } from "../db/client";
import { hash } from "bcryptjs";

export const creatFirstAdmin = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const adminEmail = "kshubham3684@gmail.com";
  const adminPassword = "kshubham3684@#";
  const hashedPassword = await hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      name: "Shubham Kumar",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  if (!admin) {
    return c.json({ error: "failed" }, 400);
  } else {
    return c.json({ admin, message: "created firs admin" }, 200);
  }
};
