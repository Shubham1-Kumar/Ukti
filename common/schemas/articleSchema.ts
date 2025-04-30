import { z } from "zod";

/** ✅ Schema for POST /articles */
export const createArticleSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    categoryId: z.string().cuid("Invalid categoryId format"),
    coverImage: z.string().optional(),
    description: z.string(),
    status: z.string(),
    content: z.object({
      ops: z.array(
        z.object({
          insert: z.union([z.string(), z.object({ image: z.string() })]),
          attributes: z.record(z.unknown()).optional(), // Allowing any attributes
        })
      ).min(1, "Content must have at least one operation"), // Ensure there's at least one op
    }),
    tags: z.array(z.string()).optional(),
  }),
});

/** ✅ Schema for PUT /articles/:id (Partial update) */
export const updateArticleSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid article ID format"),
  }),
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters").optional(),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters")
      .optional(),
    tags: z.array(z.string()).optional(),
  }),
});

/** ✅ Schema for PUT /articles/:id/publish */
export const publishArticleSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid article ID format"),
  }),
});

/** ✅ Schema for POST /articles/:id/like */
export const likeArticleSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid article ID format"), // articleId
  }),
});


/** ✅ Schema for POST /articles/:id/bookmark */
export const bookmarkArticleSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid article ID format"), // articleId
  }),
});

export const deleteArticleSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid article ID format"),
  }),
});

// get article with filters GET /articles?tag=...
export const getAllArticleWithFilterSchema = z.object({
  query: z.object({
    articleId: z.string().cuid().optional(),
    userId: z.string().uuid().optional(),
    tag: z.string().optional(),
    published: z
      .string()
      .transform((val) => val === "true")
      .optional(),
    search: z.string().optional(),
    sortBy: z.enum(["createdAt", "updatedAt", "title"]).optional(),
    order: z.enum(["asc", "desc"]).optional(),
    page: z
      .string()
      .transform((val) => parseInt(val))
      .refine((val) => !isNaN(val) && val > 0, {
        message: "Page must be a positive number",
      })
      .optional(),
    limit: z
      .string()
      .transform((val) => parseInt(val))
      .refine((val) => !isNaN(val) && val > 0, {
        message: "Limit must be a positive number",
      })
      .optional(),
  }),
});

// zod infered types that we will need in our frontend to know what to pass as input

export type createArticleSchemaType = z.infer<typeof createArticleSchema>;
export type updateArticleSchemaType = z.infer<typeof updateArticleSchema>;
export type publishArticleSchemaType = z.infer<typeof publishArticleSchema>;
export type likeArticleSchemaType = z.infer<typeof likeArticleSchema>;
export type bookmarkArticleSchemaType = z.infer<typeof bookmarkArticleSchema>;
export type deleteArticleSchemaType = z.infer<typeof deleteArticleSchema>;
export type getAllArticleWithFilterSchemaType = z.infer<typeof getAllArticleWithFilterSchema>;