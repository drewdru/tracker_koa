import Router from "koa-router";
import send from "koa-send";
import path from "path";
import { fileURLToPath } from "url";
import validate from "./middlewares/yupValidator.js";
import { trackerSchema } from "./api/tracker/tracker.schema.js";
import trackerController from "./api/tracker/tracker.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = new Router();

router.get("/", async (ctx) => {
  await send(ctx, "index.js", { root: `${__dirname}/public` });
});

router.post("/track", validate(trackerSchema), trackerController.createMany);

export default router;
