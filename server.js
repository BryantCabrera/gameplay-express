/********** REQUIRES **********/
require('dotenv').config();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

require('./db/db');

/********** MIDDLEWARE **********/
app.use(session({
    secret: "THIS IS A RANDOM STRING SECRET",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));


/********** ROUTERS/CONTROLLERS **********/


/********** LISTENER **********/
app.listen(process.env.PORT, () => {
    console.log('Server is listening on port 3000.');
});