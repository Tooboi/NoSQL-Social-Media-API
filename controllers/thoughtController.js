const { User, Reaction, Thought } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
      // Get a course
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
          User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: thought._id } }, { new: true })
          .then((user) => {
              res.json(thought);
          })
          .catch((err) => {
              console.log(err);
              return res.status(500).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
}