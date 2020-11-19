require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const axios = require('axios')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash') //Needs to come AFTER session middleware
const isLoggedIn = require('./middleware/isLoggedIn')

//Setup ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//Body parser middleware (this makes req.body work)
app.use(express.urlencoded({extended: false}))

//Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())


//Method-override middleware
app.use(methodOverride('_method'))

//Flash middleware
app.use(flash())

//Custom middleware
app.use((req, res, next) => {
    //Before every route, attach the flash messages and current user to res.locals 
    //This will give us access to the values in all your ejs pages
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() //Move on to the next piece of middleware
})

//Use Controllers
app.use('/auth', require('./controllers/auth.js'))
app.use('/comments', require('./controllers/comments.js'))
app.use('/favorites', require('./controllers/favorites.js'))


// GET Home Page 
app.get('/', isLoggedIn, (req, res) => {
    res.render('home')
})

//GET results from search on HOME page and takes you to query/results.ejs
app.get('/query/results', isLoggedIn, (req, res) => {
    let drink = req.query.drink
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(response => {
        let results = response.data.drinks
        res.render('query/results.ejs', {results: results})
        // console.log(response.data)
    })
    .catch((error) => {
        console.log(error)
        res.status(400).render('404.ejs')
      })
    })


// GET to main Forum Page 
app.get('/comments/show', isLoggedIn, (req, res) => {
    res.render('comments/show.ejs')
})





app.listen(process.env.PORT || 8000)