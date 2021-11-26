const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const csrf = require('csurf')

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/shoppy',
  collection: 'mySessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

// const csrfProtection = csrf();
// app.use(csrfProtection)

// app.use((req,res,next)=>{
//   res.locals.isAuthenticated = req.session.isLoggedin;
//   res.locals.csrfToken = req.csrfToken();
//   next();
// }) 

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 

app.use((req, res, next) => {
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb://localhost:27017/shoppy'
  )
  .then(result => {
    
    app.listen(3000);
    console.log("DB Connected")
  })
  .catch(err => {
    console.log(err);
  });
