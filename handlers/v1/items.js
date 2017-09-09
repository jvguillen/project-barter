const Items = require('../../models/item');
const Users = require('../../models/user');

// TODO: make function recieve params for filters
const getAllItems = () => { return Items.find().populate('_user'); }

const getOneItemById = (id) => { return Items.findById(id); }

const createOneItem = (params) => {
  return Users.findById(params._user).then(user => {
    if (user) {
      const newItem = new Items(params);
      return newItem.save().then(doc => doc).catch((err) => { throw err; });
    } else {
      throw "Invalid user";
    }

  }).catch(err => { throw err });

}

module.exports = { getAllItems, getOneItemById, createOneItem }
