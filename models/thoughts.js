const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/date");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Thoughts = model("Thoughts", thoughtSchema);

module.exports = Thoughts;
