// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakersSeedData = require('../models/baker-seed.js')

// INDEX
baker.get('/', (req, res) => {
  Baker.find()
      .populate('breads')
      .then(foundBakers => {
          res.send(foundBakers)
      })
    })


// SEEDS
baker.get('/data/seed', (req, res) => {
  Baker.insertMany(bakersSeedData)
      .then(res.redirect('/breads'))
})

// Show: 
baker.get('/:id', (req, res) => {
  Baker.findById(req.params.id)
      .populate({
          path: 'breads',
          options: { limit: 5 }
      })
      .then(foundBaker => {
          res.render('bakerShow', {
              baker: foundBaker
          })
      })
})


// delete
baker.delete('/:id', (req, res) => {
    Baker.findByIdAndDelete(req.params.id) 
      .then(deletedBaker => { 
        res.status(303).redirect('/breads')
      })
})

module.exports = baker                    
