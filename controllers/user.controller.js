const { User } = require("../models");

module.exports = {
  //get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        if (err.keyPattern.email == 1) {
          return res.status(403).json({
            message:
              "That Email has already been used, please enter a new email",
            error: err,
          });
        } else if (err.keyPattern.userName == 1) {
          return res.status(403).json({
            message:
              "That username has already been used, please enter a new username",
            error: err,
          });
        } else {
          return res.status(500).json(err);
        }
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ message: "User deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  //update a user's info
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    ).then((user) =>
      !user
        ? res.status(500).json({ message: "No user with this id!" })
        : res.json(user)
    );
  },

  //add a new friend to user
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(400).json({ message: "No User with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //remove a friend from a user
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(400).json({ message: "No User found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
