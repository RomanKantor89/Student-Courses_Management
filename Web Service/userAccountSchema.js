// Setup
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// courses schema
var userAccountSchema = new Schema({
    userName: String,
	fullName: String,
	password: String,
	statusActivated: Boolean,
	statusLocked: Boolean,
	role: String,
	claims: [String]
});

// Make schemas available to the application
module.exports = userAccountSchema;
