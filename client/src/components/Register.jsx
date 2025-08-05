import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios'

const Register = () => {

  const [form, setForm] = useState({ email: '', username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [usernameError, setUsernameError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    setPasswordError('')
    setEmailError('')
    setUsernameError('')

    setLoading(true)


    if (form.username.trim() === '') {
      setUsernameError('Enter your username')
      setTimeout(() => setUsernameError(''), 2000)
      setLoading(false)
    }

    if (form.email.trim() === '') {
      setEmailError('Enter your email')
      setTimeout(() => setEmailError(''), 2000)
      setLoading(false)
    }

    if (form.password.trim().length < 6) {
      setPasswordError('Password must be more than 6 characters')
      setTimeout(() => setPasswordError(''), 2000)
      setLoading(false)
      return
    }


    try {
      const res = await axios.post('/api/users/register', form)
      navigate('/login')
    } catch (err) {
      const errorMsg = err.response?.data

  if (errorMsg === 'user already exist') {
    setEmailError(errorMsg)
    setTimeout(() => setEmailError(''), 2000)
  }

  if (errorMsg === 'user already exist') {
    setUsernameError(errorMsg)
    setTimeout(() => setUsernameError(''), 2000)
  }

  console.log('error register', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-[#f0c3f6] w-full h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='bg-white py-8 px-10 flex flex-col justify-start gap-4 pb-24'>
        <h1 className='font-semibold text-2xl'>Register</h1>

        <input
          onChange={handleChange}
          name='email'
          type='email'
          placeholder='Email'
          className='mt-2 border py-3 px-2 outline-none border-[#908f8f] w-full'
          value={form.email}
        />
        {emailError && (
          <p className='w-full p-2 bg-[rgba(249,103,103,0.7)] text-white font-semibold'>
            {emailError}
          </p>
        )}

        <input
          onChange={handleChange}
          name='username'
          type='text'
          placeholder='Username'
          className='mt-2 border py-3 px-2 outline-none border-[#908f8f] w-full'
          value={form.username}
        />

        {usernameError && (
          <p className='w-full p-2 bg-[rgba(249,103,103,0.7)] text-white font-semibold'>
            {usernameError}
          </p>
        )}

        <input
          onChange={handleChange}
          name='password'
          type='password'
          placeholder='Password'
          className='border py-3 px-2 outline-none border-[#908f8f] w-full'
          value={form.password}
        />
        {passwordError && (
          <p className='w-full p-2 bg-[rgba(249,103,103,0.7)] text-white font-semibold'>
            {passwordError}
          </p>
        )}

        <button
          type='submit'
          disabled={loading}
          className='w-[432px] bg-red-600 py-2 px-4 text-white text-[20px] cursor-pointer disabled:opacity-50'
        >
          {loading ? 'Loading...' : 'Continue'}
        </button>

        

        <span>
          Already have account?{' '}
          <Link to='/login' className='cursor-pointer font-medium text-indigo-500'>
            Click here
          </Link>
        </span>
      </form>
    </div>
  )
}

export default Register
