const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

// - Aggregates go here

module.exports = {

  // - all users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // - single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
            }),
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // todo - add put route
  
  // add friend to user
    addFriend(req, res) {
    const friendId = ObjectId(req.body);
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: friendId } },
        { runValidators: true, new: true }
    )
    .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    const friendId = ObjectId(req.params.friendId);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndUpdate(
              { username: req.params.userId },
              { $pull: { username: req.params.userId } },
              { new: true }
            )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // - Create new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};
