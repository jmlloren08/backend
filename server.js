require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
// middleware
app.use(express.json())
app.use(cors())
// routes
app.use('/API/Posts', require('./src/Views/Post'))
app.use('/API/Users', require('./src/Views/Users'))
// database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen('4000', () => {
            console.log(`Listening port ${process.env.PORT} and connected to MongoDB`)
        })
    })
    .catch((error) => {
        console.error(`Error connecting to MongoDB: ${error.message}`)
    })

// const products = require('./product')
// const cart = require('./cart')
// const order = require('./order')
// // add products to cart
// cart.addToCart(products[0])
// cart.addToCart(products[2])
// // display order
// console.log('Cart items: ', cart.getCartItems()) // Cart items:
// // calculate
// const totalAmount = order(cart.getCartItems())
// // display amount
// console.log('Total Amount: ', totalAmount)

// const message = 'This is a test message'
// console.log(message)

// // FS and HTTP
// const fs = require('fs')
// const http = require('http')
// // server
// const server  = http.createServer(function(request, response) {
//     console.log(`Client request URL: ${request.url}`)
//     if(request.url === '/') {
//         fs.readFile('index.html','utf-8', function(errors, contents) {
//             response.writeHead(200, {'Content-Type': 'text/html'})
//             response.write(contents)
//             response.end()
//         })
//     } else {
//         response.writeHead(404)
//         response.end('File not found!')
//     }
// })

// server.listen(4000)
// console.log('Running in localhost at port 4000')