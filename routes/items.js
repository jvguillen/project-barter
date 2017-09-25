const express = require('express');
const response = require('../lib/response');
const Item = require('../models/item');

const router = express.Router({ mergeParams: true });

/* GET items listing. */
router.get('/', (req, res) => {
	Item.find()
		.populate('_user')
		.then(items => res.status(200).json(response(res, items)));
});

/* GET an item by id */
router.get('/items/:id', (req, res) => {
	Item.findById(req.params.id)
		.populate('_user')
		.then(item => res.status(200).json(response(res, item)));
});

/* GET an item's images */
router.get('/item/:id/images', (req, res) => {
	Image.find({ '_item': req.params.id }).then(images => res.status(200).json(response(res, images)));
});

/* POST Create a new item */
router.post('/items', (req, res) => {

	// validate input fields
	req.checkBody('name', 'The name is required').notEmpty();
  req.checkBody('quality', 'You must supply the quality of the item').notEmpty();

	const err = req.validationErrors();

	if(err) { return res.status(200).json(response(res, { errors: err })); }

	else {

		const item = new Item({ name: req.body.name, quality: req.body.quality, _user: req.body.user });
		item.save().then(err => res.status(200).json(response(res, { item: item, err: err })));
	}
});

/* PUT Update an item */
router.put('/items/:id', (req, res) => {
	// Sanitize id passed in.
	req.sanitize('id').escape();
	req.sanitize('id').trim();

	req.sanitize('name').escape();
	req.sanitize('quality').escape();

	// validate input fields
	req.checkBody('name', 'The name is required').notEmpty();
  req.checkBody('quality', 'You must supply the quality of the item').notEmpty();
	req.checkBody('active', 'You must supply the status of the item').notEmpty();

	const err = req.validationErrors();

	if(err) { return res.status(200).json(response(res, { err: err })) }

	else {

		const item = new Item({ name: req.body.name, quality: req.body.quality, active: req.body.active });

		Item.findByIdAndUpdate(req.params.id, item, {}).then(err => res.status(200).json(response(res, { item: item, err: err })));

	}
});

/* DELETE remove an item by id */
router.delete('/items/:id', (req, res) => {
	// Sanitize id passed in.
	req.sanitize('id').escape();
	req.sanitize('id').trim();

	const item = new Item({ deleted: true });

	Item.findByIdAndUpdate(req.params.id, item, {}).then(err => res.status(200).json(response(res, { item: item, err: err })));

});

module.exports = router;
