const User = require('../Models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (request, response) => {
    const { firstname, middlename, lastname, username, email, password, userRole, userStatus } = request.body
    try {
        // check username
        const existUsername = await User.findOne({ username })
        if (existUsername)
            return response.status(400).json({ error: "Username already in use" })
        // check email
        const existEmail = await User.findOne({ email })
        if (existEmail)
            return response.status(400).json({ error: "Email provided already registered" })

        const hashedPassword = await bcrypt.hash(password, 10)
        // create new user data
        const newUser = await User.create({
            firstname,
            middlename,
            lastname,
            username,
            email,
            password: hashedPassword,
            userRole,
            userStatus,
        })
        // load new user data into response json
        response.status(201).json({ newUser })
    } catch (error) {
        response.status(400).json(`Error: ${error.message}`)
    }
}

const loginUser = async (request, response) => {
    const { username, password } = request.body
    try {
        const exists = await User.findOne({ username })
        if (!exists)
            return response.status(404).json({ error: "Username not found" })

        const isPasswordMatched = await bcrypt.compare(
            password,
            exists.password
        )

        if (!isPasswordMatched)
            return response.status(404).json({ error: "Incorrect Password" })

        const token = jwt.sign({ userId: exists._id }, process.env.JWT_SECRET)
        response.status(200).json({ username: exists.username, token })

    } catch (error) {
        response.status(400).json(`Error: ${error.message}`)
    }
}

async function getUsers(request, response) {
    try {
        const users = await User.find()
        if (!users) {
            return response.status(404).json({ message: 'Book not found!' })
        }
        response.status(200).json(users)
    } catch (error) {
        response.status(400).json(`Error: ${error.message}`)
    }
}

module.exports = { registerUser, loginUser, getUsers }