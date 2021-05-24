const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
    min: 1,
  },
  category: {
    type: String,
    required: true,
    enum: ["business", "casual", "party", "general"],
    default: "general",
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  tags: Array,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
