import React from 'react'
import exclusive_banner from '../assets/exclusive_image.png'

const ExclusiveBanner = () => {
    return (
        <div className='w-full flex justify-center items-center pt-36 pb-50 px-12 lg:px-20'>

            <div
                style={{
                    background: 'linear-gradient(180deg, #fde1ff 0%, #e1ffea22 60%)',
                }}
                className='w-[1300px] h-fit md:h-[450px] md:gap-0 gap-6 flex md:flex-row flex-col-reverse justify-between px-16 lg:px-28 items-center'>

                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-5xl font-semibold'>Exclusive</h1>
                        <h1 className='text-5xl font-semibold'>Offers For You</h1>
                    </div>
                    <p className='uppercase text-[17px]'>Only best seller products</p>
                    <button className='bg-orange-700 rounded-[25px] py-2.5 hover:bg-orange-800 transition duration-300 cursor-pointer text-white'>Check now</button>
                </div>

                <div className='h-full'>
                    <img src={exclusive_banner} alt='' className='h-full' />
                </div>

            </div>

        </div>
    )
}

export default ExclusiveBanner
