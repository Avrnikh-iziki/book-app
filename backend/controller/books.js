const Book = require('../models/AddBook')
const BookBody = require('../models/bookBody')
const Not = require('../models/notification')

const GetBook = async (req, res) => {
    const { id } = req.body
    BookBody.findById(id)
        .then(docs => {
            res.json({ docs: docs })
        })
        .catch(err => {
            res.json({ message: { err, err } })
        })


}

const GetAllBooks = async (req, res) => {
    Book.find()
        .sort({ _id: -1 })
        .then(books => {
            res.send(books)
        })
        .catch(err => {
            res.json({ message: { err: err } })
        })
}

const AddNewBook = async (req, res) => {
    const {
        bookName,
        bookCover,
        language,
        pageNo,
        author,
        genre,
        description,
        backgroundColor,
        navTintColor,
        categoryName,
        book,
        id,
    } = req.body

    const newBook = new Book({
        bookName,
        bookCover,
        language,
        pageNo,
        author,
        genre,
        description,
        backgroundColor,
        navTintColor,
        categoryName,
        readed: 0,
        rating: 0,
        userid: id,
    })

    try {
        const bookdetail = await newBook.save();
        if (!bookdetail._id) return res.json({ message: { faild: "faild to add a new book" } })

        const bookbody = new BookBody({ _id: bookdetail._id, book: book })
        const booktext = await bookbody.save()

        res.json({ message: { sucs: "A new book Added" } })
    } catch (err) {
        return res.json({ message: { faild: err } })
    }

}

const DeleteBook = async (req, res) => {
    res.json({ delet: "delet one book" })
}

const views = async (req, res) => {
    const { bookid, userid, name, point } = req.body
    Book.findByIdAndUpdate(bookid, { $inc: { readed: 1 } }, (err, docs) => {
        if (err) res.json({ message: { err: err } })
        else {
            if (userid !== docs.userid) {
                Not.updateOne({ _id: docs.userid }, {
                    $push: {
                        not: {
                            bookid: bookid,
                            cheked: false,
                            messagae: point == 5 ? `visited your book , you have new  ${point} points` : `start reading your book , you have new  ${point} points`,
                            point: point,
                            name: name
                        }
                    }
                }, { upsert: true }, (err, docs) => {
                    if (err) res.json({ message: { err: err } })
                    else res.json({ message: { success: "not sended" } })
                })
            } else {
                res.json({ message: { success: "new visite to your book" } })
            }
        }
    })
}

module.exports = {
    GetAllBooks,
    GetBook,
    AddNewBook,
    DeleteBook,
    views,
}