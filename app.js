const path = require('path');

const MongoClient = require('mongodb').MongoClient;

const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'views');

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


/// DB connection
mongoose
  .connect(
    'mongodb+srv://mern:mern@cluster0.hmnq5.mongodb.net/shop', { useNewUrlParser: true }
  )
  .then(result => {
    app.listen(3000); 
  })
  .catch(err => {
    console.log(err); 
  });
