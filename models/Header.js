const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const HeaderSchema = new Schema({
  // `title` is required and of type String
  header: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  url: {
    type: String,
    required: true
  },
  date: {
   type:Date,
   default: Date.now 
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Header with an associated Note
  // note: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Note"
  saved: {
    type:Boolean,
    default: false
  }
  
});

// This creates our model from the above schema, using mongoose's model method
const Header = mongoose.model("Header", HeaderSchema);

// Export the Header model
module.exports = Header