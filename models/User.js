const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, match: /[a-z0-9!#$%&'+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)@(?:a-z0-9?.)+a-z0-9?/ },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

userSchema
.virtual('friendCount')
.get(function () {
    return this.friends.length;
});
const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

// - Create a virtual called friendCount that retrieves the length of the users friends array field on query
// - CRUD operations can go here

module.exports = User;
