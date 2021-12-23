require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("data base conected successfly")
    } catch (err) {
        console.log(err)
        console.error("MongoDB conection FAIL" + err)
        process.exit(1)
    }
};


module.exports = connectDB