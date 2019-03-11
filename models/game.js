const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: String,
    description: String,
    code: String
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;