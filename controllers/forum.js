let express = require('express')
let db = require('../models')
let router = express.Router()


// POST /forum - create a new post
router.post('/', (req, res) => {
    res.send('Hello')
})


// GET forum/new - display form for creating new posts
router.get('/new', (req, res) => {

})





// POST /comments - create a new comment
router.post('/:id/comments', (req, res) => {

})


// GET EDIT / forum
router.get('/edit/:id', (req,res)=>{


})


// EDIT / forum
router.put('/:id', (req,res)=>{

})

module.exports = router