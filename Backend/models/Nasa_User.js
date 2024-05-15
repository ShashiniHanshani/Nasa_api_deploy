const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nasauserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: [true, "Email address already taken"], },
    password: { type: String, required: true },

})

const NasaUser = mongoose.model("NasaUser", nasauserSchema);
module.exports = NasaUser;