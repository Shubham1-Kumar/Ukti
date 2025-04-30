import { Hono } from "hono";
import { deleteCommentSchema, updateCommentSchema } from "../../../common/schemas/commentSchema";
import { validate } from "../middlewares/validate";
import { authMiddleware } from "../middlewares/auth";
import { errorHandlerMiddleware } from "../middlewares/errorHandler";

import {updateComment} from "../handlers/comment/updateComment"
import {deleteComment} from "../handlers/comment/deleteComment"
const commentRouter = new Hono();
commentRouter.use(authMiddleware);
commentRouter.use(errorHandlerMiddleware)
// Update a comment
commentRouter.put("/:id" ,validate(updateCommentSchema), updateComment)

// Delete a comment
commentRouter.delete("/:id" , validate(deleteCommentSchema), deleteComment)

export default commentRouter;