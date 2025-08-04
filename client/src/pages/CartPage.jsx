import React from 'react'
import SelectedItem from '../components/SelectedItems'

export const CartPage = () => {
    return (
        <div className='py-36 px-14'>
            <div className='flex flex-col gap-8 w-full items-center'>
                <SelectedItem />
            </div>
        </div>
    )
}
