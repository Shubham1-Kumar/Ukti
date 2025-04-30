// creating category schemas
import { z } from "zod";

// ✅ POST /categories – Create a new category
export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(3, "Category name must be at least 3 of chars"),
    tags: z
      .array(z.string().min(1, "Tag can't be empty"))
      .min(1, "At least one tag is required"),
    description: z.string().optional(),
  }),
});

// ✅ PUT /categories/:id – Update a category
export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid category Id"),
  }),
  body: z.object({
    name: z.string().min(3, "Category name must be at least 3 of chars"),
    description: z.string().optional(),
  }),
});

// ✅ DELETE /categories/:id – Delete a category
export const deleteCategorySchema = z.object({
  params: z.object({
    id: z.string().cuid("Ivalid category Id format"),
  }),
});

// zod infered types that we will need in our frontend to know what to pass as input
export type createCategorySchemaType = z.infer<typeof createCategorySchema>;
export type updateCategorySchemaType = z.infer<typeof updateCategorySchema>;
export type deleteCategorySchemaType = z.infer<typeof deleteCategorySchema>;
