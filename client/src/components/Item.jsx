import React from 'react'
import { Link } from 'react-router-dom'


const Item = (props) => {


    return (
        <Link onClick={() => scrollTo(0, 0)} to={`/product/${props.id}`} key={props.id} className='w-[300px] flex flex-col gap-2 cursor-pointer hover:scale-110 transition duration-300 ease-in-out'>

            <div className=''>
                <img src={props.image} alt='' />
            </div>

            <div className='text-[#363535]'>
                {props.name}
            </div>

            <div className='flex gap-4'>
                <span className='font-semibold'>{props.new_price}$</span>
                <span className='line-through text-[#919191]'>{props.old_price}$</span>
            </div>



        </Link>
    )
}

export default Item
