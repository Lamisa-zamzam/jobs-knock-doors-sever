const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jobSeekerSchema = new Schema({
    name: String,
    title: String,
    email: { type: String, required: [true, "Please provide an email."] },
    password: {
        type: String,
        required: [true, "Please provide an email."],
    },
    phone: String,
    image: String,
    location: String,
    summary: String,
    skills: [
        {
            type: String,
        },
    ],
});

module.exports = mongoose.model("JobSeeker", jobSeekerSchema);
