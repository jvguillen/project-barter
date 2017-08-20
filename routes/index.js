"user strict";

var express = require('express');
var router = express.Router();
const response = require('../lib/response');

/* GET home page. */
router.get('/', function(req, res, next) {
   res.status(200).json(response(res, "Connected!"));
});

module.exports = router;
