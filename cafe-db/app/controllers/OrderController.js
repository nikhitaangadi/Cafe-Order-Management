const Order = require('../models/Order')

const OrderController = {}

OrderController.create = (req, res) => {
    const body = req.body
    console.log(body)
    const order = new Order(body)
    order.storeId = req.store.id
    order.save()
        .then((order) => {
            console.log(order)
            res.json(order)
        })
        .catch((err) => {
            res.json(err)
        })
}

OrderController.showAll = (req, res) => {
    const storeId=req.params.storeId
    Order.find({storeId:storeId})
        .then((order) => {
            res.json(order)
        })
        .catch((err) => {
            res.json(err)
        })
}

OrderController.showByStore = (req, res) => {
    Order.find({ storeId: req.store.id, deleted: false })
        .then((order) => {
            res.json(order)
        })
        .catch((err) => {
            res.json(err)
        })
}
OrderController.showCompleted=(req,res)=>{
    Order.findDeleted({ storeId: req.store.id })
        .then((order) => {
            res.json(order)
        })
        .catch((err) => {
            res.json(err)
        })
}

OrderController.showAdminOrderCompleted=(req,res)=>{
    const storeId=req.params.storeId
    Order.findDeleted({ storeId: storeId })
        .then((order) => {
            res.json(order)
        })
        .catch((err) => {
            res.json(err)
        })
}

OrderController.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Order.findByIdAndUpdate({ _id: id, storeId: req.store.id }, body, { new: true, runValidation: true })
        .then((order) => {
            res.json(order)
        })
        .catch((err) => {
            res.json(err)
        })
}

OrderController.delete = (req, res) => {
    Order.deleteMany({ storeId: req.store.id })
        .then((order) => {
            res.json(item)
        })
        .catch((err) => {
            res.json(err)
        })
}

OrderController.softDelete = (req, res) => {
    const id = req.params.id
    Order.deleteById({ _id: id, storeId: req.store.id })
        .then((order) => {
            res.json(order)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = OrderController