import React, { useContext, useState } from 'react'
import { ShopContext } from '../ShopContext'
import dropDown_icon from '../assets/dropdown_icon.png'
import Item from '../components/Item'

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext)

    const [sortType, setSortType] = useState('default')
    const [openSort, setOpenSort] = useState(false)


    const getSortLabel = () => {
        if (sortType === 'low-to-high') return 'Low to High'
        if (sortType === 'high-to-low') return 'High to Low'
        return 'Sort by'
    }

    const filteredProducts = all_product
        .filter((item) => item.category === props.category)
        .sort((a, b) => {
            if (sortType === 'low-to-high') {
                return a.new_price - b.new_price
            } else if (sortType === 'high-to-low') {
                return b.new_price - a.new_price
            } else {
                return 0
            }
        })

    return (
        <div className='pt-36 lg:px-58 md:px-14 px-8 flex flex-col items-center justify-center'>
            <div className='w-full flex flex-col gap-8 justify-center'>
                <img src={props.banner} />

                <div className='flex md:flex-row flex-col gap-4 justify-between items-center'>

                    <p>
                        <span className='font-bold'> Showing 1 - {Math.min(12, filteredProducts.length)} </span> out of {filteredProducts.length} Products
                    </p>

                    <div onClick={() => setOpenSort(!openSort)} className='flex py-2 px-4 relative rounded-[20px] border gap-1 items-center cursor-pointer border-gray-700 select-none'>
                        <span>{getSortLabel()}</span>
                        <img src={dropDown_icon} className='w-3 h-2' />

                        {
                            openSort &&
                            <div className='absolute top-full mt-1 -left-8 bg-white shadow-lg rounded p-3 flex flex-col gap-2 z-10 w-[170px]'>
                                <button onClick={() => { setSortType('low-to-high'); setOpenSort(false); }}>Price: Low to High</button>
                                <button onClick={() => { setSortType('high-to-low'); setOpenSort(false); }}>Price: High to Low</button>
                                <button onClick={() => { setSortType('default'); setOpenSort(false); }}>Default</button>
                            </div>
                        }
                    </div>
                </div>

                <div className='flex flex-wrap gap-16 items-center justify-center'>
                    {
                        filteredProducts.map((item) => (
                            <Item
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                new_price={item.new_price}
                                old_price={item.old_price}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ShopCategory
