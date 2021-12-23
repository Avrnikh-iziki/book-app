const Not = require('../models/notification')

const allNot = async (req, res) => {
    const { userid } = req.body
    Not.findOne({ _id: userid }, (err, docs) => {
        if (err) res.json({ message: { err: err } })
        else res.json({ message: { docs: docs } })
    })
}
const delNot = async (req, res) => {
    const { userid, notid } = req.body
    Not.updateOne({ _id: userid }, {
        $pull:
        {
            not: { _id: notid }
        }
    }, (err, docs) => {
        if (err) res.json({ message: { err: err } })
        else res.json({ message: { success: "notification deleted" } })
    })
}
const readNot = async (req, res) => {
    const { userid, notid , point } = req.body
    Not.updateOne({ _id: userid, "not._id": notid }, {
        $set:
        {
            "not.$.cheked": true
        }
    }, (err, docs) => {
        if (err) res.json({ message: { err: err } })
        else {
            Not.updateOne({ _id: userid }, {
                $inc:
                {
                    "point": point
                }
            }, (err, docs) => {
                if (err) res.json({ message: { err: err } })
                else res.json({ message: { success: "notification readed" } })
            })
        }
    })
}
module.exports = {
    allNot,
    delNot,
    readNot,
}