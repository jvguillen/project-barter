"use strict";

const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    age: Number,
    email: {type: String, required: true},
    updated: { type: Date, default: Date.now },
    active: Boolean
});

const usersModel = mongoose.model('Users', usersSchema);

module.exports = usersModel;
