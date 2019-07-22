// Require in routes
const router = require('express').Router();
const scrapeRoutes = require('./scrape');
const noteRoutes = require('./notes');
const headersRoutes = require('./headers');
const clearRoutes = require('./clear');

// Set up middleware; these routes all start with '/api'
router.use('/scrape', scrapeRoutes);
router.use('/notes', noteRoutes);
router.use('/headers', headersRoutes);
router.use('/clear', clearRoutes);

// Export middleware
module.exports = router;