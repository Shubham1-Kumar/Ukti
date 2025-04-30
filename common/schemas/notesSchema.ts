import { z } from "zod";

// create notes schemas

// Get all the notes for the user

// Shema for creating a new notes for an article
// POST article/:id/notes
export const createNoteSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid article ID format"), // Article ID
  }),
  body: z.object({
    content: z.object({
      text: z
        .string({
          required_error: "Note text is required",
        })
        .min(1, "Note text cannot be empty"),
      // Add more fields inside content here in the future (e.g., tags, highlights)
    }),
    comment: z.string().optional(), // Optional comment for the note
  }),
});

// Search notes ()
// GET notes/search
export const searchNotesSchema = z.object({
  query: z.object({
    articleId: z.string().uuid().optional(),
    comment: z.string().optional(),
    text: z.string().optional(),
  }),
});


// PUT /notes/:id — Update a note
export const updateNoteSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid note ID format"),
  }),
  body: z.object({
    content: z
      .object({
        text: z.string().min(1, "Note text cannot be empty").optional(),
      })
      .optional(),
    comment: z.string().optional(),
  }),
});

// DELETE /notes/:id — Delete a note
export const deleteNoteSchema = z.object({
    params: z.object({
      id: z.string().cuid("Invalid note ID format"), // Note ID
    }),
  });
  
// zod infered types that we will need in our frontend to know what to pass as input
export type createNoteSchema = z.infer<typeof createNoteSchema>;
export type searchNotesSchema = z.infer<typeof searchNotesSchema>;
export type updateNoteSchema = z.infer<typeof updateNoteSchema>;