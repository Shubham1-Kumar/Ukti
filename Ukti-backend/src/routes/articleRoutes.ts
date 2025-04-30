import { Hono } from "hono";
const aritcleRouter = new Hono();

// Import all the validation shcemas

import { createArticleSchema } from "../../../common/schemas/schema";
import { updateArticleSchema } from "../../../common/schemas/schema";
import { publishArticleSchema } from "../../../common/schemas/schema";
import { likeArticleSchema } from "../../../common/schemas/schema";
import { bookmarkArticleSchema } from "../../../common/schemas/schema";
import { deleteArticleSchema } from "../../../common/schemas/schema";
import { getAllArticleWithFilterSchema } from "../../../common/schemas/schema";
import { createNoteSchema } from "../../../common/schemas/schema";

// import comment related schemas
import {createCommentSchema} from "../../../common/schemas/schema"
import {getAllCommentsForAnArticleSchema} from "../../../common/schemas/schema"

import { validate } from "../middlewares/validate";
import { authMiddleware } from "../middlewares/auth";
import { errorHandlerMiddleware } from "../middlewares/errorHandler";

import { createArticleDraft } from "../handlers/article/article";
import { publishArticle } from "../handlers/article/article";
import { updateArticle } from "../handlers/article/article";
import { deleteArticle } from "../handlers/article/article";
import { getAllArticleWithFilter } from "../handlers/article/article";
import { likeArticle } from "../handlers/article/article";
import { unLikeArticle } from "../handlers/article/article";
import { bookmarkArticle } from "../handlers/article/article";
import { unBookmarkArticle } from "../handlers/article/article";
import { addCommentsToArticle } from "../handlers/article/article";
import { getAllCommentsForArticle } from "../handlers/article/article";
import { createNotesToArticle } from "../handlers/article/article";
import { deleteAll } from "../scripts/deleteAllArticesForAnUser";

aritcleRouter.use(authMiddleware);
aritcleRouter.use(errorHandlerMiddleware);

// create a new article (default: Draft)
aritcleRouter.post("/", validate(createArticleSchema), createArticleDraft);

// Publish a an archicle
aritcleRouter.put(
  "/:id/publish",
  validate(publishArticleSchema),
  publishArticle
);

// Update an article
aritcleRouter.put("/:id/update", validate(updateArticleSchema), updateArticle);

// Delete an article
aritcleRouter.delete("/:id", validate(deleteArticleSchema), deleteArticle);


// Get all the articles (with filters)
aritcleRouter.get(
  "/",
  validate(getAllArticleWithFilterSchema),
  getAllArticleWithFilter
);

// Like an article
aritcleRouter.post("/:id/like", validate(likeArticleSchema), likeArticle);

// Unlike an article
aritcleRouter.delete("/:id/unlike", validate(likeArticleSchema), unLikeArticle);


// ********************** Boookmark related routes ********************** \\

// Bookmark an article
aritcleRouter.post("/:id/bookmark", validate(bookmarkArticleSchema), bookmarkArticle);

// Remove bookmark
aritcleRouter.delete("/:id/unbookmark", validate(bookmarkArticleSchema), unBookmarkArticle );

// ********************** comment related routes ********************** \\

// Add a comment to an article
aritcleRouter.post("/:id/comments",validate(createCommentSchema),addCommentsToArticle );

// Get all the comments for an article
aritcleRouter.get("/:id/comments", validate(getAllCommentsForAnArticleSchema), getAllCommentsForArticle );

// ********************** notes related routes ********************** \\

// create a new notes ("highlight test & add comment")
aritcleRouter.post("/:id/notes",validate(createNoteSchema), createNotesToArticle );

export default aritcleRouter;
