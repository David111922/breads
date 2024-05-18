
// DEPENDENCIES & CONFIGURATION
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const methodOverride = require('method-override')
const PORT = process.env.PORT
const app = express()

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB:', process.env.MONGO_URI);
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads')
})

// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// LISTEN
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})

// 404 Page
app.get('*', (req, res) => {
    res.status(404).send(`<h1>404</h1>`)
})