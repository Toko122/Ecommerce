import React, { useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import all_product from '../assets/all_product'
import { useNavigate, useParams } from 'react-router-dom'
import StraRating from './StraRating'
import axios from '../axios'
import { useAuth } from '../AuthProvider'

const sizes = [
    { 1: <button className='p-2 bg-gray-100 rounded-md px-4 cursor-pointer hover:bg-gray-300 transition duration-200'>S</button> },
    { 2: <button className='p-2 bg-gray-100 rounded-md px-4 cursor-pointer hover:bg-gray-300 transition duration-200'>M</button> },
    { 3: <button className='p-2 bg-gray-100 rounded-md px-4 cursor-pointer hover:bg-gray-300 transition duration-200'>L</button> },
    { 4: <button className='p-2 bg-gray-100 rounded-md px-4 cursor-pointer hover:bg-gray-300 transition duration-200'>XL</button> },
    { 5: <button className='p-2 bg-gray-100 rounded-md px-4 cursor-pointer hover:bg-gray-300 transition duration-200'>XXL</button> },
]

const ProductPage = () => {

    const { id } = useParams()
    const product = all_product.find((p) => p.id.toString() === id)
    const [succesMessage, setSuccesMessage] = useState('')
    const {loggedIn} = useAuth()
    const navigate = useNavigate()

    const addToCart = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const res = await axios.post('/api/cart/addToCart', { productId: product.id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setSuccesMessage('Item added in your cart')

            window.dispatchEvent(new Event('cartUpdated'))

        } catch (err) {
            console.log('error add to cart', err);
           
        }
    }


    return (
        <div className='pt-28 sm:pt-24 md:pt-28 lg:pt-36 px-4 sm:px-6 md:px-8 lg:px-14 xl:px-22 2xl:px-30 pb-20 sm:pb-30 lg:pb-40'>

            <div className='flex flex-col gap-4'>
                <Breadcrumbs />

                <div className='p-2 flex flex-col lg:flex-row gap-10'>

                <div className='flex flex-col lg:flex-row gap-6 w-full h-auto lg:h-[700px]'>
  
                 <div className='w-full lg:w-[160px] h-full'>
                   <div className='grid grid-cols-4 lg:grid-cols-1 gap-4 w-full h-full'>
                     {[1, 2, 3, 4].map((_, i) => (
                       <div key={i} className='w-full h-full aspect-square'>
                         <img
                           src={product.image}
                           alt=''
                           className='w-full h-full object-cover object-center rounded'
                         />
                       </div>
                     ))}
                   </div>
                 </div>

  
                 <div className='flex-1 h-full'>
                   <img
                     src={product.image}
                     alt=''
                     className='w-full h-full object-cover object-center rounded'
                   />
                 </div>
               </div>

                    <div className='flex flex-col gap-6 w-full lg:w-1/2'>

                        <div className='flex flex-col gap-4'>
                            <h1 className='font-semibold text-2xl sm:text-3xl md:text-4xl leading-tight'>{product.name}</h1>
                            <StraRating />
                        </div>

                        <div className='flex items-center gap-4'>
                            <p className='font-semibold text-gray-500 text-lg md:text-xl line-through'>${product.old_price}</p>
                            <p className='font-semibold text-red-700 text-lg md:text-xl'>${product.new_price}</p>
                        </div>

                        <div className='flex flex-col gap-6'>
                            <h1 className='text-[#7a7a7a] text-lg md:text-xl font-semibold'>Select Size</h1>

                            <div className='flex gap-3 flex-wrap items-center'>
                                {
                                    sizes.map((size, index) => (
                                        <div key={index}>
                                            {Object.values(size)}
                                        </div>
                                    ))
                                }
                            </div>

                            <button
                                onClick={() => {
                                    loggedIn ? addToCart : navigate('/login')
                                }}
                                className='uppercase bg-red-600 py-2 px-5 text-white w-fit font-semibold cursor-pointer hover:bg-red-800 transition duration-300 rounded-md'
                            >
                                Add To Cart
                            </button>

                            <span className='text-lg md:text-xl font-semibold'>
                                Category: <span className='font-normal text-[#2a2a2a]'>{product.category}</span>
                            </span>

                        </div>

                    </div>

                </div>

            </div>
        </div>


    )
}

export default ProductPage
