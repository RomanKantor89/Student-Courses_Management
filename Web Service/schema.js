// Setup
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// person schema

var personSchema = new Schema({
  firstName: String,
  lastName: String,
  birthDate: Date,
  email: String,
  creditScore: Number,
  rating: Number
});

// Make schemas available to the application
module.exports = personSchema;
