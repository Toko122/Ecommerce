import axios from './axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const OAuthSuccess = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const name = query.get('name')
    const email = query.get('email')

    if (email) {
      localStorage.setItem('user', JSON.stringify({ name, email }))

      axios.post('https://ecommerce-kboc.onrender.com/api/users/google-login', { name, email })
        .then(res => {
          localStorage.setItem('token', res.data.token)
          navigate('/')
        })
        .catch(err => {
          console.error('OAuth Login error', err)
          navigate('/login')
        })
    } else {
      navigate('/')
    }
  }, [navigate])

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-xl">Logging in with Google...</p>
    </div>
  )
}

export default OAuthSuccess
