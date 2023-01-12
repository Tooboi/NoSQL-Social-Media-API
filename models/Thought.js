const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thoughtText: {},
    createdAt: {},
    username: {},
    reactions: {} // - array of nested docs created with reactionSchema
});

const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

// - Create a virtual called reactionCount that retrieves the length of the thoughts reactions array field on query
// - CRUD operations can go here

module.exports = Thought;