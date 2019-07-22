const router = require("express").Router();
const clearController = require("../../controllers/clear");

// Route to clear articles
router.get("/", clearController.clearDB);

// Export middleware
module.exports = router;