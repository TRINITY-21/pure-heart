const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: req.session.isLoggedIn
  });
}; 

exports.postLogin = (req, res, next) => {
  const email = req.body.email
  // const password = req.body.password

  User.findOne({email:email})
    .then(user => {
      console.log(user)
      if(!user){
        return res.redirect('/login')
      }
      bcrypt.compare(req.body.password, user.password) 
      .then((match) => {
        if(match){
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err)=>{ 
            
            res.redirect('/');
          })
        } 

      res.redirect('/login');
        
      }) 
    }) 
  
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  User.findOne({email:email}).then((err, userData)=>{
    if (userData){
      res.redirect('/auth/signup')
    }
    return bcrypt.hash(password, 12)
  })

    .then((hashPassword)=>{
      const user = new User({
        name:name,
        email:email,
        password:hashPassword,
        cart:{items:[]}
      })

      return user.save()
    })
  .then((result)=>{
    res.redirect('/login')
  })


};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
