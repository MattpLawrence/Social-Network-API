const { Thoughts, User, Reactions } = require("../models");

module.exports = {
  // get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  //get thought by id
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create thought
  createThought(req, res) {
    Thoughts.create(req.body).then((thought) =>
      User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought.id } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: "No user with that id found." })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    );
  },

  //update thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that id found." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete thought
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that id." })
          : res.json({ message: "Thought deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },

  //add reaction to thought
  addReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID found." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // remove reaction from thought
  deleteReaction(req, res) {
    Thoughts.findOneAndDelete(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that id found." })
          : res.json({ message: "Reaction deleted." })
      )
      .catch((err) => res.status(500).json(err));
  },
};
