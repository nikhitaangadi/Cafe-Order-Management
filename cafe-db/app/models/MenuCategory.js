const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')

const Schema = mongoose.Schema
const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
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

categorySchema.plugin(mongoose_delete, { overrideMethods: 'all' })
const MenuCategory = mongoose.model('MenuCategory', categorySchema)
module.exports = MenuCategory