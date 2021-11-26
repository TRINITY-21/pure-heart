const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, 
          required: true 
         },

      }
    ]
  },

  password:{
    type: String,
  },

  name: {
    type: String,
    required: true
  },

  email: { 
    type: String,
    required: true
  },

});

userSchema.statics.addToCart =  function(product){

  this.findOne().then(user => {
    console.log("New user", user)
    if (!user) {
      console.log("No user Constant....")

    }

    console.log("user", user.name)
    console.log("mail", user.email)
    console.log("ccartt", user.cart) 
    console.log("items", user.cart.items)
 
    const cartProductIndex = user.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });  
    let newQuantity = 1;
    const updatedCartItems = [...user.cart.items]; 
    
    if (cartProductIndex >= 0) {
      newQuantity = user.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else { 
      updatedCartItems.push({
        productId: product._id,
        quantity: newQuantity,
        
      });
    }
    const updatedCart = {
      items: updatedCartItems
    };
    user.cart = updatedCart;
    return user.save();
  

})
}

userSchema.statics.removeFromCart = function(productId) { 
  
  this.findOne().then(user => {
    console.log("New user", user)
    if (!user) {
      console.log("No user Constant....")

    }
  const updatedCartItems = user.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });
  user.cart.items = updatedCartItems;
  return user.save();
  })

};

userSchema.statics.clearCart = function() {
  
  this.findOne().then(user => {
    console.log("New user", user)
    if (!user) {
      console.log("No user Constant....")

    }
  user.cart = { items: [] };
  return user.save();
});
}
module.exports = mongoose.model('User', userSchema, "User");

