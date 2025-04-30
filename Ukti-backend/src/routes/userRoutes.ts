import { Hono } from "hono";
import { getUsrProfileSchema } from "../../../common/schemas/schema";
import { updateUserProfileSchema } from "../../../common/schemas/schema";
import { getUserFollowersSchema } from "../../../common/schemas/schema";
import { getUserFollowingSchema } from "../../../common/schemas/schema";
import { followUserSchema } from "../../../common/schemas/schema";
import { unfollowUserSchema } from "../../../common/schemas/schema";
import { loginSchema } from "../../../common/schemas/schema";

import { validate } from "../middlewares/validate";
import { errorHandlerMiddleware } from "../middlewares/errorHandler";
import { authMiddleware } from "../middlewares/auth";

import { getUsersProfile } from "../handlers/user/user";
import { updateUserProfile } from "../handlers/user/user";
import { deleteUser } from "../handlers/user/user";
import { getUsersFollowers } from "../handlers/user/user";
import { getUsersFollowings } from "../handlers/user/user";
import { followUser } from "../handlers/user/user";
import { unFollowUser } from "../handlers/user/user";
import { getUsersAllBookmarks } from "../handlers/user/user";
import { getUsersAllNotifications } from "../handlers/user/user";
import { getUsersAllNotes } from "../handlers/notes/getNote";

const userRouter = new Hono();
userRouter.use(authMiddleware);
userRouter.use(errorHandlerMiddleware);
// Get user's profile by Id // All the user's can see the other's profile
// Generally happens of a social media app
userRouter.get("/:id", validate(getUsrProfileSchema), getUsersProfile);

// Update User's Profiles (like bio, avatar, etc).
userRouter.put(
  "/profile/me",
  validate(updateUserProfileSchema),
  updateUserProfile
);

// delete user's account
userRouter.delete("/account/me", validate(loginSchema), deleteUser);

// Get user's followers
userRouter.get(
  "/:id/followers",
  validate(getUserFollowersSchema),
  getUsersFollowers
);

// Get user's following
userRouter.get(
  "/:id/following",
  validate(getUserFollowingSchema),
  getUsersFollowings
);

// Follow a user
userRouter.post("/:id/follow", validate(followUserSchema), followUser);

// Unfollow a user
userRouter.delete("/:id/Unfollow", validate(unfollowUserSchema), unFollowUser);

/* ******************some Bookmark related routes****************** */

// Get all the bookmarks for a user
userRouter.get("/bookmarks", getUsersAllBookmarks);

// ********************** notes related routes ********************** \\

// Get all the notes for the user
userRouter.get("/notes", getUsersAllNotes);

// ********************** notification related routes ********************** \\

// Get all the notifications for a user
userRouter.get("/:id/notificaions", getUsersAllNotifications);

export default userRouter;
