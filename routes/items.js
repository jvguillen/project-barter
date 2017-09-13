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

router.get('/item/:id', (req, res) => {

});

router.get('/item/:id/update', (req, res) => {
	// Sanitize id passed in. 
	req.sanitize('id').escape();
	req.sanitize('id').trim();

	req.checkBody('name', 'The name is required').notEmpty();
	req.checkBody('images', 'An image is required').notEmpty();
	req.checkBody('quality', 'You must supply the quality of the item').notEmpty();

	req.sanitize('name').escape();

	const item = new Item(
	{ name: req.body.name, images: images, quality: req.body.quality }
	);

  	const errors = req.validationErrors();

    if (errors) { return res.status(200).json(response(res, { item: item, errors: errors })); }

    else {
    	Item.findByIdAndUpdate(req.params.id, item, {}).then((err, item) => {
            res.status(200).json(response(res, {item: item, err: err})
			)
        });
    }

});

router.get('/item/:id/delete', (req, res) => {
	Item.findById(req.params.id);



	Item.find()
    	.then(items => res.status(200).json(response(res, items)));
});

router.get('/user/:id', (req, res) => {

});

router.post('/new', (req, res) => {

	req.checkBody('name', 'The name is required').notEmpty();
  	req.checkBody('quality', 'You must supply the quality of the item').notEmpty();

  	const errors = req.validationErrors();

  	console.dir(req.body);

  	if(errors) { return res.status(200).json(response(res, { errors: errors })); }

  	else {
  		const item = new Item({ name: req.body.name, quality: req.body.quality, _user:req.session.passport.user });
  		item.save().then(err => res.status(200).json(response(res, {item: item, err: err})
			));
  	}
});

module.exports = router;
