import {Hono} from "hono";

import {searchSchema} from "../../../common/schemas/searchSchema";
import { searchHandler } from '../handlers/search/getSearchResult';
import { validate } from "../middlewares/validate";

import { authMiddleware } from "../middlewares/auth";
import { errorHandlerMiddleware } from "../middlewares/errorHandler";

const searchRouter = new Hono();

searchRouter.use(authMiddleware);
searchRouter.use(errorHandlerMiddleware);

// Search articles, users, and tags
searchRouter.get("/", validate(searchSchema), searchHandler)

export default searchRouter; 
