import { Hono } from "hono";
import { cors } from "hono/cors";
import router from "./routes/routers";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET:string;
    AWS_REGION:string;
    AWS_ACCESS_KEY_ID:string;
    AWS_SECRET_ACCESS_KEY:string;
    AWS_S3_BUCKET_NAME:string;
    CLOUDFRONT_DISTRIBUTION_URL:string;
    CLOUDFRONT_KEY_PAIR_ID:string;
    CLOUDFRONT_PRIVATE_KEY:string;
  };
}>();
app.use(cors());
app.route("/app/v1", router);

app.get("/", (c) => {
  console.log(`${c.env} from "/"`);
  return c.text("Welcome to  Medium blogs!");
});

export default app;
