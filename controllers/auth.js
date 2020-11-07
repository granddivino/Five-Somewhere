const express = require ('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig')

//GET route for signup
router.get('/signup', (req,res)=>{
    res.render('auth/signup')
})

//POST route for signup
router.post('/signup', (req,res)=>{
    console.log('Signup form user input:', req.body)
    //Check if user exists already
    //Otherwise create a new user and store them in the db
    db.user.findOrCreate({ //Check if that email is already in db
        where: {email: req.body.email},
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }) //Create new user if email wasn't found
    .then(([createdUser, wasCreated])=>{
        if(wasCreated){
            console.log('Just created the following user:', createdUser)
            //Log the new user in
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash: 'Account created and logged in!' // !-> FLASH <-!
            })(req, res) //IIFE = immediately invoked function
        } else {     //If it is found, throw an error message
            req.flash('Error', 'Email already exists, try logging in.')
            res.redirect('/auth/login') //Redirect to login page
            // console.log('An account associated with that email address already exists! Try login again.')
        }
    })

    .catch(err => {
        req.flash('Error', err.message) // !-> FLASH <-!
        res.redirect('/auth/signup') //Redirect to signup page so they can try again
        // console.log('Oh no bitch, it didn\'t post shit to the database', err)
    })
})

//GET route for login
router.get('/login', (req,res)=>{
    res.render('auth/login')
})


//POST route for login
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/',
    failureFlash: 'Invalid email or password!', // !-> FLASH <-!
    successFlash: 'You are now logged in!' // !-> FLASH <-!
}))

//GET route for logout
router.get('/logout', (req, res) => {
    req.logout()
    req.flash('Successfully logged out!') // !-> FLASH <-!
    res.redirect('/')
})





module.exports = router