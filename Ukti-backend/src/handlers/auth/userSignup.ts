import { Context } from "hono";
import { hash } from "bcryptjs";
import { createPrismaClient } from "../../db/client";

export const userSignup = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { body } = c.get("validatedData");
  const {email, name, password} = body;

  // check if user already exists or not
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return c.json({ error: "User already exists" }, 400);
  }
  // Now has the password and then store in the db
  const hashedPassword = await hash(password, 10);

  // Create the user
  const user = await prisma.user.create({
    data: { email, name, password: hashedPassword },
  });
  
  return c.json({
    message: "User created successfully",
    user: { id: user.id, email: user.email, name: user.name },
  });
};
