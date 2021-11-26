const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');


exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        isAuthenticated:req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
}; 

 
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
        isAuthenticated:req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        isAuthenticated:req.session.isLoggedIn
      });
    }) 
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  User.findOne().then((user)=>{
    console.log("user name",user.name)
     
    // user.populate('cart.items.productId')
    // .execPopulate()
    // .then(user => {
      const products = user.cart.items;
      console.log("User products", products)
      res.render('shop/cart', { 
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
        isAuthenticated:req.session.isLoggedIn
      });
  
    // .catch(err => console.log(err));
  });

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("Product",User)
  Product.findById(prodId)
    .then(product => {
      return User.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => { 
  const prodId = req.body.productId;
  User
    .removeFromCart(prodId)
   
      res.redirect('/cart');
    // })
    // .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  User.findOne().then((user)=>{
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc },  };
      });
      const order = new Order({
        user: { 
          name: user.name,
          userId: user._id
        },
        products: products 
      }); 
      return order.save();
      })
      .then(result => {
      return User.clearCart();
    })
    
    .then(() => {
      res.redirect('/orders');
    })
  
}
    // .populate('cart.items.productId')
    // .then(user => {
    //   const products = user.cart.items.map(i => {
    //     return { quantity: i.quantity, product: { ...i.productId._doc } };
    //   });
    //   const order = new Order({ 
    //     user: {
    //       name: req.user.name,
    //       userId: req.user
    //     },
    //     products: products
    //   });
    //   return order.save();
    // })
    // .then(result => {
    //   return req.user.clearCart();
    // })
    // .then(() => {
    //   res.redirect('/orders');
    // })
    // .catch(err => console.log(err));


exports.getOrders = (req, res, next) => {
  User.findOne().then((user)=>{

    Order.find({ 'user.userId': user._id }).populate("products","Product").exec((err,data)=>{
            console.log(data)
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: data,
        isAuthenticated:req.session.isLoggedIn
     
      });
    })
    // .then(orders => {
    //   const order = orders.map(i => {
    //   return { user:i.user, products: [...i.products ]};
    //   });
    //   console.log(order)
    //   res.render('shop/orders', {
    //     path: '/orders',
    //     pageTitle: 'Your Orders',
    //     orders: order
    //   });
    // })
    // .catch(err => console.log(err));
  })
 
};
 