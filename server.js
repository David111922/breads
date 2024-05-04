
//importing the Express.js framework into our script. 
const express = require('express')

//This line loads environment variables 
// from a .env file into process.env 

require('dotenv').config()
const PORT = process.env.PORT
const app = express()

app.get('/', (req,res) => {
    res.send('Welcome to an awesome App about Panes!')
})

app.listen(PORT, () => {
 console.log('listenning on port', PORT);   
})

// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breadsController)')

Controllers