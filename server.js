
// dependencies
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// Set up the port to be either the host's designated port or 3002
const PORT = process.env.PORT || 3002;

// Initiate express
const app = express();
// require routes
const routes = require("./routes");

// Parse as json
app.use(express.urlencoded({ extended: true }));
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




























