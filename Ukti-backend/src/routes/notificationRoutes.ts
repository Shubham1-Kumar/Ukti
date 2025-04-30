import {Hono} from "hono"
import { createNotificationSchema } from "../../../common/schemas/notificationSchema";
import { markNotificaitonReadSchema } from "../../../common/schemas/notificationSchema";
import { validate } from "../middlewares/validate";

import { createNotification } from "../handlers/notification/createNotification";
import { markNotificaionAsRead } from "../handlers/notification/markNotificationAsRead";

const notificationRouter = new Hono();

// Create a notification (internal use)
notificationRouter.post("/",validate(createNotificationSchema), createNotification )

// Mark a notificaion as read
notificationRouter.put("/:id/read",validate(markNotificaitonReadSchema),markNotificaionAsRead )


export default notificationRouter;