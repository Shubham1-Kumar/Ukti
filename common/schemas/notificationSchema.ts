// creating all the notification schemas

import { z } from "zod";
// ✅ POST /notification/ — Create a notification (internal use)
// Notifiy to the user who created the articles 
// Notifications
/* These notifications would be system generated.
A user likes or comments on your article → Notify you
Your article was published successfully
Your account settings were updated
You got a new follower
*/
export const createNotificationSchema = z.object({
    body: z.object({
        id: z.string(), // Receiver user // id === article.authorId
        title: z.string().min(1, "Title is required"),
        message: z.string().min(1, "Message is required"),
        type: z.enum(["info", "warning", "success", "error"]), // Optional: Define allowed types
        link: z.string().url().optional(), // Optional link to related resource
      }),
});

// ✅ PUT /notification/:id/read — Mark a notification as read
export const markNotificaitonReadSchema = z.object({
    params: z.object({
        id: z.string().cuid("Invalid notificaion Id format")
    })
})

// zod infered types that we will need in our frontend to know what to pass as input
export type createNotificationSchema = z.infer<typeof createNotificationSchema>;
export type markNotificaitonReadSchema = z.infer<typeof markNotificaitonReadSchema>;