// Require in dependencies
const router = require("express").Router();
const db = require("../../models");

// This route renders the homepage
router.get("/", function(req, res) {
  console.log("loading");

  res.render("articles", 
    {thing: ""});//,
    // function(err, html) {
    //   res.send(html); 
      
    // });
});

router.get("/news/*", function(req, res) {

  let news_url = 'https://www.psychologytoday.com/us' + req.params[0];
  res.send("<meta http-equiv=\"refresh\" content=\"0; URL='"+news_url+"'\" />");

});

// This route renders the saved handlebars page
router.get("/articles", function(req, res) {
  console.log(req);
  db.Header.find({ saved: true })
    .sort({ date: -1 })
    .then(function(dbArticles) {
      console.log(dbArticles);
      res.render("articles", { articles: dbArticles, header:req.header });
    });
});

module.exports = router;