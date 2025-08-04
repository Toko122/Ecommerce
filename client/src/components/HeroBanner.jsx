import React from 'react';
import hero_image from '../assets/hero_image.png';
import hand_icon from "../assets/hand_icon.png";
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";

const HeroBanner = () => {
    return (
        <div
            style={{
                background: 'linear-gradient(180deg, #fde1ff 0%, #e1ffea22 60%)',
            }}
            className='w-full h-screen pt-24'
        >
            <div className='flex flex-col sm:flex-row justify-center md:justify-between items-center h-full w-full px-4 sm:px-10 md:px-12 lg:px-24 lg:pl-40 gap-4'>

                <div className='flex flex-col gap-4'>

                    <p className='uppercase font-semibold'>New arrivals only</p>

                    <div className='flex flex-col gap-3'>

                        <div className='flex gap-2 items-center'>
                            <h1 className='text-5xl font-semibold'>new</h1>
                            <img src={hand_icon} alt='' className='w-[105px] h-[60px] object-contain object-center' />
                        </div>

                        <h1 className='text-5xl font-semibold'>collection</h1>
                        <h1 className='text-5xl font-semibold'>for everyone</h1>
                    </div>

                    <button className='flex items-center justify-center gap-3 bg-orange-700 rounded-[25px] py-2.5 hover:bg-orange-800 transition duration-300 cursor-pointer text-white'>
                        Latest Collection
                        <FaArrowRightLong />
                    </button>

                </div>


                <div className=''>
                    <img
                        src={hero_image}
                        alt='Hero'
                        className='w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px]'
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
