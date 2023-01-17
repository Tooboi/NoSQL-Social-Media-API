const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now, get: (createdAt) => createdAt.toLocaleString() },
    username: { type: String, required: true },
    reactions: [{}], // - array of nested docs created with reactionSchema
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

thoughtSchema
  .virtual('')
const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

// - Create a virtual called reactionCount that retrieves the length of the thoughts reactions array field on query
// - CRUD operations can go here

module.exports = Thought;
