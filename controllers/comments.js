const express = require("express");
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn')


// GET to main Forum Page 
router.get('/show', isLoggedIn, (req, res) => {
  res.render('comments/show.ejs')
})


// Route to GET to forum
router.get('show', isLoggedIn, (req, res) => {
  db.userdrink
    .findOne({
      where: {userId: req.user.id, drinkId: req.params.drinkId},
    })
    .then((foundComment) => {
      res.render('show', {newComments: foundComment.dataValues})
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('404.ejs')
    })
  })


//Route to POST comments
router.post('/add', isLoggedIn, (req, res) => {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@-params', req.params)
  console.log(req.user.id)
  db.userdrink
    .update(
      {comment: req.body.comment},
      {where: {userId:req.user.id}
    })
    .then((newComment) => {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@-newComment', newComment)
      res.redirect('/comments/show')
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('404.ejs')
    })
  })



module.exports = router;