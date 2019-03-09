const express = require('express')
const authCheck = require('../config/auth-check')
const Game = require('../models/Game')

const router = new express.Router()

function validateGameCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.price = parseFloat(payload.price)

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.name = 'Game name must be at least 3 symbols.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10 || payload.description.length > 200) {
    isFormValid = false
    errors.description = 'Description must be at least 10 symbols and less than 120 symbols.'
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false
    errors.price = 'Price must be a positive number.'
  }

  if (!payload || typeof payload.developer !== 'string' || payload.developer.length < 3) {
    isFormValid = false
    errors.name = 'Developer must be at least 3 symbols.'
  }

  if (!payload || typeof payload.trailer !== 'string' || !(payload.trailer.startsWith('https://') || payload.trailer.startsWith('http://')) || payload.trailer.length < 14) {
    isFormValid = false
    errors.name = 'Trailer must be at least 15 symbols.'
  }

  if (!payload || typeof payload.publisher !== 'string' || payload.publisher.length < 3) {
    isFormValid = false
    errors.name = 'Publisher must be at least 3 symbols.'
  }

  // if (!payload || typeof payload.image !== 'string' || !(payload.image.startsWith('https://') || payload.image.startsWith('http://')) || payload.image.length < 14) {
  //   isFormValid = false
  //   errors.image = 'Please enter valid Image URL. Image URL must be at least 14 symbols.'
  // }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const gameObj = req.body
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateGameCreateForm(gameObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Game
      .create(gameObj)
      .then((createdGame) => {
        res.status(200).json({
          success: true,
          message: 'Game added successfully.',
          data: createdGame
        })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Game with the given name already exists.'
        }
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/edit/:id', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const gameId = req.params.id
    const gameObj = req.body
    const validationResult = validateGameCreateForm(gameObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Game
      .findById(gameId)
      .then(existingGame => {
        existingGame.title = gameObj.title
        existingGame.developer = gameObj.developer
        existingGame.trailer = gameObj.trailer
        existingGame.publisher = gameObj.publisher
        existingGame.genres = gameObj.genres
        existingGame.languages = gameObj.languages
        existingGame.description = gameObj.description
        existingGame.price = gameObj.price
        existingGame.images = gameObj.images

        existingGame
          .save()
          .then(editedGame => {
            res.status(200).json({
              success: true,
              message: 'Game edited successfully.',
              data: editedGame
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Game with the given name already exists.'
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/all', (req, res) => {
  Game
    .find()
    .then(games => {
      res.status(200).json(games)
    })
})


router.post('/like/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Game
    .findById(id)
    .then(game => {
      if (!game) {
        const message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = game.likes
      if (!likes.includes(username)) {
        likes.push(username)
      }
      game.likes = likes
      game
        .save()
        .then((game) => {
          res.status(200).json({
            success: true,
            message: 'Game liked successfully.',
            data: game
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/unlike/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Game
    .findById(id)
    .then(game => {
      if (!game) {
        let message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = game.likes
      if (likes.includes(username)) {
        const index = likes.indexOf(username)
        likes.splice(index, 1)
      }

      game.likes = likes
      game
        .save()
        .then((game) => {
          res.status(200).json({
            success: true,
            message: 'Product unliked successfully.',
            data: game
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    Game
      .findById(id)
      .then((game) => {
        game
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Game deleted successfully!'
            })
          })
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

module.exports = router
