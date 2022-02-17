const { User } = require("../models");

module.exports = {
  //get all users
  getUsers(req, res) {
    User.find()
      .then((courses) => res.json(courses))
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
        return res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Student.deleteMany({ _id: { $in: user.students } })
      )
      .then(() => res.json({ message: "user and students deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  //update a user's info
  updateUser(req, res) {
    user
      .findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      .then((user) =>
        !user
          ? res.status(500).json({ message: "No user with this id!" })
          : res.json(user)
      );
  },

  //add a new friend to user
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
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
      { $pull: { friends: { friendId: req.params.friendId } } },
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
