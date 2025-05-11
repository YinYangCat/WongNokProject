const express = require('express') //to receive request and repond
const app = express() // ⬆
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const router = express.Router();

const authController = require('./controllers/authController')
const mainController = require('./controllers/mainController')
// const homeController = require('./controllers/homeController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const authRoutes = require('./routes/auth')
const restaurantRoutes = require('./routes/restaurants')
const mainRoutes = require('./routes/main');
app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'))//make sure it in views

//To track that user login or not
global.loggedIn = null


app.use(session({
    secret: 'node secret',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', authRoutes)
app.use(restaurantRoutes);
app.use('/', mainRoutes);

app.get('/', mainController)
app.get('/login', loginController)
app.get('/register', registerController)

app.listen(4000, () => {
  console.log('Server running on port 4000')
})
