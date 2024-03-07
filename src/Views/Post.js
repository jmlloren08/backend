const express = require('express')
const router = express.Router()
// Require controller modules.
const createPost = require('../Controller/Post').createPost
const getPost = require('../Controller/Post').getPost
const updatePost = require('../Controller/Post').updatePost
const deletePost = require('../Controller/Post').deletePost
const getBookStats = require('../Controller/Post').getBookStats
// const {authMiddleware} = require('../Middleware/authMiddleware')
// define routes
router.post('/', createPost)
router.get('/', getPost)
router.get('/count', getBookStats)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)


module.exports = router