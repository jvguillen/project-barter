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

router.get('/item/:id', (req, res) => {
	Item.findById(req.params.id)
		.populate('_user')
		.then(item => res.status(200).json(response(res, item)));
});

router.post('/item/:id/update', (req, res) => {
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

router.post('/item/:id/delete', (req, res) => {
	// Sanitize id passed in.
	req.sanitize('id').escape();
	req.sanitize('id').trim();

	const item = new Item({ deleted: true });

	Item.findByIdAndUpdate(req.params.id, item, {}).then(err => res.status(200).json(response(res, { item: item, err: err })));

});

router.get('/user/:id', (req, res) => {
	Item.find({ '_user': req.params.id }).then(item => res.status(200).json(response(res, item)));
});

router.post('/new', (req, res) => {

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

module.exports = router;
