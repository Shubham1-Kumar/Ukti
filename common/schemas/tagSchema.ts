import { z } from "zod";
// GET /tag --> get all the tags
//
export const getAllTagSchema = z.object({
  query: z.object({}).optional(),
  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

// Create a new tag POST /tags
// Only admins or Moderators should create tags
export const createTagSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid article id format"),
  }),
  body: z.object({
    name: z.string().min(3, "Tag name is required | at least 3 chars"),
  }),
});

// zod infered types that we will need in our frontend to know what to pass as input
export type getAllTagSchema = z.infer<typeof getAllTagSchema>;
export type createTagSchema = z.infer<typeof createTagSchema>;
