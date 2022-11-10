// This is your test secret API key.
const stripe = require('stripe')('sk_test_51M2FOLGdDTsdcLjoEV2SwiPWUmfqXNnpznwufFUGhtG8HwwFhKzWlxR1jMZyBstMlVwFzCKvz17tgmk2CumquV4v00zDCauQGe');
const express = require('express');
const app = express()
var router = express.Router();
const Cart = require('../models/carts')


// router.use(express.static("public"));
// app.use(express.json());

const calculateOrderAmount = (items) => {
    // console.log(items)
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let amount = 0
  items.forEach(el => amount += el.price)

  return amount;
};

router.post("/create-payment-intent", (req, res) => {
  Cart.find().then(async allItemCart  => {
    
      console.log(allItemCart)
      let items = allItemCart
    
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "eur",
        automatic_payment_methods: {
          enabled: true,
        },
      });
    
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
  })
});

// app.listen(4242, () => console.log("Node server listening on port 4242!"));

module.exports = router