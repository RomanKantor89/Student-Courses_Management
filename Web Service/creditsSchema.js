// Setup
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// student credits schema

var creditsSchema = new Schema({
  courseCode: String,
  courseName: String,
  termCompleted: String,
  gradeEarned: String
});

// Make schemas available to the application
module.exports = creditsSchema;
