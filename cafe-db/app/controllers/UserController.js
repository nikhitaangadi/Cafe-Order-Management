require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const UserController = {}

UserController.register = (req, res) => {
    const body = req.body
    console.log(body)
    const user = new User(body)
    user.save()
        .then((user)=>{
            console.log(user)
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
}

UserController.login = (req, res) => {
    const body = req.body
    User.findOne({ email: body.email })
        .then((user) => {
            if (user) {
                bcryptjs.compare(body.password, user.password)
                    .then((result) => {
                        if (result) {
                            console.log('User',user)
                            const token = jwt.sign({ id: user._id, role:user.role }, process.env['JWT_SECRET'])
                            res.json({
                                token: `Bearer ${token}`
                            })
                        } else {
                            res.json({
                                errors: 'Invalid email or password'
                            })
                        }

                    })
            } else {
                res.json({
                    errors: 'Invalid email or password'
                })
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

UserController.account = (req, res) => {
    User.findOne({ _id: req.user.id })
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = UserController