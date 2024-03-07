const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    pages: {type: Number, required: true},
    genres: [{type:  String, required: true}],
    rating: {type: Number, required: true}
})

const Post = mongoose.model('books', postSchema)
module.exports = Post;