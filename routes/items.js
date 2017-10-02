const express = require('express');
const response = require('../lib/response');
const Item = require('../models/item');
const Image = require('../models/image');

const router = express.Router({ mergeParams: true });

/* GET items listing. */
router.get('/', (req, res) => {
	Item.find()
		.populate('_user')
		.then(items => res.status(200).json(response(res, items)));
});

/* GET an item by id */
router.get('/:id', (req, res) => {
	Item.findById(req.params.id)
		.populate('_user')
		.then(item => res.status(200).json(response(res, item)));
});

/* GET an item's images */
router.get('/:id/images', (req, res) => {
	Image.find({ '_item': req.params.id }).then(images => res.status(200).json(response(res, images)));
});

/* POST Create a new item */
router.post('/', (req, res) => {

	// validate input fields
	// this needs to return appropriate error code
	req.checkBody('name', 'The name is required').notEmpty();
	req.checkBody('quality', 'You must supply the quality of the item').notEmpty();

	const err = req.validationErrors();

	if(err) { return res.status(400).json(response(res, err, 'Bad Request')); }

	else {
		const item = new Item({
			name: req.body.name,
			quality: req.body.quality,
			_user: req.body.user ,
			active: true
		});
		item.save().then(item => res.status(200).json(response(res, item)));
	}
});

/* PUT Update an item */
router.put('/:id', (req, res) => {
	// Sanitize id passed in.
	req.sanitize('id').escape();
	req.sanitize('id').trim();
	req.sanitize('name').escape();
	req.sanitize('quality').escape();

	// validate input fields
	// TODO: identify what is required

	const err = req.validationErrors();

	if(err) { return res.status(400).json(response(res, err, 'Bad Request')) }

	else {
		//TODO: find a way to return the updated item instead of the old one.
		Item.findByIdAndUpdate(req.params.id, req.body).then(item => res.status(200).json(response(res, item)));

	}
});

/* DELETE remove an item by id */
router.delete('/:id', (req, res) => {
	// Sanitize id passed in.
	req.sanitize('id').escape();
	req.sanitize('id').trim();

	Item.findByIdAndUpdate(req.params.id, { active: false, deleted: true }).then(item => res.status(200).json(response(res)));

});

module.exports = router;
