// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed')

//Index:
baker.get('/', (req, res) => {
    Baker.find()
    .populate('breads')
    .then(foundBakers => {
        res.send(foundBakers)
    })
})


// Show: 
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
    .populate({
        path: 'breads',
        options: {limit:5}
    })
    .then(foundBaker => {
        res.render('bakerShow', {
            baker: foundBaker
        })
    })
})

// delete
baker.delete('/:id', (req, res) => {
    console.log("req")
    Baker.findByIdAndDelete(req.params.id)
    .then(deletedBaker => { 
        res.status(303).redirect('/breads')
    }).catch(err => {
        console.log("Error", err)
    })
})

baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
    .then(res.redirect('/breads'))
})


// export
module.exports = baker  