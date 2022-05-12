const express = require("express");
const serverless = require("serverless-http");
const productRoute = require('../routes/product.js')

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

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
c


app.use('/.netlify/functions/api/products', productRoute)
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);