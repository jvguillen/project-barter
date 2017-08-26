const express = require('express');
const response = require('../lib/response');

const router = express.Router({ mergeParams: true });

/* GET home page. */
router.get('/', (req, res) => res.status(200).json(response(res, 'Connected!')));

module.exports = router;
