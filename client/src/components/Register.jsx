import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios'

const Register = () => {

  const [form, setForm] = useState({ email: '', username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', form)
      navigate('/login')
    } catch (err) {
      console.log('error register', err);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-[#f0c3f6] w-full h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='bg-white py-8 px-10 flex flex-col justify-start gap-4 pb-24'>
        <h1 className='font-semibold text-2xl'>Register</h1>

        <input onChange={handleChange} name='email' type='email' placeholder='Email' className=' mt-2 border py-3 px-2 outline-none border-[#908f8f] w-full' />
        <input onChange={handleChange} name='username' type='text' placeholder='Username' className=' mt-2 border py-3 px-2 outline-none border-[#908f8f] w-full]' />
        <input onChange={handleChange} name='password' type='password' placeholder='Password' className='border py-3 px-2 outline-none border-[#908f8f] w-full' />

        <Link to='/forgotPassword' className='text-indigo-500 cursor-pointer hover:underline w-fit'>Forgot Password?</Link>

        <button type='submit' className='w-[432px] bg-red-600 py-2 px-4 text-white text-[20px] cursor-pointer'>{loading ? "Loading..." : 'Continue'}</button>
      
      
        <span>
            Already have account? <Link to='/login' className='cursor-pointer font-medium text-indigo-500'>Click here</Link>
        </span>


      </form>
    </div>
  )
}

export default Register
