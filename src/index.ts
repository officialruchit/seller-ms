import express from "express";
import db from './config/db';
import bodyParser from 'body-parser';
import sellerRout from './routes/sellerRoute'
const app = express()
const PORT = 3322
db()
app.use(bodyParser.json());
app.use('/seller', sellerRout)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});