### Context

It was difficult for me to zone in on just one idea, I came across so many cool APIs.. but for the full RESTful experience there weren't too many that I was interested in where it made sense to PUT or DELETE something. 

I did find one API though where I think might be appropriate for it. So this app will be for all those that enjoy alcohol to some extent, and will be looking to experiment and be adventurous with new ones. It's going to be a guide (cookbook like) but for making drinks. It will list the ingredients to make a concoction along with a name and a picture to with it for a full blown drunken experience afterward. 

The idea is mainly to have a guide be able to make the cocktail, but there will also be a way to save your favorites, and there will be a forum of some sort where EDIT/DELETE will come into play for those who maybe want to leave a review about the drink, or need help from someone because somehow they don't know how to measure properly to make a perfect drink.

----------------------------------------------------------
### ERD

[ERD] (https://lucid.app/invitations/accept/9c964b89-cacf-4774-926c-c1dffe8ed8d8)

----------------------------------------------------------
### User Stories/ Stretch Goals

1. I should be able to search for a drink by name, or ingredient. (GOAL MET)
2. I want to be able to save my favorite drinks to a list, and be able to access them later. (GOAL MET)
3. I should be able to talk to other people about how they perfected their drink. (PENDING)
4. I want to be able to log in and out using a username and password to be able to protect my bad habits.
5. I need to be able to ask others for help from other alcoholics because I don't know how to do basic trial and error without getting drunk from constantly tasting it. (PENDING)
----------------------------------------------------------


### Wireframes


### Loginpage:
[LoginPage] (https://imgur.com/7mk0WyU)

### Signup Page:
[SignupPage] (https://imgur.com/sCYOYfk)

### Homepage:
[Homepage] (https://imgur.com/uOpUJtT)

### Search Result Page:
[SearchResult] (https://imgur.com/Zqiu4MH)

### Forum:
[Forum] (https://imgur.com/JWCUHTt)

### Favorites:
[Favorites] (https://imgur.com/lxc1eYS)

----------------------------------------------------------
### Unsolved Problems

As it stands on presentation night, I was unable to finish connecting my POST route for commenting. I have the code finished as far as I can tell to be able to post a comment, just need to tweak some things as well finish connecting the proper routes to each other.

----------------------------------------------------------

### APIs and other outside tech

https://www.thecocktaildb.com/api.php

----------------------------------------------------------

# Express Auth Boilerplate

* Create a node app
* .gitignore
* Install and set up express
* Stubbed out GET auth/login, GET auth/signup, POST auth/login, POST auth/signup
* Configured auth controller
* Set up ejs, and ejs-express-layouts, verified that it's working
* Set up the signup and login forms, and tested post routes

----------------------------------------------------------

## How to set up:

1. Fork & Clone

2. Install Dependencies
```
npm i

```
3. Create a `config.json` with the following code: 

```json
{
  "development": {
    "username": "<insert username here>",
    "password": "<insert password here>",
    "database": "<insert develop db name here",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "<insert username here>",
    "password": "<insert password here>",
    "database": "<insert test db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "<insert username here>",
    "password": "<insert password here>",
    "database": "<insert producation db name here",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

**Note:** If your database requires a username and password, you'll need to include these fields as well


4. Create a database

```
sequelize db:create --<insert db name here> --attributes whatevername:STRING/TEXT/INTEGER with no commas and no slashes like that in between the type of attributes and no spaces

```

5. Migrate the `user` model to your database

```
sequelize db:migrate

```

6. Add a `SESSION_SECRET` and `PORT` environment variables in a `.env` file (can be any string)

```

SESSION_SECRET='keyboard cat' (or whatever you decide to use)

```

