const express = require("express");
const router = express.Router();
const db = require('../models');


router.get('/:drinkId', (req, res) => {
  db.userdrink
    .findOne({
      where: {userId: req.user.id, drinkId: req.params.drinkId},
    })
    .then((foundComment) => {
      console.log('Commenting now', foundComment);
      res.render('comments/show', {newComments: foundComment.dataValues})
    })
})

module.exports = router;