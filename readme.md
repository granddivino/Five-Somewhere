# Express Auth Boilerplate

* Create a node app
* .gitignore
* Install and set up express
* Stubbed out GET auth/login, GET auth/signup, POST auth/login, POST auth/signup
* Configured auth controller
* Set up ejs, and ejs-express-layouts, verified that it's working
* Set up the signup and login forms, and tested post routes
-------
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
    "username": "<insert username here",
    "password": "<insert password here",
    "database": "<insert develop db name here",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "<insert username here",
    "password": "<insert password here",
    "database": "<insert test db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "<insert username here",
    "password": "<insert password here",
    "database": "<insert producation db name here",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```
**Note:** If your database requires a username and password, you'll need to include these fields as well


4. Create a database
```
sequelize db:create <insert db name here>

```

5. Migrate the `user` model to your database
```
sequelize db:migrate

```

6. Add a `SESSION_SECRET` and `PORT` environment variables in a `.env` file (can be any string)

```

```
7. 
