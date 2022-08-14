export default function (schema, abortEarly = false) {
  return async function validate(ctx, next) {
    if (!ctx.request.body) {
      ctx.status = error.statusCode || error.status || 400;
      ctx.body = { errors: ["No body found"] };
      return;
    }
    try {
      await schema.validate(ctx.request.body, { abortEarly });
      await next();
    } catch (error) {
      ctx.status = error.statusCode || error.status || 400;
      ctx.body = { errors: error.errors };
    }
  };
}
