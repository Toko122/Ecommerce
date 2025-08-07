const Cart = require('../models/cart')


exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body
    const userId = req.user.id
    try{
     const existingItem = await Cart.findOne({productId, userId})

     if(existingItem){
        existingItem.quantity += quantity
        await existingItem.save()
        return res.status(200).json({ cart: existingItem })
     } else{
        const newCartItem = await Cart.create({
            productId, userId, quantity: 1
        })
        await newCartItem.save()
        res.status(200).json({cart})
     }
    }catch(err){
        res.status(500).json({message: 'error post cart', error: err.message})
    }
}

exports.getCartQuiantity = async(req, res) => {
    try{
        const cartItems = await Cart.find({ userId: req.user.id })
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
        res.status(200).json({cartItems, totalItems})
       }catch(err){
           res.status(500).json({message: 'error getting cart', error: err.message})
       }
}

exports.deleteCart = async (req, res) => {
    const { productId } = req.body
    const userId = req.user.id

    try {
        const cartItem = await Cart.findOne({ productId, userId })

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' })
        }

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1
            await cartItem.save()
            return res.status(200).json({ message: 'Quantity decreased by 1', cartItem })
        } else {
            await Cart.findOneAndDelete({ productId, userId })
            return res.status(200).json({ message: 'Item removed from cart' })
        }

    } catch (err) {
        res.status(500).json({ message: 'Error deleting cart item', error: err.message })
    }
}
