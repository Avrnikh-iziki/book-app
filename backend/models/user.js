const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        require: true
    },
    point: {
        type: Number,
        required:true
    },
    date: {
        type: String,
        default: Date.now
    }
})

const BoUser = mongoose.model("user", UserSchema);
module.exports = BoUser;