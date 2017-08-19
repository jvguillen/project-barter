var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const db = req.db;
  const collection = db.get('users');

  collection.find({},{},function(err, users){
      res.status(200).json(users)
  });
});

module.exports = router;
