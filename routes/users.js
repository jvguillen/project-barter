const express = require('express');
const response = require('../lib/response');
const User = require('../models/user');

const router = express.Router({ mergeParams: true });
/* GET users listing. */
router.get('/', (req, res) => User.find().then(users => res.status(200).json(response(res, users))));

/* GET user profile page. */
router.get('/profile', (req, res) => res.status(200).json(response(res, req.user._id)));

/* GET  items of a specific user */
router.get('/users/:id/items', (req, res) => {
	Item.find({ '_user': req.params.id }).then(item => res.status(200).json(response(res, item)));
});

module.exports = router;
