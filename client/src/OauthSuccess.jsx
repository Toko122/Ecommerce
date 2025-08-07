import axios from './axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from './AuthProvider'

const OAuthSuccess = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const name = query.get('name')
    const email = query.get('email')

    if (email) {
      localStorage.setItem('user', JSON.stringify({ name, email }))

      axios.post('https://ecommerce-kboc.onrender.com/api/users/google-login', { name, email })
        .then(res => {
          const token = res.data.token
          localStorage.setItem('token', token)

          login(token)

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
