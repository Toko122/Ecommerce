import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const OauthSuccess = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const name = params.get('name')
    const email = params.get('email')

    if (name && email) {
      localStorage.setItem('user', JSON.stringify({ name, email }))
      navigate('/')
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <div className='flex justify-center items-center h-screen'>
      <h1 className='text-xl font-semibold'>Logging you in...</h1>
    </div>
  )
}

export default OauthSuccess