var express = require('express');
var router = express.Router();
const Cart = require('../models/carts')
const Booking = require('../models/bookings')

/* GET users listing. */
router.get('/', function(req, res, next) {
  Booking.find().then(data => res.json(data))
});

router.get('/add', function(req, res, next) {
  Cart.find().then(allCartItem => {
    allCartItem.forEach(item => {
      const newItem = new Booking({
        departure: item.departure,
        arrival: item.arrival,
        date: item.date,
        price: item.price
      })
      newItem.save().then()
    })
    Cart.deleteMany({}).then(data => res.json(data))

  })
});

router.delete('/', (req, res) => {
  Booking.deleteMany({}).then(data => res.json(data))
})

// router.get('/add', (req, res) => {
//   Cart.find().then(data => {
//     data.forEach(item => {
//       const newItem = new Booking({
//         departure: item.departure,
//         arrival: item.arrival,
//         date: item.date,
//         price: item.price
//       })
//       newItem.save().then(data => res.json(data))
//     })
//   })
// })

module.exports = router;