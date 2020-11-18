const express = require("express");
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn')

//Route to get to forums
router.get('show', isLoggedIn, (req, res) => {
  db.userdrink
    .findOne({
      where: {userId: req.user.id, drinkId: req.params.drinkId},
    })
    .then((foundComment) => {
      res.render('comments/show', {newComments: foundComment.dataValues})
    })
})

//Route to post comments
router.put('/:id', isLoggedIn, (req, res) => {
  console.log(req.params)
  console.log(req.user.id)
  db.userdrink
    .update(
      {comment: req.body.comment},
      {where: {userId:req.user.id, drinkId:req.params.id}
    })
    .then((newComment) => {
      res.redirect(`/comments/show/${req.params.id}`)
    })
    .catch((error) => {
      res.send(error)
    })
})



module.exports = router;