const Cart = require("../models/Cart");
const Wish = require("../models/WishList");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE cart
router.post("/Cart", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  const newWish = new Wish(req.body);
  // console.log('in save');
  try {
    const savedCart = await newCart.save();    
    res.status(200).json(savedCart, savedWish);
  } catch (err) {
    // res.status(500).json(err);
    // console.log(err);
  }
});
//CREATE wishlist
router.post("/Wish", verifyToken, async (req, res) => {
  ;
  const newWish = new Wish(req.body);
  // console.log('in save');
  try {
    
    const savedWish = await newWish.save();
    res.status(200).json(savedCart, savedWish);
  } catch (err) {
    // res.status(500).json(err);
    // console.log(err);
  }
});

//UPDATE Add Product
router.put("/:id/:userId/:location", verifyTokenAndAuthorization, async (req, res) => { 
  const loc = req.params.location
  const pro = [req.body]  
    
    try {      
      if (loc === 'Cart'){
        
        const total = pro[0].quantity * pro[0].price;
        console.log(total);
         const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,      
      {        
        $push: {products: pro },
        $inc:  {amount: total },
        
      },
      { new: true } 
    );   
    res.status(200).json(updatedCart);
      }else if ( loc ==='Wish'){     
        const updatedWish= await Wish.findByIdAndUpdate(
          req.params.id,      
          {
            // $set: req.body,        
            $push: {products: pro }
          }, 
          { new: true } 
        );   
        res.status(200).json(updatedWish);
          }
        
  } catch (err) { 
    res.status(500).json(err); 
  } 
}); 

//UPDATE Item Count
router.put("/item/:id/:userId/:productId/:location/:action/:quantity",verifyTokenAndAuthorization, async (req, res) => {
 
  const loc = req.params.location
  try {     
      let cart = {}
    if (loc === 'Cart'){      
      // console.log('in cart');
       cart = await Cart.findOne({ userId: req.params.userId });      
    } else if ( loc ==='Wish'){
      // console.log('in wish');
       cart = await Wish.findOne({ userId: req.params.userId });
    }    
   let total = cart.amount
    if(req. params.action === 'add'){     
      // console.log("in add"); 
          
      cart.products[req.params.productId].quantity += parseInt(req.params.quantity);
      total = (cart.amount )+ (cart.products[req.params.productId].price)
     
    } else if (req. params.action === 'sub'){
      // console.log("in sub");
      cart.products[req.params.productId].quantity -= parseInt(req.params.quantity);      
      total = (cart.amount )- (cart.products[req.params.productId].price)
      
      if (cart.products[req.params.productId].quantity<=0){    
        // console.log('item delete');       
        cart.products.splice(req.params.productId, 1)       
      }
    }else if(req. params.action === 'delete'){
      // console.log('item delete direct');   
      total = (cart.amount )- ((cart.products[req.params.productId].price)* parseInt(req.params.quantity))      
      cart.products.splice(req.params.productId, 1)     
    }   
    
    if(total<=0){
      total = 0
    }  

    try {      
      if (loc === 'Cart'){    
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
         $set: {products: cart.products , amount: total}       
       
        },
        { new: true } 
      );
       
      res.status(200).json(updatedCart);
    
    }else if ( loc ==='Wish'){    
      const updatedCart = await Wish.findByIdAndUpdate(
        req.params.id,
        {
         $set: {products: cart.products , amount: total}         
       
        },
        { new: true } 
      );
      
      res.status(200).json(updatedCart);
    }
   } catch (err) { 
      res.status(500).json(err); 
    } 
  } catch (err) { 
    res.status(500).json(err); 
  } 
}); 
 
//Remove Item
router.put("/:id/:userId/:productId/:location", verifyTokenAndAuthorization, async (req, res) => {  
  const loc = req.params.location
    try {
      if (loc === 'Cart'){
      const cart = await Cart.findOne({ userId: req.params.userId });
      }else if ( loc === "Wish"){
        const cart = await Wish.findOne({ userId: req.params.userId });
      }
    
      cart.products.splice(req.params.productId, 1)
      try {
        // console.log('here');
        // console.log(cart.products.length);
        if (loc === 'Cart'){
        const updatedCart = await Cart.findByIdAndUpdate(
          req.params.id,
          {
           $set: {products: cart.products }
          },
          { new: true } 
        );
        res.status(200).json(updatedCart);
      }else if ( loc === "Wish"){
        const updatedWish = await Wish.findByIdAndUpdate(
          req.params.id,
          {
           $set: {products: cart.products }
          },
          { new: true } 
        );
        res.status(200).json(updatedWish);
      }
      } catch (err) { 
        res.status(500).json(err); 
      } 
    } catch (err) { 
      res.status(500).json(err); 
    } 
  }); 
  

  //DELETE
  router.delete("/:id/:userId/:location", verifyTokenAndAuthorization, async (req, res) => {
    console.log('try delete');
    const loc = req.params.location
    const id = req.params.id
    
    try {
      if (loc === 'Cart'){
        console.log(id);
      await Cart.findByIdAndDelete(req.params.id);
      console.log("Cart has been deleted...");
      res.status(200).json("Cart has been deleted...");
      }else  if (loc === 'Wish'){
        await Wish.findByIdAndDelete(req.params.id);
      res.status(200).json("WishList has been deleted...");
      }
      
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET USER CART
router.get("/find/:location/:userId", verifyTokenAndAuthorization, async (req, res) => {  
  const loc = req.params.location
  try {
    if (loc === 'Cart'){
    // console.log('hey');
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
    }else if (loc === 'Wish'){
      const cart = await Wish.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
  
// //GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    const wish = await Wish.find();

    res.status(200).json(carts, wish);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;