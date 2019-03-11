const mongoose = require('mongoose');

const userGameSchema = new mongoose.Schema({
    title: String,
    author: String,
    wins: Number,
    losses: Number,
    draws: Number
});

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: String,
    games: [userGameSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;