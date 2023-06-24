const express = require('express')
const app = express()

//Configuration
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT) 

//middleware
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))

//ROUTES
app.get('/', (req,res)=>{
    res.send('Welcome to Breads!')
})

// 404 Page
app.get('*', (req, res) => {
    res.send('404')
  })
  
app.listen(PORT, ()=>{
    console.log('listening on port:', PORT)
})
