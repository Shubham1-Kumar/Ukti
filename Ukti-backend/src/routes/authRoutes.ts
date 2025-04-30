import { Hono } from "hono";
import { validate } from "../middlewares/validate";
import { loginSchema } from "../../../common/schemas/schema";
import { signupSchema } from "../../../common/schemas/schema";
import { userLogin } from "../handlers/auth/userLogin";
import { userSignup } from "../handlers/auth/userSignup";
import { adminSignup } from "../handlers/auth/adminSignup";
const authRouter = new Hono();

// signin route
authRouter.post("/signin", validate(loginSchema), userLogin);

// signup route
authRouter.post("/signup", validate(signupSchema), userSignup);

// admin signup route
authRouter.post("/signup/admin", adminSignup);

export default authRouter;
