import Tracker from "./tracker.model.js";

const createMany = async (data) => {
  const result = await Tracker.bulkWrite(
    data.map((item) => {
      return {
        insertOne: {
          document: item,
        },
      };
    })
  );
  return result;
};

export default {
  createMany,
};
