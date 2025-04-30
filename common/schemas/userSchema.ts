// creating Schemas for the user's routes
import { z } from "zod";


// GET /users/:id – Get user profile by ID
export const getUsrProfileSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid user ID format"),
  }),
});

// PUT /users/profile/me - Update user profile
export const updateUserProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(), // only if handling securely
    avatar: z.string().url().optional(),
    bio: z
      .object({
        about: z.string().optional(),
        skills: z.array(z.string()).optional(),
        interests: z.array(z.string()).optional(),
        location: z.string().optional(),
        links: z
          .object({
            github: z.string().url().optional(),
            linkedin: z.string().url().optional(),
          })
          .optional(),
      })
      .optional(),
  }),
});

// GET /users/:id/followers - Get user's followers
export const getUserFollowersSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid user Id format"),
  }),
});

// ✅ GET /users/:id/following – Get user's following
export const getUserFollowingSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid user Id format"),
  }),
});

// ✅ POST /users/:id/follow – Follow a user
export const followUserSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid user Id format"),
  }),
});

// DELETE /users/:id/unfollow - Unfollow a user
export const unfollowUserSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid user Id format"),
  }),
});

// GET /users/bookmars - Get all bookmarks for a user

// zod infered types that we will need in our frontend to know what to pass as input
export type getUsrProfileSchemaType = z.infer<typeof getUsrProfileSchema>;
export type updateUserProfileSchemaType = z.infer<
  typeof updateUserProfileSchema
>;
export type getUserFollowersSchemaType = z.infer<typeof getUserFollowersSchema>;
export type getUserFollowingSchemaType = z.infer<typeof getUserFollowingSchema>;
export type followUserSchemaType = z.infer<typeof followUserSchema>;
export type unfollowUserSchemaType = z.infer<typeof unfollowUserSchema>;
