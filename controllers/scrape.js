
const db = require('../models');

// scrape function
const scrape = require('../scripts/scrape');

module.exports = {
    scrapeHeader: function(req, res) {
        return scrape()
        .then(function(articles) {
            return db.Header.create(articles)
                .then(articles => {
                    if (articles.length === 0) {
                        res.json({message: 'No news '})
                    } else {
                        res.json({message: articles.length + ' News'})
                    }
                })
                .catch(error => console.log("unable to insert articles", error))
        })
        .catch(function(error) {
            res.status(500).json({ error })
        })
    }
};