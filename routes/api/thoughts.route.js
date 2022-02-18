const router = require("express").Router();
const {
  getThoughts,
  createThought,
} = require("../../controllers/thoughts.controller");

router.route("/").get(getThoughts).post(createThought);

module.exports = router;
