import React from 'react'
import gray_star from '../assets/star_dull_icon.png'
import yellow_star from '../assets/star_icon.png'

const StraRating = () => {

    return (
        <div className='flex gap-1.5 items-center'>
            {Array.from({ length: 5 }).map((_, index) => (
                <img src={index === 4 ? gray_star : yellow_star} className='w-4' />
            ))}
            <span className='text-[#5d5d5d] font-semibold'>(122)</span>
        </div>
    )
}

export default StraRating
