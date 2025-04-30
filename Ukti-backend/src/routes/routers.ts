import {Hono} from 'hono';

import authRouter from './authRoutes';
import articleRouter from './articleRoutes';
import userRouter from './userRoutes';
import commentRouter from './commentRoutes';
import notificationRouter from './notificationRoutes';
import searchRouter from './searchRoutes';
import notesRouter from './notesRoutes';
import tagRouter from './tagRoutes';
import categoryRouter from './categoryRoute';
import { rateLimiterMiddleware } from '../middlewares/rateLimiter';

const router = new Hono();

router.use(rateLimiterMiddleware);

router.route("/articles" , articleRouter);
router.route("/auth" , authRouter);
router.route("/user" , userRouter);
router.route("/comments" , commentRouter);
router.route("/notifications" , notificationRouter);
router.route("/search", searchRouter);
router.route("/notes", notesRouter);
router.route("/tags", tagRouter );
router.route("/category",categoryRouter );

export default router;