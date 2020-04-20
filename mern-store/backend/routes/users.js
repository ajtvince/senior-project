const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error here: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const streetAddress = req.body.streetAddress;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const newUser = new User({username, password, name, streetAddress, city, state, zip});
    newUser.save()
        .then(() => res.json('user added!'))
        .catch(err => res.status(400).json('Error here: ' + err));
});

module.exports = router;