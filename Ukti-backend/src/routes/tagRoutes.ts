import {Hono} from "hono";

import { createTagSchema } from "../../../common/schemas/tagSchema";
import {getAllTagSchema} from "../../../common/schemas/tagSchema";

import { validate } from "../middlewares/validate";
import { authMiddleware } from "../middlewares/auth";
import { errorHandlerMiddleware } from "../middlewares/errorHandler";
import { createNewTag } from "../handlers/tag/createNewTag";
import { getAllTags } from "../handlers/tag/getAllTags";

const tagRouter = new Hono();
tagRouter.use(authMiddleware);
tagRouter.use(errorHandlerMiddleware);

// Get all the tags
tagRouter.get("/", validate(getAllTagSchema), createNewTag)

// Create a new tag
tagRouter.post("/", validate(createTagSchema),getAllTags)

export default tagRouter;
