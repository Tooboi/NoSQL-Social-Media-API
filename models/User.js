const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([A-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);



userSchema.pre('save', function (next) {
  User.find({ _id: { $ne: this._id } }, '_id', (err, friends) => {
    if (err) handleError(err);
    this.friends = friends.map((friend) => friend._id);
    next();
  });
});

// userSchema.pre('save', function (next) {
//   Thought.find({ username: this._id }, (err, thoughts) => {
//     if (err) handleError(err);
//     this.thoughts = thoughts;
//     next();
//   });
// });


userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});
const User = model('User', userSchema);

const handleError = (err) => console.error(err);

module.exports = User;
