import all_product from '../assets/all_product'
import axios from '../axios'
import React, { useEffect, useState } from 'react'

const SelectedItems = () => {
    const [cartItems, setCartItems] = useState([])

    const fetchCart = async () => {
        try {

            const res = await axios.get('/api/cart/getCart')
            setCartItems(res.data.cartItems)
        } catch (err) {
            console.log('error fetching cart', err)
        }
    }

    useEffect(() => {
        fetchCart()
        const handleCartUpdate = () => {
            fetchCart()
        }
        window.addEventListener('cartUpdated', handleCartUpdate)
        return () => window.removeEventListener('cartUpdated', handleCartUpdate)
    }, [])

    if (cartItems.length === 0) return <p>Cart is empty</p>

    const removeCart = async (productId) => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.delete('/api/cart/deleteCart', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    productId: productId
                }
            })
            fetchCart()
            window.dispatchEvent(new Event('cartUpdated'))
        } catch (err) {
            console.log('error deleting cart', err);
        }
    }

    const subtotal = cartItems.reduce((acc, item) => {
        const product = all_product.find((p) => p.id.toString() === item.productId)
        if (!product) return acc
        return acc + (product.new_price * item.quantity)
    }, 0)

    return (
        <div className='flex flex-col gap-16 px-4 md:px-10 lg:px-24 py-10 overflow-hidden'>
            
            <div className='hidden md:flex gap-6 font-semibold text-lg border-b pb-4 px-2 justify-between'>
                <span className='w-24'>Product</span>
                <span className='w-1/4'>Title</span>
                <span className='w-20 text-center'>Price</span>
                <span className='w-20 text-center'>Qty</span>
                <span className='w-20 text-center'>Total</span>
                <span className='w-20 text-center'>Remove</span>
            </div>

           
            {
                cartItems.map((item) => {
                    const product = all_product.find(p => p.id.toString() === item.productId)
                    if (!product) return null

                    return (
                        <div key={item.productId} className='flex flex-col md:flex-row gap-4 md:gap-8 items-center border-b py-4 justify-between px-2'>
                            <img src={product.image} alt={product.name} className='w-24 h-24 object-cover rounded' />

                            <span className='w-full md:w-1/4 text-center md:text-left'>{product.name}</span>
                            <span className='w-full md:w-20 text-center'>${product.new_price}</span>
                            <span className='w-full md:w-20 text-center'>{item.quantity}</span>
                            <span className='w-full md:w-20 text-center'>${(product.new_price * item.quantity).toFixed(2)}</span>
                            <button
                                className='w-full md:w-20 text-red-500 hover:underline text-center cursor-pointer'
                                onClick={() => removeCart(item.productId)}
                            >
                                Remove
                            </button>
                        </div>
                    )
                })
            }

           
            <div className='flex flex-col lg:flex-row gap-12 mt-10 w-full'>

               
                <div className='flex flex-col gap-6 w-full lg:w-1/2 px-4'>
                    <h1 className='font-semibold text-2xl'>Cart Totals</h1>
                    <div className='flex flex-col gap-3 px-4'>
                        <div className='flex justify-between'>
                            <p>Subtotal</p>
                            <p>{subtotal.toFixed(2)}$</p>
                        </div>
                        <div className='border-t'></div>
                        <div className='flex justify-between'>
                            <p>Shipping</p>
                            <p>Free</p>
                        </div>
                        <div className='border-t'></div>
                        <div className='flex justify-between font-semibold text-lg'>
                            <p>Total</p>
                            <p>{subtotal.toFixed(2)}$</p>
                        </div>
                    </div>

                    <button className='bg-orange-600 uppercase py-2 px-4 text-white font-semibold cursor-pointer hover:bg-orange-700 transition duration-300'>Proceed to checkout</button>
                </div>

               
                <div className='flex flex-col gap-3 w-full lg:w-1/2 px-2'>
                    <p className='text-gray-600'>If you have a promo code, enter it here:</p>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Promo code'
                            className='w-full py-2 px-4 border rounded bg-gray-100 outline-none'
                        />
                        <button className='absolute top-0 right-0 h-full px-4 bg-black text-white font-semibold rounded-r'>
                            Submit
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SelectedItems
