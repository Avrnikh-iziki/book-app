const mongoose = require("mongoose");

const MyBooksSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    myBooks: [
        {
            bookid: String,
            completion: String,
            lastRead: String,
            date:String,
        }
    ],
    bookmark:[],
    date: {
        type: String,
        default: Date.now
    }
})

const MyBooks = mongoose.model("MyBooks", MyBooksSchema);
module.exports = MyBooks