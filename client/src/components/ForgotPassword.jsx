import React, { useState } from 'react'
import axios from '../axios'


const ForgotPassword = () => {

  const [form, setForm] = useState({ email: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/email/sendEmail', form)

    } catch (err) {
      console.log('cant send email', err);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full h-screen bg-[#eabdff] flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center bg-white py-14 px-10 rounded-md'>
        <h1 className='font-semibold text-black text-4xl'>Enter Your Email</h1>
        <input onChange={(e) => setForm({email: e.target.value})} type='email' placeholder='Email' className='border outline-none py-2 px-2 mt-4 w-[400px]' />
        <button type='submit' className='w-full py-2 px-4 cursor-pointer bg-orange-700 hover:bg-orange-800 transition duration-200 text-white font-semibold'>{loading ? 'Loading...' : 'Submit'}</button>
      </form>
    </div>
  )
}

export default ForgotPassword
