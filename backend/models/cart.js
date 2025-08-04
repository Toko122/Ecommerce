const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    productId: { type: String, required: true },
    quantity: {type: Number, default: 1}
})

CartSchema.index({userId: 1, productId:1}, {unique: true})

module.exports = mongoose.model("Cart", CartSchema)