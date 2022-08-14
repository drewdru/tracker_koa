import trackerService from "./tracker.service.js";

const createMany = async (ctx) => {
  ctx.body = "";
  trackerService.createMany(ctx.request.body);
};

export default {
  createMany,
};
