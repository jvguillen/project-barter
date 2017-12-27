const express = require('express');
const multer = require('multer'); // file upload library
const response = require('../lib/response');
const Image = require('../models/image');
const fs = require('fs');
const router = express.Router({ mergeParams: true });

/**
 * Set destiny folder for uploaded images
 * Rename uploaded image
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    	const path = `uploads/${req.body.item}/`;

    	// set image path
    	req.body.path = path;

    	if(! fs.existsSync(path)) { fs.mkdir(path) }

        cb(null, path) // destiny folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // rewrite filename
  }
});

var upload = multer({ storage: storage });

/* GET images listing. */
router.get('/', (req, res) => {
	Image.find()
		.populate('_item')
		.then(items => res.status(200).json(response(res, items)));
});

/* GET an image by id */
router.get('/:id', (req, res) => {
	Image.findById(req.params.id)
		.populate('_item')
		.then(image => res.status(200).json(response(res, image)));
});

/* POST create a new image */
router.post('/', upload.single('image'), (req, res) => {

	// validate input fields
	req.checkBody('width', 'Image width is required').notEmpty();
	req.checkBody('height', 'Image height is required').notEmpty();
	req.checkBody('featured', 'Featured field is required').notEmpty();

	const err = req.validationErrors();

	if(err) { return res.status(400).json(response(res, err, 'Bad Request')); }

	else {

		const image = new Image({
			name: req.file.originalname,
			path: req.body.path,
			width: req.body.width,
			height: req.body.height,
			featured: req.body.featured,
			_item: req.body.item
		});

		image.save().then(err => res.status(200).json(response(res, { image: image, err: err })));
	}
});

/* PUT Update an image */
router.put('/:id', upload.single('image'), (req, res) => {
	// Sanitize id passed in.
	req.sanitize('id').escape();
	req.sanitize('id').trim();

	req.sanitize('name').escape();

	req.checkBody('width', 'Image width is required').notEmpty();
	req.checkBody('height', 'Image height is required').notEmpty();
	req.checkBody('featured', 'Featured field is required').notEmpty();

	const err = req.validationErrors();

	if(err) { return res.status(400).json(response(res, err, 'Bad Request')); }

	else {

		if (req.file != undefined) {
			req.body.name = req.file.originalname;
		}

		Image.findByIdAndUpdate(req.params.id, req.body).then(image => res.status(200).json(response(res, image)));

	}
});

/* DELETE an image */
router.delete('/:id', (req, res) => {
	// Sanitize id passed in.
	req.sanitize('id').escape();
	req.sanitize('id').trim();

	Image.findByIdAndUpdate(req.params.id, { deleted: true }).then(image => res.status(200).json(response(res, image)));

});

module.exports = router;
