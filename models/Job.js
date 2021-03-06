// Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for a job
const jobSchema = new Schema({
    title: String,
    company: String,
    location: String,
    remote: Boolean,
    jobType: String,
    experience: String,
    seniorityLevel: String,
    aboutCompany: String,
    jobDescription: String,
    responsibilities: String,
    requirements: String,
    salary: String,
    facilities: String,
    employerId: String,
});

// Export Job model
module.exports = mongoose.model("Job", jobSchema);
