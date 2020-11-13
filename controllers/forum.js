let express = require('express')
let db = require('../models')
let router = express.Router()


// POST /forum - create a new post
router.post('/', (req, res) => {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})


// GET forum/new - display form for creating new articles
router.get('/new', (req, res) => {
  db.author.findAll()
  .then((authors) => {
    res.render('forum/new', { authors: authors })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})


// GET forum/:id - display a specific post and its author and comments
router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author, db.comment]
  })
  .then((article) => {
    if (!article) throw Error()
    // console.log(article.author)
    // console.log(article.comments)
    res.render('forum/show', { article: article })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})


// POST /comments - create a new comment
router.post('/:id/comments', (req, res) => {
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    articleId: req.body.articleId
  })
  .then((comment) => {
    res.redirect(`/forum/${req.body.articleId}`)
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})


// GET EDIT / forum
router.get('/edit/:id', (req,res)=>{
  // res.send('Article GET EDIT route')
  db.article.findOne({
    where: {id: req.params.id},
    include: [db.author]
  })
  .then((article) => {
    if (!article) throw Error()
    res.render('forum/edit', { article: article })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})


// EDIT / forum
router.put('/:id', (req,res)=>{
  db.article.update({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  },
  {
    where: {id: req.body.id},
  })
  .then((article) => {
    if (!article) throw Error()
    res.redirect(`/forum/${req.body.id}`)
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

module.exports = router