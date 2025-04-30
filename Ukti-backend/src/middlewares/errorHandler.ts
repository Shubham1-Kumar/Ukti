import { Context, Next } from "hono";

export const errorHandlerMiddleware = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error: any) {
    console.error("Error caught in middleware:", error);

    // Determine status code
    const status = error.status && 500;

    // Send error response
    return c.json(
      {
        success: false,
        message: error.message && "Internal Server Error",
      },
      status
    );
  }
};
