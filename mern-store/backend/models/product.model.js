const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productID: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;