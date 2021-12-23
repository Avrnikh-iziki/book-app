const mongoose = require("mongoose");
const BookBodySchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    book: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
})

const BookBody = mongoose.model("bookBody", BookBodySchema);
module.exports = BookBody;
