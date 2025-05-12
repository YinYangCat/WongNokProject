const express = require('express') //to receive request and repond
const app = express() // ⬆
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const router = express.Router();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const authRoutes = require('./routes/auth')
const authController = require('./controllers/authController')
const mainController = require('./controllers/mainController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const profileController = require('./controllers/profileController')
const restaurantRoutes = require('./routes/restaurants')
const mainRoutes = require('./routes/main');
const searchRoutes = require('./routes/search');
const reviewRoutes = require('./routes/review');
const profileRoutes = require('./routes/profile');
const adminRoutes = require('./routes/admin');
app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'))//make sure it in views

//To track that user login or not
global.loggedIn = null


app.use(session({
    secret: 'node secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: false  // set to true in production with HTTPS
  }
}))
app.use(flash())
// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});//middleware
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes);
app.use('/', searchRoutes);
app.use('/review', reviewRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/', mainRoutes);
app.use('/', adminRoutes);
app.get('/', mainController)
app.get('/auth/login', loginController);
app.get('/profile', profileController)
app.get('/register', registerController)

app.listen(4000, () => {
  console.log('Server running on port 4000')
})
