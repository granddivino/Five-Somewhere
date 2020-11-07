require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
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


// GET Home page
app.get('/', (req, res) => {
    res.render('home')
})

// Replaced with above route
// app.get('/', (req,res)=> {
//     // res.send('Express auth home route')
//     if(req.user) {
//         res.send(`current user: ${req.user.name}`)
//     } else {
//         res.send('No user currently logged in!')
//     }
// })

// GET Profile Page 
app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile')
})

app.listen(process.env.PORT, ()=> {
    console.log('Port 8000')
})