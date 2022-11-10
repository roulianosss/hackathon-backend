var express = require('express');
var router = express.Router();
const Trip = require('../models/trips')
const moment = require('moment');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Trip.find().then(allTrips => res.send(allTrips));
});

router.post('/new', (req, res) => {
    Trip.find({ 
      departure: {$regex: new RegExp(req.body.departure, "i")}, 
      arrival: {$regex: new RegExp(req.body.arrival, "i")},
      date: {$gte: moment(req.body.date).startOf("day"), $lte: moment(req.body.date).endOf("day")}
    }).then(allTrips => {
        res.json(allTrips)
    })
})

module.exports = router;