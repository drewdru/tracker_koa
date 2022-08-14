import Koa from "koa";
import send from "koa-send";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa();

app.use(async (ctx) => {
  const path = "/" == ctx.path ? "index.html" : ctx.path;
  await send(ctx, path, { root: `${__dirname}/public` });
});

export default app;
