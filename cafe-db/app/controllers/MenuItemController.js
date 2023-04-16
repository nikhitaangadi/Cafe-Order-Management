const MenuItem = require('../models/MenuItem')

const MenuItemController = {}

MenuItemController.create = (req, res) => {
    const body = req.body
    const menuItem = new MenuItem(body)
    menuItem.storeId = req.store.id
    menuItem.save()
        .then((item) => {
            res.json(item)
        })
        .catch((err) => {
            res.json(err)
        })
}

MenuItemController.show = (req, res) => {
    const storeId=req.params.storeId
    MenuItem.find({ storeId:storeId, deleted: false })
        .then((item) => {
            res.json(item)
        })
        .catch((err) => {
            res.json(err)
        })
}

MenuItemController.showOne = (req, res) => {
    MenuItem.find({ storeId: req.store.id, deleted: false })
        .then((item) => {
            res.json(item)
        })
        .catch((err) => {
            res.json(err)
        })
}

MenuItemController.showfiltered = (req, res) => {
    const id=req.params.categoryId
    MenuItem.find({ categoryId:id, storeId: req.store.id, deleted: false })
        .then((item) => {
            res.json(item)
        })
        .catch((err) => {
            res.json(err)
        })
}

MenuItemController.showSearched=(req,res)=>{
    const str=req.params.str
    MenuItem.find()
        .then((response)=>{
            const filterData=response.filter((ele)=>ele.itemName.toLowerCase().includes(str.toLowerCase()))
            res.json(filterData)
        })
        .catch((error)=>{
            res.json(error)
        })
}

MenuItemController.showDeleted = (req, res) => {
    MenuItem.findDeleted({ storeId: req.store.id })
        .then((item) => {
            res.json(item)
        })
        .catch((err) => {
            res.json(err)
        })
}

MenuItemController.updateMenuItem = (req, res) => {
    const id = req.params.id
    const body = req.body
    MenuItem.findOneAndUpdate({ _id: id, storeId: req.store.id }, body, { new: true, runValidations: true })
        .then((item) => {
            res.json(item)
        })
        .catch((err) => {
            res.json(err)
        })
}

MenuItemController.delete = (req, res) => {
    const id = req.params.id
    MenuItem.findOneAndDelete({ _id: id, storeId: req.store.id })
        .then((item) => {
            res.json(item)
        })
        .catch((err) => {
            res.json(err)
        })
}

MenuItemController.softDelete = (req, res) => {
    const id = req.params.id
    MenuItem.deleteById({ _id: id, storeId: req.store.id })
        .then((item) => {
            res.json(item)
        })
        .catch((err) => {
            res.json(err)
        })
}

MenuItemController.restore = (req, res) => {
    const id = req.params.id
    console.log('Menu', id)
    MenuItem.restore({ _id: id })
        .then((item) => {
            res.json(item)
        })
        .catch((err) => {
            res.json(err)
        })
}
module.exports = MenuItemController