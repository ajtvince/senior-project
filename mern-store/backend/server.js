const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected");
});

const productRouter = require('./routes/products');
const userRouter = require('./routes/users');
const orderRouter = require('./routes/order');

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/order', orderRouter);


app.listen(port, () => {
    console.log(`server running on ${port}`);
});