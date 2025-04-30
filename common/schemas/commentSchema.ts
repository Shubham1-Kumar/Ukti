import { z } from "zod";

// Create Comment Schema
//POST /article/:id/comments
export const createCommentSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid article ID format"), // Article ID
  }),
  body: z.object({
    content: z.string().min(1, "Comment content cannot be empty"),
  }),
});

// GET /article/:id/comments
// Get All Comments for an Article Schema
export const getAllCommentsForAnArticleSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid article ID format"), // Article ID
  }),
});

// PUT /comments/:id
// Update Comment Schema
export const updateCommentSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid comment ID format"), // Comment ID
  }),
  body: z.object({
    content: z.string().min(1, "Comment content cannot be empty"),
  }),
});

//   DELETE /comments/:id
// Delete Comment Schema
export const deleteCommentSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid comment ID format"), // Comment ID
  }),
});

// zod infered types that we will need in our frontend to know what to pass as input
export type createCommentSchemaType = z.infer<typeof createCommentSchema>;
export type getAllCommentsForAnArticleSchemaType = z.infer<typeof getAllCommentsForAnArticleSchema>;
export type updateCommentSchemaType = z.infer<typeof updateCommentSchema >;
export type deleteCommentSchemaType = z.infer<typeof deleteCommentSchema>;

