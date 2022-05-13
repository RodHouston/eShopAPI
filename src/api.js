const express = require("express");
const serverless = require("serverless-http");

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('../routes/user.js')
const authRoute = require('../routes/auth.js')
const productRoute = require('../routes/product.js')
const cartRoute = require('../routes/cart.js')
const orderRoute = require('../routes/order.js')
const stripeRoute = require('../routes/stripe.js')

const cors = require("cors")
const app = express();
const router = express.Router();

const Product = require("../models/Product");


dotenv.config()

mongoose.connect( process.env.MONGO_URL )
.then(() => console.log('connected'))
.catch((err) => {
    console.log(err);
} )

app.use(express.json())

app.use(cors()); 

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  console.log('in here Product');
      products = await Product.find();
   

    res.status(200).json(products);
})

// router.get("/", (req, res) => {
//   res.json({
//     hello: "hi!"
//   });
// });

router.get('/test',(req,res) => {
    res.json({
        hello: "test we here!"
      });

})

router.post('/testpost',(req,res) => {
    res.json({
        hello: "hit the POST!"
      });
})


app.use('/.netlify/functions/api/users', userRoute)

app.use('/.netlify/functions/api/auth', authRoute)

app.use('/.netlify/functions/api/products', productRoute)

app.use('/.netlify/functions/api/carts', cartRoute)

app.use('/.netlify/functions/api/orders', orderRoute)

app.use('/.netlify/functions/api/checkout', stripeRoute)


app.use(`/.netlify/functions/api`, router);

// app.listen(process.env.PORT || 3008, () => {
//   console.log('listening on port:' + process.env.PORT);
// })
module.exports = app;
module.exports.handler = serverless(app);