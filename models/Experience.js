const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectId = mongoose.Types.ObjectId;

const ExperienceSchema = new Schema({
    title: String,
    company: String,
    location: String,
    jobType: String,
    date: String,
    ExperienceId: ObjectId,
    description: String,
});

module.exports = mongoose.model("Experience", ExperienceSchema);
