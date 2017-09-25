const express = require('express');
const response = require('../lib/response');

const router = express.Router({ mergeParams: true });
const itemHandler = require('../handlers/items');

/* GET items listing. */
router.get('/', (req, res) => {
  // TODO: add validation
  return itemHandler.getAllItems(req.params)
    .then(items => res.status(200).json(response(res, items)));
});

router.get('/:id', (req, res) => {
  // TODO: add validation
  return itemHandler.getOneItemById(req.params.id)
    .then(item => res.status(200).json(response(res, item)));
});

router.post('/', (req, res) => {
  // TODO: add validation
  return itemHandler.createOneItem(req.body)
    .then(items => res.status(200).json(response(res, items)))
    .catch(err => res.status(400).json(response(res, null, err)));
});

module.exports = router;
