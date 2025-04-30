import { Hono } from "hono";
import { validate } from "../middlewares/validate";
import { searchNotesSchema } from "../../../common/schemas/notesSchema";
import { updateNoteSchema } from "../../../common/schemas/notesSchema";
import { deleteNoteSchema } from "../../../common/schemas/notesSchema";

import { updateNote } from "../handlers/notes/updateNote";
import { deleteNote } from "../handlers/notes/deleteNote";

import { searchNotes } from "../handlers/notes/searchNotes";
import { authMiddleware } from "../middlewares/auth";
import { errorHandlerMiddleware } from "../middlewares/errorHandler";
const notesRouter = new Hono();
notesRouter.use(authMiddleware);
notesRouter.use(errorHandlerMiddleware);

// Search notes by comment, text(within the notes), articleId
notesRouter.get("/search", validate(searchNotesSchema), searchNotes);

// Update a note
notesRouter.put("/:id", validate(updateNoteSchema),updateNote );

// Delete a note
notesRouter.delete("/:id", validate(deleteNoteSchema),deleteNote);

export default notesRouter;
