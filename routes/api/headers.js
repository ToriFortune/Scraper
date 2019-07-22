// Require in dependencies
const router = require("express").Router();
const headerController = require("../../controllers/header");

// Routes dealing with the headers
router.get("/", headerController.findAll);
router.delete("/:id", headerController.delete);
router.put("/:id", headerController.update);

// Exports middleware
module.exports = router;