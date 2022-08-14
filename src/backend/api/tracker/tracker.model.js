import mongoose from "mongoose";

const TrackerSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  tags: [{ type: String }],
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  ts: {
    type: Date,
  },
});

export default mongoose.model("Tracker", TrackerSchema);
