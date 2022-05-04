const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user.js')
const authRoute = require('./routes/auth.js')
const productRoute = require('./routes/product.js')
const cartRoute = require('./routes/cart.js')
const orderRoute = require('./routes/order.js')
const stripeRoute = require('./routes/stripe.js')

const cors = require("cors")

dotenv.config()

mongoose.connect( process.env.MONGO_URL )
.then(() => console.log('connected'))
.catch((err) => {
    console.log(err);
} )

app.use(express.json())

app.use(cors()); 


app.use('/api/users', userRoute)

app.use('/api/auth', authRoute)

app.use('/api/products', productRoute)

app.use('/api/carts', cartRoute)

app.use('/api/orders', orderRoute)

app.use('/api/checkout', stripeRoute)




app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port:' + process.env.PORT);
})
