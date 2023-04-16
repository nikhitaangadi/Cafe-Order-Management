const mongoose=require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const  uniqueValidator=require('mongoose-unique-validator')
const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const Schema=mongoose.Schema
const storeSchema=new Schema({
    storeName:{
        type: String,
        required:true,
        unique: true
    },
    address:{
        type:String,
        required:true
    },
    password:{
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
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

storeSchema.plugin(uniqueValidator)

storeSchema.pre('save', function (next) {
    const store = this
    if (store.isNew) {
        bcryptjs.genSalt(10)
            .then(function (salt) {
                bcryptjs.hash(store.password, salt)
                    .then(function (encryptedPassword) {
                        store.password = encryptedPassword
                        next()
                    })
            })
    } else {
        next()
    }
})

const Store=mongoose.model('Store',storeSchema)

module.exports=Store