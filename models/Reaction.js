const mongoose = require('mongoose');

// ! SCHEMA ONLY

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
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
      get: (createdAt) => createdAt.toLocaleString(),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);

// - This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model
// - CRUD operations can go here

module.exports = Reaction;
