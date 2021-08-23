const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectId = mongoose.Types.ObjectId;

const jobSeekerSchema = new Schema({
    name: String,
    title: String,
    email: String,
    password: String,
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
