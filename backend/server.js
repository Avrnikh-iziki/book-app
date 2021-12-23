const express = require("express")
const db = require("./config/db");
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const NewBook = require('./routes/NewBook');
const authRoutes = require('./routes/regostration');
const mybooks = require('./routes/myBooks');
const notification = require('./routes/notification');
const cors=require("cors");
db();
app.use(express.json());
const corsOptions ={
   origin:'*', 
   credentials:true,        
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
app.use('/', NewBook);
app.use('/user', authRoutes);
app.use('/mybooks', mybooks);
app.use('/notification', notification)
app.listen(port, () => {
  console.log(`server listen on port ${port}`)
});