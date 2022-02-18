const { Thoughts, User } = require("../models");

module.exports = {
  // get all thoughts
  getThoughts(req, res) {
    Thoughts.getMaxListeners()
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
      res.json(thought).catch((err) => res.status(500).json(err))
    );
    User.findOneAndUpdate(
      { _id: req.params.studentId },
      { $addToSet: { thoughts: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that id found." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
