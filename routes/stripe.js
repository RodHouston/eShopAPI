const router = require("express").Router();
const stripe = require("stripe")("sk_test_51KtGN3AkMYFXtHLuakHOQGTeHVVqowDKLWogOVIRABliWLRbOs1TyMgSKmLYsDrHeP0hKz6UX8OMuqDgeYXiy7UO00hIdeUNYZ");




router.post("/payment", async (req, res)  => { 
  console.log('here') ;
  const shippingRate = await stripe.shippingRates.create({
    display_name: 'Ground shipping',
    type: 'fixed_amount',
    fixed_amount: {amount: 500, currency: 'usd'},
  });
  
  console.log(shippingRate);
  // stripe.charges.create(
  //   {
  //     source: req.body.tokenId,
  //     amount: req.body.amount, 
  //     currency: "usd", 
  //   },
  //   (stripeErr, stripeRes) => {
  //     if (stripeErr) { 
  //       res.status(500).json(stripeErr); 
  //     } else {
  //       res.status(200).json(stripeRes);
  //     }
  //   }
  // ); 
});




module.exports = router;