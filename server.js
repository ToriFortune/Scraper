// Require dependencies for app to work, dependencies need to be installed
var express = require("express");
var mongojs = require("mongojs");
var axios = require("axious");
var cheerio = require("cheerio");

// Initialize Express
var app = express();
var databaseUrl = "scraper"
var collection = ["scapedData"]
// connect mongojs to the database variable ceated and include a method to check and log errors if there are issues with mongodb
db.on("error", function(error) {
    console.log("Database Error:", error);
  });

// scrape data from chosen site to be stored in the mongodb database using a .get function

