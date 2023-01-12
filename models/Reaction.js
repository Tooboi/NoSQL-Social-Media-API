const mongoose = require('mongoose');

// ! SCHEMA ONLY

const reactionSchema = new mongoose.Schema({
    reactionId: {},
    reactionBody: {},
    username: {},
    createdAt: {}
});

// - This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model
// - CRUD operations can go here


module.exports = Reaction;