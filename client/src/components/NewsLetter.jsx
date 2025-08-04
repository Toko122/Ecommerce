import React from 'react'

const NewsLetter = () => {
    return (
        <div className='w-full flex justify-center items-center pt-24 pb-10 px-4 lg:px-20'>

            <div
                style={{
                    background: 'linear-gradient(180deg, #fde1ff 0%, #e1ffea22 60%)',
                }}
                className='md:w-[1300px] w-fit h-[400px] flex justify-center flex-col gap-8 items-center px-6'>

                <h1 className='lg:text-5xl text-4xl font-semibold text-center'>Get Exclusive Offers On Your Email</h1>

                <p className='text-[18px] text-[#3b3a3a] font-medium text-center'>Subscribe to our newsletter and stay updated.</p>

                <div className='relative w-full lg:w-[500px]'>
                    <input type='email' placeholder='Your Email' className='border outline px-4 border-gray-200 py-3 rounded-[30px] w-full' />
                    <button className='absolute right-0 bg-black text-white rounded-[25px] px-8 py-2 font-semibold h-full cursor-pointer'>Subscribe</button>
                </div>

            </div>

        </div>
    )
}

export default NewsLetter
