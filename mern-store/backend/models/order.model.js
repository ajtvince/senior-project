const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    orderNum: { type: Number, required: true },
    orderUser: { type: String, required: true },
    orderPrice: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    orderItems: { type: Array, required: true },
    cardNumber: { type: Number, required: true },
    expDate: { type: String, required: true },
    cardName: { type: String, required: true },
    secCode: { type: Number, required: true },
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;