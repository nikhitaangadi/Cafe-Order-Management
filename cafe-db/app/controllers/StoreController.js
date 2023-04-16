const Store = require('../models/Store')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const Order = require('../models/Order')
const MenuItem = require('../models/MenuItem')
const MenuCategory = require('../models/MenuCategory')
const StoreController = {}

StoreController.create = (req, res) => {
    const body = req.body
    const store = new Store(body)
    store.save()
        .then((store) => {
            res.json(store)
        })
        .catch((err) => {
            res.json(err)
        })
}

StoreController.login = (req, res) => {
    const body = req.body
    console.log(body)
    Store.findOne({ storeName: body.storeName })
        .then((store) => {
            if (store) {
                bcryptjs.compare(body.password, store.password)
                    .then((result) => {
                        if (result) {
                            const token = jwt.sign({ id: store._id }, process.env['JWT_SECRET'])
                            res.json({
                                token: `Bearer ${token}`
                            })
                        } else {
                            res.json({
                                errors: 'Invalid details'
                            })
                        }

                    })
            } else {
                res.json({
                    errors: 'Invalid details'
                })
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

StoreController.show = (req, res) => {
    Store.find()
        .then((store) => {
            res.json(store)
        })
        .catch((err) => {
            res.json(err)
        })
}

StoreController.showOne = (req, res) => {
    Store.find({ _id: req.store.id })
        .then((store) => {
            res.json(store)
        })
        .catch((err) => {
            res.json(err)
        })
}

StoreController.update = (req, res) => {
    const body = req.body
    Store.findOneAndUpdate({ _id: req.store.id }, body, { new: true, runValidations: true })
        .then((store) => {
            res.json(store)
        })
        .catch((errors) => {
            res.json(errors)
        })
}

StoreController.delete = (req, res) => {
    const storeId = req.params.storeId
    Order.deleteMany({ storeId: storeId })
        .then((Order) => {
            MenuItem.deleteMany({ storeId: storeId })
                .then((Item) => {
                    MenuCategory.deleteMany({ storeId: storeId })
                        .then((category) => {
                            Store.deleteOne({ _id: storeId })
                                .then((res) => {
                                    return res.json('Store Successfully Deleted')
                                })
                                .catch((error)=>{
                                    return res.json(error)
                                })
                        })
                })
        })
}

module.exports = StoreController