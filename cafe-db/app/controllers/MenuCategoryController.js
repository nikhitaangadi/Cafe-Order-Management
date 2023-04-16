const MenuCategory = require('../models/MenuCategory')
const MenuItem = require('../models/MenuItem')

const MenuCategoryController = {}

MenuCategoryController.create = (req, res) => {
    const body = req.body
    console.log(body)
    const menuCategory = new MenuCategory(body)
    menuCategory.storeId = req.store.id
    menuCategory.save()
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.json(err)
        })
}

MenuCategoryController.show = (req, res) => {
    const storeId=req.params.storeId
    MenuCategory.find({storeId:storeId})
        .then((menuCategory) => {
            res.json(menuCategory)
        })
        .catch((err) => {
            res.json(err)
        })
}

MenuCategoryController.showOne = (req, res) => {
    const storeId = req.store.id
    MenuCategory.find({ storeId: storeId })
        .then((menuCategory) => {
            res.json(menuCategory)
        })
        .catch((err) => {
            res.json(err)
        })
}

MenuCategoryController.showDeleted = (req, res) => {
    const storeId = req.store.id
    MenuCategory.findDeleted({ storeId: storeId })
        .then((menuCategory) => {
            res.json(menuCategory)
        })
        .catch((error) => {
            res.json(error)
        })
}

MenuCategoryController.delete = (req, res) => {
    const id = req.params.id
    const storeId = req.store.id

    MenuItem.findDeleted({ categoryId: id, storeId: storeId })
        .then((menuItem) => {
            if (menuItem.length > 0) {
                MenuItem.deleteMany({ categoryId: id })
                    .then((result) => {
                        MenuCategory.findOneAndDelete({ _id: id, storeId: req.store.id })
                            .then((category) => {
                                return res.json(category)
                            })
                            .catch((error) => {
                                return res.json(error)
                            })
                    })
                    .catch((error) => {
                        return res.json(error)
                    })
            } else {
                MenuCategory.findOneAndDelete({ _id: id, storeId: req.store.id })
                    .then((category) => {
                        return res.json(category)
                    })
                    .catch((error) => {
                        return res.json(error)
                    })
            }
        })

}

// MenuCategoryController.softDelete = (req, res) => {
//     const id = req.params.id
//     const storeid = req.store.id
//     MenuItem.find({ categoryId: id, storeId:storeid})
//         .then((item) => {
//             if (item.length > 0) {
//                 MenuItem.delete({ categoryId: id }, (function (error, result) {
//                     if (result) {
//                         console.log(result)
//                         MenuCategory.deleteById({ _id: id })
//                             .then((category) => {
//                                 return res.json(category)
//                             })
//                             .catch((error) => {
//                                 return res.json(error)
//                             })
//                     } else {
//                         return res.json(error)
//                     }
//                 }))
//             } else {
//                 MenuCategory.deleteById({ _id: id })
//                     .then((category) => {
//                         return res.json(category)
//                     })
//                     .catch((error) => {
//                         return res.json(error)
//                     })
//             }
//         })
// }

MenuCategoryController.softDelete = (req, res) => {
    const id = req.params.id
    MenuItem.find({ categoryId: id, storeId: req.store.id })
        .then((response) => {
            console.log(response)
            MenuItem.delete({ categoryId: id, storeId: req.store.id })
                .then((response) => {
                    MenuCategory.deleteById({ _id: id, storeId: req.store.id })
                        .then((item) => {
                            res.json(item)
                        })
                        .catch((err) => {
                            res.json(err)
                        })
                })
        })
        .catch((err) => {
            console.log(err)
        })
}

// MenuCategoryController.restore = (req, res) => {
//     const id = req.params.id
//     MenuCategory.restore({ _id: id, storeId: req.store.id })
//         .then((category) => {
//             MenuItem.restore({ categoryId: id }, (function (error, result) {
//                 if (result) {
//                     console.log('result', result)
//                 } else {
//                     return res.json(error)
//                 }
//             }))
//             return res.json(expense)
//         })
//         .catch((error) => {
//             return res.json(error)
//         })
// }
MenuCategoryController.restore = (req, res) => {
    const id = req.params.id
    MenuCategory.restore({ _id: id, storeId: req.store.id })
        .then((response) => {
            MenuItem.restore({ categoryId: id })
            .then((response)=>{
                return res.json(response)
            })
            .catch((error)=>{
                return res.json(error)
            })
        })
        .catch((error) => {
            return res.json(error)
        })
}

module.exports = MenuCategoryController