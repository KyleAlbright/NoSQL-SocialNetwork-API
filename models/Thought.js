const { Schema, model, Types } = require("mongoose");
const moment = require('moment');

//-------------------- date formatter could go here ------------------------------//

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      // // this is our date formatter. Chose to do this than a util file as it seemed easier
      get: dateTime => moment(dateTime).format('MMM DD, YYYY [at] hh:mm a')
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      // this is our date formatter. Chose to do this than a util file as it seemed easier
      get:  dateTime => moment(dateTime).format('MMM DD, YYYY [at] hh:mm a'),
      required: true
    },

    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
