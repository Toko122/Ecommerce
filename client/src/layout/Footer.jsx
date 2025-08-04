import React from 'react'
import shopLogo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const socialLinks = [
    { icon: <FaFacebook />, url: 'https://www.facebook.com/toko.migineishvili.2025' },
    { icon: <FaGithub />, url: 'https://github.com/Toko122' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/tokomigineishvili/' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/toko-migineishvili-a19770370/' },
];


const Footer = () => {

    const navigate = useNavigate()

    return (
        <div className='w-full py-16'>
            <div className='flex flex-col gap-6 w-full justify-center items-center'>

                <div onClick={() => { navigate('/'); scrollTo(0, 0) }} className='flex gap-2 items-center cursor-pointer'>
                    <img src={shopLogo} alt='Logo' className='w-15 h-15' />
                    <h1 className='sm:text-3xl text-2xl font-semibold uppercase'>Shopper</h1>
                </div>

                <div className='flex gap-8 items-center flex-wrap text-center justify-center px-6'>
                    {
                        ['company', 'products', 'offices', 'about', 'contact'].map((item, index) => (
                            <h1 key={index} className='text-2xl cursor-pointer'> {item.charAt(0).toUpperCase() + item.slice(1)} </h1>
                        ))
                    }
                </div>

                <div className='flex gap-6 mt-4'>
                    {
                        socialLinks.map((item, index) => (
                            <Link
                                key={index}
                                to={item.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-4xl text-black hover:text-[#8f8f8f] transition duration-300 cursor-pointer'
                            >
                                {item.icon}
                            </Link>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default Footer
