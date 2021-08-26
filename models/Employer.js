const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employerSchema = new Schema({
    name: String,
    email: { type: String, required: [true, "Please provide an email."] },
    password: {
        type: String,
        required: [true, "Please provide an email."],
    },
    phone: String,
});

module.exports = mongoose.model("Employer", employerSchema);
