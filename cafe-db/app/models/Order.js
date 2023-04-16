const mongoose=require('mongoose')
const mongoose_delete=require('mongoose-delete')
const Schema=mongoose.Schema
const orderSchema=new Schema({
    menuItem:{
        type:Schema.Types.ObjectId,
        ref:'MenuItem',
        required:true
    },
    count:{
        type:Number,
        required:true
    },
    storeId:{
        type:Schema.Types.ObjectId,
        ref:'Store',
        required:true
    },
    orderDate:{
        type:Date,
        required:true,
        default:Date.now()
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

orderSchema.plugin(mongoose_delete, { overrideMethods: 'all' })

const Order=mongoose.model('Order',orderSchema)
module.exports=Order