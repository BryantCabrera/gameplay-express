/********** REQUIRES **********/
const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Game = require('../models/game');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
//Index Route
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({});

        return allUsers
    } catch (err) {
        res.send(err);
    }
});

