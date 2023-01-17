const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

// - Aggregates go here

module.exports = {
  // - Route getters

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

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};
