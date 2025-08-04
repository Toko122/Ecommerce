import axios from '../axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthProvider'


const LoginComponent = () => {

    const [form, setForm] = useState({ username: '', password: '' })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', form)
            if (res.data.token) {
                login(res.data.token)
            }
            navigate('/');
        } catch (err) {
            console.log('error register', err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='bg-[#f0c3f6] w-full h-screen flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='bg-white py-8 px-10 flex flex-col justify-start gap-4 pb-24'>
                <h1 className='font-semibold text-2xl'>Login</h1>

                <input onChange={handleChange} name='username' type='text' placeholder='Username' className=' mt-2 border py-3 px-2 outline-none border-[#908f8f] w-full' />
                <input onChange={handleChange} name='password' type='password' placeholder='Password' className='border py-3 px-2 outline-none border-[#908f8f] w-full' />

                <Link to='/forgotPassword' className='text-indigo-500 cursor-pointer hover:underline w-fit'>Forgot Password?</Link>

                <button className='w-full bg-red-600 py-2 px-4 text-white text-[20px] cursor-pointer'>{loading ? "Loading..." : 'Continue'}</button>

                <span>
                    Create an account? <Link to='/register' className='cursor-pointer font-medium text-indigo-500'>Click here</Link>
                </span>

                <div className='flex gap-2 items-center'>
                    <input type='checkbox' />
                    <p className='select-none text-[#313131]'>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>

            </form>
        </div>
    )
}

export default LoginComponent
