import { Hono } from "hono";

import { authMiddleware } from "../middlewares/auth";
import { errorHandlerMiddleware } from "../middlewares/errorHandler";

import { createCategorySchema } from "../../../common/schemas/categorySchema";
import { updateCategorySchema } from "../../../common/schemas/categorySchema";
import { deleteCategorySchema } from "../../../common/schemas/categorySchema";

import { getAllCategories } from "../handlers/category/getAllCategory";
import { validate } from "../middlewares/validate";
import { createNewCategory } from "../handlers/category/createNewCategory";
import { updateCategory } from "../handlers/category/updateCategory";
import { deleteCategory } from "../handlers/category/deleteCategory";
import { createCategories } from "../scripts/createCategories";

const categoryRouter = new Hono();
categoryRouter.use(authMiddleware);
categoryRouter.use(errorHandlerMiddleware);

// Get all categores
categoryRouter.get("/", getAllCategories);

// Create a new category
categoryRouter.post("/", validate(createCategorySchema), createNewCategory);

// Update a category
categoryRouter.put("/", validate(updateCategorySchema)), updateCategory;

// Delete a category
categoryRouter.delete("/", validate(deleteCategorySchema)), deleteCategory;

export default categoryRouter;
