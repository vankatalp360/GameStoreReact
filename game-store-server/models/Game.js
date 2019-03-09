const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let gameSchema = new mongoose.Schema({
  title: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: [true, 'Game already exists.']},
  genres: [{type: mongoose.Schema.Types.String}],
  developer: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  trailer: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  publisher: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  languages: [{type: mongoose.Schema.Types.String}],
  description: {type: mongoose.Schema.Types.String},
  price: {type: mongoose.Schema.Types.Number, required: REQUIRED_VALIDATION_MESSAGE},
  images: [{type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE}],
  likes: [{type: mongoose.Schema.Types.String}]
})

let Game = mongoose.model('Game', gameSchema)

module.exports = Game