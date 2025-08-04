import React from 'react'
import new_collections from '../assets/new_collections'
import { Link } from 'react-router-dom'

const NewCollections = () => {

    return (
        <div className='w-full py-20 h-full'>
            <div className='flex h-full flex-col gap-14 w-full justify-center items-center'>

                <div className='flex flex-col gap-5 items-center'>
                    <h1 className='uppercase font-semibold sm:text-4xl text-2xl'>New Collections</h1>
                    <span className='h-[4px] rounded-lg w-1/2 bg-black'></span>
                </div>

                <div className='flex gap-8 flex-wrap justify-center px-12 lg:px-24'>
                    {
                        new_collections.map((item) => (
                            <Link onClick={() => scrollTo(0, 0)} to={`/product/${item.id}`} key={item.id} className='flex flex-col gap-2 w-[350px] cursor-pointer hover:scale-110 transition duration-300 ease-in-out'>

                                <img src={item.image} alt='' />
                                <p>{item.name}</p>

                                <div className='flex gap-4'>
                                    <h1 className='font-semibold'>{item.new_price}$</h1>
                                    <h1 className='line-through text-[#919191]'>{item.old_price}$</h1>
                                </div>

                            </Link>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default NewCollections
