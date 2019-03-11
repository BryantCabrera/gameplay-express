/********** REQUIRES **********/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
// login
// Log-In
router.post('/login', async (req, res) => {
    try {
        //finds logged in user 
        //getting email from req.body (username was attached via form and kept in req.body)
        const loggedUser = await User.findOne({ email: req.body.email });

        //if user exists
        if (loggedUser) {
            //checks if the passwords match, if they do, redirect to page, if not, keep on splash page with message
            //compares password from req.body to user's hashedpassword in database
            if (bcrypt.compareSync(req.body.password, loggedUser.password) && req.body.email === loggedUser.email) {
                //once user is found, create a session
                req.session.user = loggedUser;
                req.session.message = '';
                req.session.logged = true;
                
                res.json({ loggedUser, isLoggedIn: true });
            } else {
                res.json({ isLoggedIn: false });
            }
        } else {
            res.json({
                status: 200,
                data: 'login successful',
                user: loggedUser
            });
        }
    } catch (err) {
        res.send(err);
    }
});

// logout