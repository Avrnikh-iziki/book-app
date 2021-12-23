const myBooks = require('../models/MyBooks')
const BoUser = require('../models/user')

const bookReaded = async (req, res) => {
    const { userid } = req.body
    myBooks.findById(userid)
        .then(docs => { res.json({ docs: docs }) })
        .catch(err => { res.json({ err: err }) })
}
const newBookRead = async (req, res) => {
    const { userid, bookid, completion, lastRead, date } = req.body
    myBooks.updateOne({ _id: userid }, {
        $addToSet: {
            myBooks: {
                bookid,
                completion,
                lastRead,
                date
            }
        }
    }, { upsert: true }, (err, docs) => {
        if (err) res.json({ message: { faild: err } })
        else res.json({ message: { sucs: "you started A new book", docs } })
    })
}
const upBook = async (req, res) => {
    const { userid, bookid, completion, lastRead, date } = req.body
    myBooks.updateMany({ _id: userid, "myBooks.bookid": bookid }, {
        $set:
        {
            "myBooks.$.completion": completion,
            "myBooks.$.lastRead":lastRead,
            "myBooks.$.date":date
        }
    }, (err, docs) => {
        if (err) res.json({ message: { faild: err } })
        else res.json({ message: { sucs: "you started A new book", docs } })
    })
}
const bookmark = async (req, res) => {
    const { userid, bookid } = req.body
    myBooks.findByIdAndUpdate(userid, { $addToSet: { bookmark: bookid } }, (err, docs) => {
        if (err) res.json({ message: { err: err } })
        else res.json({ message: { success: "a New book addet to you collection", docs: docs.bookmark } })
    })
}
const delbookmark = async (req, res) => {
    const { id, userid } = req.body
    myBooks.findByIdAndUpdate(userid, { $pull: { bookmark: id } }, (err, docs) => {
        if (err) res.json({ message: { err: err } })
        else res.json({ message: { success: " You started a new book" } })
    })
}
module.exports = {
    bookReaded,
    newBookRead,
    bookmark,
    delbookmark,
    upBook
}