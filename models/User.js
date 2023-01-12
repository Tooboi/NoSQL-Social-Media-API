const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    username: { type: String, },
    email: { type: String},
    thoughts: {},
    friends: {},
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

// - Create a virtual called friendCount that retrieves the length of the users friends array field on query
// - CRUD operations can go here

module.exports = User;