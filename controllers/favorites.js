  
const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')

//Route to POST to favorites page
router.post('/', isLoggedIn, (req, res) => {
  console.log(req.body)
  db.drink
    .findOrCreate({
      where: {
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        picture: req.body.picture,
      }
    })
    .then(([drink, created]) => {
      drink.addUser(req.user)
      .then((info) => {
        console.log(info);
        res.redirect('/favorites/drinks')
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

//Route to GET drinks associated with user
router.get('/drinks', isLoggedIn, (req, res) => {
  db.user
    .findOne({
      where: {id: req.user.id},
      include: [db.drink],
    })
    .then((foundUser) => {
      res.render('favorites/drinks', {faveDrinks: foundUser.drinks})
    })
})

//DELETE a drink from favorites
router.delete('/drinks', isLoggedIn, (req, res) => {
    db.drink
      .destroy({
        where: {id: req.body.id},
      })
      .then((deleted) => {
        console.log(deleted)
        res.redirect('/favorites/drinks')
      })
      .catch((error) => {
        console.log(error)
      })
  })



module.exports = router