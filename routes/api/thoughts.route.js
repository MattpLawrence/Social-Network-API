const router = require("express").Router();
const { getThoughts } = require("../../controllers/thoughts.controller");

router.route("/").get(getThoughts);

module.exports = router;
