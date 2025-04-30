// defining all the auth inputreq schemas
import { z } from "zod";

/** ✅ Schema for POST /auth/login */
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

/** ✅ Schema for POST /auth/signup */
export const signupSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    password: z.string().min(6, "Password must be at least 6 characters").max(32, "password cant be greater than 32 chars"),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // 👈 shows error on this field
  })
});

// zod infered types that we will need in our frontend to know what to pass as input
export type loginType = z.infer<typeof loginSchema>;
export type signupType = z.infer<typeof signupSchema>;