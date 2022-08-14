import { object, string, date, array } from "yup";

const trackerSchemaShape = {
  event: string().trim().required(),
  tags: array().of(string()),
  title: string().trim(),
  url: string().required(),
  ts: date().required(),
};

export const trackerSchema = array()
  .of(object(trackerSchemaShape))
  .min(1)
  .meta({
    title: "Posts list to update or create",
    description: "Bulk Post update or create",
  });
