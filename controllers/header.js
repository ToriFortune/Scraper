
const db = require("../models");

module.exports = {
  // CRUD
  findAll: function(req, res) {
    db.Header
      .find(req.query)
      .sort({ date: -1 })
      .then(function(dbHeader) {
        res.json(dbHeader);
      });
  },
  // Delete/destroy
  delete: function(req, res) {
    db.Header.remove({ _id: req.params.id }).then(function(dbHeader) {
      res.json(dbHeader);
    });
  },
  // Update puy 
  update: function(req, res) {
    console.log(req.params.id);
    
    db.Header.findOneAndUpdate({ _id: req.params.id }, { $set: req.body },
       { new: true }).then(function(dbHeader) {
      res.json(dbHeader);
    });

  }
};