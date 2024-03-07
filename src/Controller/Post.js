const Post = require('../Models/Post')
async function createPost(request, response) {
    const { title, author, pages, genres, rating } = request.body
    try {
        const post = await Post.create({
            title,
            author,
            pages,
            genres,
            rating
        })
        response.status(200).json(post)
    } catch (error) {
        response.status(400).json(`Error: ${error.message}`)
    }
}

async function getPost(request, response) {
    try {
        // const postID = request.params.id
        const post = await Post.find()
        if (!post) {
            return response.status(404).json({ message: 'Book not found!' })
        }
        response.status(200).json(post)
    } catch (error) {
        response.status(400).json(`Error: ${error.message}`)
    }
}

async function updatePost(request, response) {
    try {
        const postID = request.params.id
        const { title, author, pages, genres, rating } = request.body
        const updatedPost = await Post.findByIdAndUpdate(postID, { title, author, pages, genres, rating }, { new: true })
        if (!updatedPost) {
            return response.status(404).json({ message: 'Book not found. Unable to update!' })
        }
        response.status(200).json(updatedPost)
    } catch (error) {
        response.status(400).json(`Error: ${error.message}`)
    }
}

async function deletePost(request, response) {
    try {
        const postID = request.params.id
        const deletedPost = await Post.findByIdAndDelete(postID)
        if (!deletedPost) {
            return response.status(404).json({ message: 'Book not found. Unable to delete!' })
        }
        response.status(200).json(deletedPost)
    } catch (error) {
        response.status(400).json(`Error: ${error.message}`)
    }
}

async function getBookStats(request, response) {
    try {
        const bookCount = await Post.find().count()
        if (!bookCount) {
            return response.status(404).json({ message: 'Book not found!' })
        }
        const totalPageCount = await Post.aggregate([{ $group: { _id: null, totalPageCount: { $sum: "$pages" } } }])
        const totalGenres = await Post.aggregate([{ $unwind: "$genres" }, { $group: { _id: "$genres", count: { $sum: 1 } } }])
        const totalRating = await Post.aggregate([{ $group: { _id: null, totalRating: { $sum: "$rating" } } }])
        return response.status(200).json({ bookCount, totalPageCount: totalPageCount[0].totalPageCount, totalGenres, totalRating: totalRating[0].totalRating })
    } catch (error) {
        response.status(400).json(`Error: ${error.message}`)
    }
}

module.exports = { createPost, getPost, updatePost, deletePost, getBookStats }