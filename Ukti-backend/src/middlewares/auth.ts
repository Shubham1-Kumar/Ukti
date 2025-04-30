import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const authMiddleware = async (c:Context, next: Next) => {
    // extracting the header and extract the token
     const  token = c.req.header("Authorization")?.replace("Bearer ","");
    // check there is token or not
     if(!token) return c.json({error: "Unauthorized"}, 401);
     try {
        // verify the token
         const payload = await verify(token, c.env.JWT_SECRET);
         c.set("user", payload); // store the user in context
         await next();
     }catch{
        // In case of any error 
            return c.json({error: "Invalid token"}, 401)
     }
};