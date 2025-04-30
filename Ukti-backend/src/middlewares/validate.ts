import { Context, Next } from "hono";
import { ZodError, ZodObject } from "zod";
import qs from "qs"; // npm install qs

export const validate = (schema: ZodObject<any>) => {
  return async (c: Context, next: Next) => {
    try {
      const shape = schema._def.shape();
      const requestData: Record<string, any> = {};

      // Parse body
      if ("body" in shape) {
        const body = await c.req.json().catch(() => ({}));
        requestData.body = body.body;
      }

      // Parse query (handles nested queries like query[userId]=xxx)
      if ("query" in shape) {
        const url = new URL(c.req.url);
        const parsedQuery = qs.parse(url.search.slice(1));
        console.log(parsedQuery);
        requestData.query = parsedQuery.query || {};
      }

      // Parse params
      if ("params" in shape) {
        const params = c.req.param();
        requestData.params = params;
      }

      // Log requestData (optional for debug)
      console.log("🧪 Validating request data:", requestData);

      const result = schema.safeParse(requestData);

      if (!result.success) {
        return c.json(
          {
            success: false,
            message: "Validation failed",
            errors: result.error.format(),
          },
          400
        );
      }

      // Store validated data for downstream handlers
      c.set("validatedData", result.data);
      await next();
    } catch (error) {
      if (error instanceof ZodError) {
        return c.json(
          {
            success: false,
            message: "Zod validation error",
            errors: error.format(),
          },
          400
        );
      }

      console.error("❌ Unexpected error during validation:", error);
      return c.json(
        {
          success: false,
          message: "Unexpected validation error",
        },
        400
      );
    }
  };
};
