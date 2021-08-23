const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectId = mongoose.Types.ObjectId;

const jobSeekerSchema = new Schema({
    title: String,
    company: String,
    location: String,
    jobType: String,
    date: String,
    jobSeekerId: ObjectId,
    description: String,
});

module.exports = mongoose.model("JobSeeker", jobSeekerSchema);
