// Require in dependencies
const router = require("express").Router();
const apiRoutes = require("./api");
const viewRoutes = require("./view");

// Sets up router for the view

router.use("/api", apiRoutes);
router.use("/", viewRoutes);

// Exports middleware
module.exports = router;