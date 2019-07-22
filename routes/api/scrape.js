// Require in dependencies
const router = require('express').Router();
const scrapeController = require('../../controllers/scrape.js');

// '/api/scrape/' route
router.get('/', scrapeController.scrapeHeader);

// Export middleware
module.exports = router;