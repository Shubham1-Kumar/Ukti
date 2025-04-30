// creating search query schema
import { z } from "zod";

export const searchSchema = z.object({
  query: z.object({
    query: z.string().min(1, "Search query is required"),
    type: z.enum(["articles", "users", "tags"]).optional(),
    // Optional filter: can limit search to a type
  }),
});

// zod infered types that we will need in our frontend to know what to pass as input
export type searchSchema = z.infer<typeof searchSchema>;