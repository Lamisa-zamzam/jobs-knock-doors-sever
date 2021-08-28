// Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for employers
const employerSchema = new Schema({
    name: String,
    email: { type: String, required: [true, "Please provide an email."] },
    password: {
        type: String,
        required: [true, "Please provide an email."],
    },
    phone: String,
});

// Export Employer model
module.exports = mongoose.model("Employer", employerSchema);
