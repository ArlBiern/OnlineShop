# :construction: Online Shoop App :construction:
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![Status: In progress](https://img.shields.io/badge/status-in%20progress-blueViolet)

**Check demo** at :sparkles: [Heroku](https://thinktree-e-shop.herokuapp.com/) and **source code** at :house: [GitHub project homepage](https://github.com/Kombajn27/OnlineShop)

This app was created as a part of the CodersCamp project (2019, Warsaw group) - fifth project - React and Redux (usage in web applications).

We created an app based on MERN stack in which you are able to register, login and add products to the cart after authorization. App contains all main features of typicall e-commerse web-site. 

## :factory: Getting Started
### Prerequisites
To run project on your local machine for development and testing purposes you need to install the following software:
* [node.js](https://nodejs.org/en/) & [npm](https://www.npmjs.com/get-npm)
* [MongoDB](https://www.mongodb.com/what-is-mongodb)

### Install & usage (bash)
1. Clone repository 
```
git@github.com:Kombajn27/OnlineShop.git
```
2. Install required project dependencies for front-end and back-end
```
cd OnlineShop
npm run install:app
```
3. [Create your database on mLab](https://mlab.com/) and add .env file to your repository (main folder). Of course there is also possibility to use other MongoDB database or run it locally, but you will need to change connection settings.  
```
.env
```
```
DB_USER=your mLab database user name (not user name to Mongo account)
DB_PASSWORD=your mLab database password (not password to Mongo account)
DB_DATABASE_ADDRESS=your mLab database address
DB_DATABASE_NAME=your mLab database name
NODE_ENV=development
DEBUG=app:startup,app:db
DEBUG_COLORS=true
JWT_PRIVATEKEY=your secret jwt key
EMAIL=e-mail address (app has settings for gmail)
EMAIL_PASSWORD=e-mail password
```

4. Run developer server (front-end and back-end)
```
npm run dev
```
5. To see and test app open [localhost:3000](http://localhost:3000) for front-end. If you would like to test only back-end please run 'npm run server' and use [localhost:5000](http://localhost:5000).

## :rocket: Technologies:
### Project minimal requirements:
* Functional and Class Components
* State/props implementation and usage
* React List Component
* State management with React-Redux
* JSX usage

### Used technologies:
* JavaScript (including ES6+), CSS,
* MongoDB, mongoose, @hapi/joi (data setting, storage and validation),
* Express.js, 
* dotenv and config (handling environment variables),
* wintosn and express-async-errors (logging/handling errors),
* nodemailer (resposible for e-mails sending from node.js),
* React (inc. react-router, JSX), Redux (inc. redux-form, redux-thunk),
* axios (http requests handling),
* bcryptjs, jsonwebtoken (authentication and authorization).

### Main features:
* MongoDB mLab cloud database handling,
* debug with morgan & debugger package usage,
* React and Redux based front-end (class, functional and list components),
* user registration, login (authentication) and logout based on JWT, 
* user authorization during product addition to cart list, 
* form handling with redux-form and self-written actions/reducers,
* sending e-mails from server site, 
* heroku deployment.

## :busts_in_silhouette: Authors
* **freefrogs** - check at [Github](https://github.com/freefrogs)
* **Kombajn27** - check at [Github](https://github.com/Kombajn27)

## :notebook: To improve
* There are always some bugs to improve ;) Minor issues will be improved in the near future. 
