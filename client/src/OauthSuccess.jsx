import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const OauthSuccess = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const name = params.get('name')
    const email = params.get('email')

    if (token && name && email) {
      // Use the JWT token from the backend
      login(token)
      navigate('/')
    } else {
      navigate('/login')
    }
  }, [navigate, login])

  return (
    <div className='flex justify-center items-center h-screen'>
      <h1 className='text-xl font-semibold'>Logging you in...</h1>
    </div>
  )
}

export default OauthSuccess