const mongoose=require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const  uniqueValidator=require('mongoose-unique-validator')
const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


const Schema=mongoose.Schema
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique: true,
        uniqueCaseInsensitive: true,
        minlength: 5,
        lowercase: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        uniqueCaseInsensitive: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return 'invalid email format'
            }
        },
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 8,
        maxlength: 128,
        validate: {
            validator: function (value) {
                return passwordFormat.test(value)
            },
            message: function () {
                return 'invalid message'
            }
        }
    },
    role:{
        type:String,
        default:'admin',
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

userSchema.plugin(uniqueValidator)

userSchema.pre('save', function (next) {
    const user = this
    console.log(this)
    if (user.isNew) {
        console.log(user.isNew)
        bcryptjs.genSalt(10)
            .then(function (salt) {
                console.log(salt)
                bcryptjs.hash(user.password, salt)
                    .then(function (encryptedPassword) {
                        console.log(encryptedPassword)
                        user.password = encryptedPassword
                        next()
                    })
            })
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User