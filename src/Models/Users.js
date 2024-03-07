const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    middlename: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userRole: { type: String, default: 'Undefined' },
    userStatus: { type: String, default: 'Unverified' },
})
const User = mongoose.model('Users', userSchema)

module.exports = User