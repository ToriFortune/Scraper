// Requires in dependencies
const axios = require('axios');
const cheerio = require('cheerio');

// Function to scrape new headers from Psychology Today
module.exports = function() {
    return new Promise((resolve, reject) => {
        axios.get('https://www.psychologytoday.com/us')
            .then(function (response) {
                const $ = cheerio.load(response.data)
                const articles = []
                $('h2.blog_entry__title').each(function(i, element) {
                    const url = $(this).children('a').attr('href')
                    const header = $(this).children('a').text().trim()
                    if (url && header) {
                        const newHeader = {
                            header: header,
                            url: url
                        }
                        console.log(newHeader);
                        articles.push(newHeader);
                    }
                })
                return resolve(articles);
            })
            .catch(error => reject(error));
    })
}