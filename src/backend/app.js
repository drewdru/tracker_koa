import Koa from "koa";
import cors from "@koa/cors";
import logger from "koa-morgan";
import bodyParser from "koa-bodyparser";
import router from "./routes.js";

const app = new Koa();

app.use(cors());

app.use(bodyParser({ enableTypes: ["json", "form"] }));

app.use(
  logger("dev", {
    skip: () => app.env === "test",
  })
);

app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      statusCode: ctx.status,
      message: err.message,
    };
    ctx.app.emit("error", err, ctx);
  }
});

app.use(router.routes());

export default app;
