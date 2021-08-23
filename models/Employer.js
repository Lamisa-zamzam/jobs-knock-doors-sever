const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employerSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
});

module.exports = mongoose.model("Employer", employerSchema);
