var express = require('express');
var router = express.Router();
const Trip = require('../models/trips')

/* GET users listing. */
router.get('/', function(req, res, next) {
  Trip.find().then(allTrips => res.send(allTrips));
});

router.post('/new', (req, res) => {
    Trip.find().then(allTrips => {
        const result = allTrips.filter(trip => trip.departure === req.body.departure && trip.arrival === req.body.arrival && trip.date.toISOString().split('T')[0] === req.body.date )
        res.json(result)
    })
})

module.exports = router;