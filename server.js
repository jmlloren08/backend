require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
// middleware
app.use(express.json())
// app.use(cors())
app.use(cors({
    origin: ['http://localhost:3000', 'https://react-proj-app-api.onrender.com'],
}))
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