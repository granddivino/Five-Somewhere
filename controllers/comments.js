const express = require("express");
const router = express.Router();
const db = require('../models');

//Route to get to forums
router.get('show', (req, res) => {
  db.userdrink
    .findOne({
      where: {userId: req.user.id, drinkId: req.params.drinkId},
    })
    .then((foundComment) => {
      res.render('comments/show', {newComments: foundComment.dataValues})
    })
})

//Route to post comments
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

module.exports = router;