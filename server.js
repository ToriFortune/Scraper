// Require dependencies for app to work, dependencies need to be installed
var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();
// database configuration
var databaseUrl = "scraper"
var collection = ["scrapedInfo"]
// connect mongojs to the database variable ceated and include a method to check and log errors if there are issues with mongodb
var db = mongojs(databaseUrl,collection);
db.on("error", function(error) {
    console.log("Database Error:", error);
  });

// create all CRUD routes
// get route
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname + "./public.index.html"));
});







// scrape data from chosen site to be stored in the mongodb database using a .get function

