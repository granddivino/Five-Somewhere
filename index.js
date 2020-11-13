require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
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
app.use('/favorites', require('./controllers/favorites.js'))
app.use('/forum', require('./controllers/forum.js'))


// GET Home page
app.get('/', (req, res) => {
    res.render('home')
})

//GET results from search
app.get('/homepage/results', (req, res) => {
    let drink = req.query.drink
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then (response => {
        console.log(response.data)
    //    res.send(response.data)
    res.render('homepage/results', {results: response.data.Search})
    })
})

// show (info about one particular movie)
app.get('/:idDrink', (req, res)=>{
    let drinkId = req.params.drinkId
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkId}`)
    .then(response=>{
        console.log(response.data)
        res.render('homepage/show', {drinks: response.data})
    })
})


// GET Favorites Page 
app.get('/favorites/drinks', isLoggedIn, (req, res) => {
    res.render('favorites/drinks')
})

// GET Home Page 
app.get('/homepage/homepage', isLoggedIn, (req, res) => {
    res.render('homepage/homepage')
})


app.listen(process.env.PORT, ()=> {
    console.log('Port 8000')
})