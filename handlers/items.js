const Items = require('../models/item');
const Users = require('../models/user');

// TODO: make function recieve params for filters
const getAllItems = () => Items.find().populate('_user');

const getOneItemById = id => Items.findById(id);

const createOneItem = (params) => {
  return Users.findById(params._user).then((user) => {
    if (!user) throw new Error('Invalid user');
    const newItem = new Items(params);
    return newItem.save().then(doc => doc).catch((err) => { throw err; });
  }).catch((err) => { throw err; });
};

module.exports = { getAllItems, getOneItemById, createOneItem };
