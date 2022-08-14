import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error: " + err);
  process.exit(-1);
});
mongoose.connection.once("open", () => {
  console.info("Successfully connected to the database");
});

export default mongoose;
