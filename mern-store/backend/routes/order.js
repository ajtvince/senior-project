const router = require('express').Router();
let Order = require('../models/order.model');

router.route('/add').post((req, res) => {
    const orderNum = req.body.orderNum;
    const orderUser = req.body.orderUser;
    const orderPrice = req.body.orderPrice;
    const orderItems = req.body.orderItems;
    const shippingAddress = req.body.shippingAddress;
    const cardNumber = req.body.cardNumber;
    const expDate = req.body.expDate;
    const cardName = req.body.cardName;
    const secCode = req.body.secCode;
    const newOrder = new Order({orderNum, orderUser, orderPrice, orderItems, shippingAddress, cardNumber, expDate, cardName, secCode});
    newOrder.save()
        .then(() => res.json('order placed'))
        .catch(err => res.status(400).json('Error here: ' + err));
});

module.exports = router;