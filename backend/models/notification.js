const mongoose = require("mongoose");

const NotSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    not: [
        {
            bookid: String,
            cheked: Boolean,
            messagae: String,
            point: Number,
            name: String
        }
    ],
    point: {
        type: Number
    }

})

const Not = mongoose.model("Not", NotSchema);
module.exports = Not