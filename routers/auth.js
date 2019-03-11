/********** REQUIRES **********/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
// Log-In
router.post('/login', async (req, res) => {
    try {
        //finds logged in user 
        //getting email from req.body (username was attached via form and kept in req.body)
        const loggedUser = await User.findOne({ email: req.body.email });
        console.log(loggedUser, ' this is loggedUser');
        //if user exists
        if (loggedUser) {
            //checks if the passwords match, if they do, redirect to page, if not, keep on splash page with message
            //compares password from req.body to user's hashedpassword in database
            if (bcrypt.compareSync(req.body.password, loggedUser.password) && req.body.email === loggedUser.email) {
                //once user is found, create a session
                req.session.user = loggedUser;
                req.session.message = '';
                req.session.logged = true;

                const {_id,username,email,img,games } = loggedUser
                const responseLoggedUser = {
                    _id: _id,
                    username: username,
                    email: email,
                    img: img, 
                    games: games
                }
                // res.json({ loggedUser, isLoggedIn: true });
                res.json({
                    status: 200,
                    data: 'login successful',
                    user: responseLoggedUser
                })
            } else {
                // res.json({ isLoggedIn: false });
                res.json({
                    data: 'The password you entered is incorrect!'
                })
            }
        } else {
            res.json({
                status: 200,
                data: 'That user doesn\'t exist!'
            });
        }
    } catch (err) {
        res.json({
            status: 200,
            data: 'Couldn\'t connect to database.'
        });
    }
});


// Log-Out
router.get('/logout', (req, res) => {
    req.session.destroy((err) => err ? res.json(err) : res.json('User successfully logged out.'));
});

module.exports = router;