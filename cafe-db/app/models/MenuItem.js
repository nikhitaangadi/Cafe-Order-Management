const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')

const Schema = mongoose.Schema
const itemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'MenuCategory',
        required: true
    },
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
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
itemSchema.plugin(mongoose_delete, { overrideMethods: 'all' })
const MenuItem = mongoose.model('MenuItem', itemSchema)
module.exports = MenuItem