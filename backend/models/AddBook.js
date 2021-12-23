const mongoose = require("mongoose");
const BooksSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    bookCover: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        require: true
    },
    language: {
        type: String,
        require: true
    },
    pageNo: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    },
    readed: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    backgroundColor: {
        type: String,
        require: true
    },
    navTintColor: {
        type: String,
        require: true
    },
    categoryName: {
        type: String,
        require: true
    },
    userid: {
        type: String,
        require: true
    },
    
    date: {
        type: String,
        default: Date.now
    }
})

const Book = mongoose.model("book", BooksSchema);
module.exports = Book;