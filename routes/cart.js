var express = require('express');
var router = express.Router();
const Cart = require('../models/carts')
const Trip = require('../models/trips')

/* GET cart listing. */
router.get('/', function(req, res, next) {
  Cart.find().then(allCartItems => res.json(allCartItems));
});

router.get('/add/:id', function(req, res, next) {
  Trip.findById(req.params.id).then(item => {
    const newItem = new Cart({
      departure: item.departure,
      arrival: item.arrival,
      date: item.date,
      price: item.price
    })
    newItem.save().then(data => res.json(data))
  })
    
});

router.delete('/', (req, res) => {
  Cart.deleteMany({}).then(data => res.json({data}))
})

router.delete('/:id', (req, res) => {
  Cart.deleteOne({ _id: req.params.id }).then(data => res.json({data}))
})

module.exports = router;