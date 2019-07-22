
// dependencies
const express = require("express");
exphbs= require("express-handlebars");
var mongoose = require("mongoose");
bodyParser = require("body-parser");
var axios = require("axios");
var cheerio = require("cheerio");
var path = require("path");
// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;
// require routes
// routes = require("./controllers/api");


var app = express();

// database configuration

// connect mongojs to the database variable ceated and include a method to check and log errors if there are issues with mongodb
var db = require("./models");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Make the public folder static 
app.use(express.static("public"));

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Have every request go through the route middleware
app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);



// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});


























