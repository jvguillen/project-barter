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

});

router.get('/item/:id/update', (req, res) => {
	//Sanitize id passed in. 
    req.sanitize('id').escape();
    req.sanitize('id').trim();
    
    req.checkBody('name', 'The name is required').notEmpty();
  	req.checkBody('images', 'An image is required').notEmpty();
  	req.checkBody('quality', 'You must supply the quality of the item').notEmpty();

  	req.sanitize('name').escape();

  	const item = new Item(
  		{name: req.body.name, images: images, quality: req.body.quality	}
  	);

  	let errors = req.validationErrors();

    if (errors) { return res.status(200).json(response(res, { item: item, errors: errors })); }

    else {
    	Item.findByIdAndUpdate(req.params.id, item, {}).then((err, item) => {
            res.status(200).json(response(res, {item: item, err: err})
			)
        });
    }

});

router.get('/item/:id/delete', (req, res) => {
	Item.find()
    	.then(items => res.status(200).json(response(res, items)));
});

router.get('/user/:id', (req, res) => {

});

router.post('/new', (req, res) => {

	req.checkBody('name', 'The name is required').notEmpty();
  	req.checkBody('images', 'An image is required').notEmpty();
  	req.checkBody('quality', 'You must supply the quality of the item').notEmpty();

  	let errors = req.validationErrors();

  	let images = req.body.images;

  	let item = new Item(
  		{name: req.body.name, images: images, quality: req.body.quality	}
  	);

  	if(error) { return res.status(200).json(response(res, { item: item, errors: errors })); }

  	else {
  		item.save().then(err => res.status(200).json(response(res, {item: item, err: err})
			));
  	}
});

module.exports = router;
