  
const express = require('express')
const router = express.Router()
const db = require('../models')



//Route to POST to favorites page
router.post('/', (req, res) => {
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
router.get('/drinks', (req, res) => {
  db.user
    .findOne({
      where: {id: req.user.id},
      include: [db.drink],
    })
    .then((foundUser) => {
      res.render('favorites/drinks', {faveDrinks: foundUser.drinks})
      console.log(foundUser.drinks)
    })
})

//DELETE a drink from favorites
router.delete('/:id', (req, res) => {
  db.drink
    .destroy({
      where: {id:req.params.id},
    })
    .then((numRowsDeleted) => {
      console.log(numRowsDeleted)
      res.redirect('/favorites/drinks')
    })
    .catch((error) => {
      res.send(error)
    })
})

//Route to POST comments
router.put('/:id', (req, res) => {
  console.log(req.params)
  console.log(req.user.id)
  db.userdrink
    .update(
      {comment: req.body.comment},
      {where: {userId:req.user.id, drinkId:req.params.id}
    })
    .then((newComment) => {
      console.log(newComment)
      res.redirect(`/comments/show/${req.params.id}`)
    })
    .catch((error) => {
      res.send(error)
    })
})

module.exports = router