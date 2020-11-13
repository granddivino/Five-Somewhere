const express = require ('express')
const router = express.Router()
const db = require('../models')

// GET favorites page
router.get('/favorites', (req, res)=>{
    db.favorites.findAll()
    .then(favorites=>{
        // res.send(favorites)
        res.render('favorites/drinks.ejs', {favorites: favorites})
    })
})





module.exports = router