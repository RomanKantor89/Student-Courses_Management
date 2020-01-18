// Setup
var mongoose = require("mongoose");
const Credits = require("./creditsSchema");
const Course = require("./coursesSchema");
var Schema = mongoose.Schema;

// Student schema
var studentSchema = new Schema({
  academicProgram: String,
  studentId: String,
  familyName: String,
  givenName: String,
  birthDate: Date,
  email: String,
  academicLevel: Number,
  gpa: Number,
  credits: [Credits],
  coursesSaved: [Course],
  coursesConfirmed: [Course]
});

// Make schemas available to the application
module.exports = studentSchema;
