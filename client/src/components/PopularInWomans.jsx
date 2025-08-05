import React from 'react'
import data from '../assets/data'
import { Link, useNavigate } from 'react-router-dom'
import Item from '../components/Item'

const PopularInWomans = () => {

    const navigate = useNavigate()

    return (
        <div className='w-full py-20 h-full'>
            <div className='flex h-full flex-col gap-14 w-full justify-center items-center'>

                <div className='flex flex-col gap-5 items-center'>
                    <h1 className='uppercase font-semibold sm:text-4xl text-2xl'>Popular In Women</h1>
                    <span className='h-[4px] rounded-lg w-1/2 bg-black'></span>
                </div>

                <div className='flex gap-8 flex-wrap justify-center'>
                    {
                        data.map((item) => (

                            <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />

                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default PopularInWomans
