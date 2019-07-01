// Require dependencies for app to work, dependencies need to be installed
const express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;
// database configuration

// connect mongojs to the database variable ceated and include a method to check and log errors if there are issues with mongodb
var db = require("./models");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true });


// create all CRUD routes
// get route
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname + "./public.index.html"));
});

app.get("/scrape", function(req, res) {
  var url = "https://www.psychologytoday.com";

  // First, we grab the body of the html with axios
  axios.get(url +"/us").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("div.blog_entry__text").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.headline = $(this)
        .children("h2")
        .children("a")
        .text();
      result.url =  url + $(this)
        .children("h2")
        .children("a")
        .attr("href");
      result.summary = $(this)
        .children("p.blog_entry__teaser")
        .text()

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});




// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});