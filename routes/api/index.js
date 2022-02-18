const router = require("express").Router();
const reactionsRoute = require("./reactions.route");
const thoughtsRoute = require("./thoughts.route");
const userRoute = require("./user.route");

// router.use("/reactions", reactionsRoute);
// router.use("/thoughts", thoughtsRoute);
router.use("/user", userRoute);

module.exports = router;
