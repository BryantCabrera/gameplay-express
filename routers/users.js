/********** REQUIRES **********/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Game = require('../models/game');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
//Index Route
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({});

        res.json({
            status: 200,
            data: 'Get all users successful.',
            users: allUsers
        })
    } catch (err) {
        res.send(err);
    }
});

//Create Route
router.post('/', async (req, res) => {
    let hashedPassword = crypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    req.body.password = hashedPassword;
    try {
        const createdUser = await User.create(req.body);
        res.json({
            status: 200,
            data: 'login successful',
            createdUser: createdUser
        });
        
    } catch (err) {
        res.send(err);
    }
});