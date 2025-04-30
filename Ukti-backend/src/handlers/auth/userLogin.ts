import { Context } from "hono";
import { createPrismaClient } from "../../db/client";
import { compare } from "bcryptjs";
import { sign } from "hono/jwt";

export const userLogin = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { body } = c.get("validatedData");
  const {email, password} =  body;
  
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // If user does not exist, return error
  if (!user || !user.password) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  // Compare passwords
  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  // Generate JWT token
  const token = await sign(
    { id: user.id, email: user.email , isVerified: user.isVerified},
    c.env.JWT_SECRET
  );
 // now exclude the password before sending
 const {password:hashedPassword, ...safeUser} = user;
  return c.json({ token, user:safeUser });
};
