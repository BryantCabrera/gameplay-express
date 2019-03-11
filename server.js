/********** REQUIRES **********/
require('dotenv').config();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');

require('./db/db');

const usersRouter = require('./routers/users');

/********** MIDDLEWARE **********/
app.use(session({
    secret: "THIS IS A RANDOM STRING SECRET",
    resave: false,
    saveUninitialized: false
}));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));


/********** ROUTERS/CONTROLLERS **********/
app.use('/users', usersRouter);

/********** LISTENER **********/
app.listen(process.env.PORT, () => {
    console.log('Server is listening on port 3000.');
});