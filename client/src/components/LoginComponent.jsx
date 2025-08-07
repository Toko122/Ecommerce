import axios from '../axios'
import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthProvider'

const LoginComponent = () => {
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  const [message, setMessage] = useState('')
  const location = useLocation()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const res = await axios.post('/api/users/login', form)
      if (res.data.token) {
        login(res.data.token)
        navigate('/')
      }
    } catch (err) {
      console.log('login error', err)
      setMessage('Invalid username or password')
      setTimeout(() => setMessage(''), 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-[#f0c3f6] w-full h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='bg-white mt-12 py-8 px-10 flex flex-col justify-start items-center gap-4 pb-24'>
        <h1 className='font-semibold text-4xl'>Login</h1>


        <button
          type="button"
          className=" mt-4 text-white px-8 py-2 flex cursor-pointer hover:bg-[#e2e2e2] transition duration-300 border rounded-[20px] bg-gray-100  w-full h-fit gap-14 items-center"
          onClick={() => {
            window.location.href = 'https://ecommerce-kboc.onrender.com/auth/google?prompt=select_account'
          }}
        >
          <img src='/Google__G__logo.svg.png' className='w-12 h-12' />
          <span className='font-semibold text-black text-2xl'>Login with Google</span>
        </button>


        <input
          onChange={handleChange}
          name='username'
          type='text'
          placeholder='Username'
          className='mt-2 border py-3 px-2 outline-none border-[#908f8f] w-full'
          value={form.username}
        />

        <input
          onChange={handleChange}
          name='password'
          type='password'
          placeholder='Password'
          className='border py-3 px-2 outline-none border-[#908f8f] w-full'
          value={form.password}
        />

        <Link to='/forgotPassword' className='text-indigo-500 cursor-pointer hover:underline w-fit'>
          Forgot Password?
        </Link>

        {message && (
          <p className='py-2 px-2 text-center border border-red-500 bg-[rgb(255,86,86)] text-white font-semibold'>
            {message}
          </p>
        )}

        <button
          type='submit'
          className='w-full bg-red-600 py-2 px-4 text-white text-[20px] cursor-pointer'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Continue'}
        </button>

        <span>
          Create an account?{' '}
          <Link to='/register' className='cursor-pointer font-medium text-indigo-500'>
            Click here
          </Link>
        </span>

        <div className='flex gap-2 items-center'>
          <input type='checkbox' />
          <p className='select-none text-[#313131]'>
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginComponent
