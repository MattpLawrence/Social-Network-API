const { User } = require("../models");

module.exports = {
  //get all users
  getUsers(req, res) {
    User.find()
      .then((courses) => res.json(courses))
      .catch((err) => res.status(500).json(err));
  },
};
