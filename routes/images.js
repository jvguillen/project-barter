const express = require('express');
const response = require('../lib/response');
const Image = require('../models/image');

const router = express.Router({ mergeParams: true });

/* GET items listing. */
router.get('/', (req, res) => {
	Image.find()
		.populate('_item')
		.then(items => res.status(200).json(response(res, items)));
});

router.get('/image/:id', (req, res) => {
	Image.findById(req.params.id)
		.populate('_item')
		.then(image => res.status(200).json(response(res, image)));
});

router.post('/image/:id/update', (req, res) => {
	// Sanitize id passed in.
	req.sanitize('id').escape();
	req.sanitize('id').trim();

	req.sanitize('name').escape();

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('path', 'File path is required').notEmpty();
	req.checkBody('width', 'Image width is required').notEmpty();
	req.checkBody('height', 'Image height is required').notEmpty();
	req.checkBody('featured', 'Featured field is required').notEmpty();

	const err = req.validationErrors();

	if(err) { return res.status(200).json(response(res, { err: err })) }

	else {

		const image = new Image({ name: req.body.name, path: req.body.path, width: req.body.width, height: req.body.height, featured: req.body.featured });

		Image.findByIdAndUpdate(req.params.id, image, {}).then(err => res.status(200).json(response(res, { image: image, err: err })));

	}
});

router.post('/image/:id/delete', (req, res) => {
	// Sanitize id passed in.
	req.sanitize('id').escape();
	req.sanitize('id').trim();

	const image = new Image({ deleted: true });

	Image.findByIdAndUpdate(req.params.id, item, {}).then(err => res.status(200).json(response(res, { item: item, err: err })));

});

router.get('/item/:id', (req, res) => {
	Image.find({ '_item': req.params.id }).then(images => res.status(200).json(response(res, images)));
});

router.post('/new', (req, res) => {

	// validate input fields
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('path', 'File path is required').notEmpty();
	req.checkBody('width', 'Image width is required').notEmpty();
	req.checkBody('height', 'Image height is required').notEmpty();
	req.checkBody('featured', 'Featured field is required').notEmpty();

	const err = req.validationErrors();

	if(err) { return res.status(200).json(response(res, { errors: err })); }

	else {

		const image = new Image({ name: req.body.name, path: req.body.path, width: req.body.width, height: req.body.height, featured: req.body.featured, _item: req.body.item });
		image.save().then(err => res.status(200).json(response(res, { image: image, err: err })));
	}
});

module.exports = router;
