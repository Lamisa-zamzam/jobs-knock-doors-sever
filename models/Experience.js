// Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// MongoDB data type ObjectId
const ObjectId = mongoose.Types.ObjectId;

// Schema for Experience in a job seeker's profile
const ExperienceSchema = new Schema({
    title: String,
    company: String,
    location: String,
    jobType: String,
    date: String,
    ExperienceId: ObjectId,
    description: String,
});

// Export Experience model
module.exports = mongoose.model("Experience", ExperienceSchema);
