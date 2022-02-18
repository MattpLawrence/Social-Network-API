const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/date");
const reactionSchema = require("./Reactions");

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
    userName: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thoughts = model("Thoughts", thoughtSchema);

module.exports = Thoughts;
