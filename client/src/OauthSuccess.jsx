import React, { useEffect } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

const OAuthSuccess = () => {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const email = params.get('email')
        const name = params.get('name')
    
        if (email && name) {
          localStorage.setItem('user', JSON.stringify({ email, name }))
          navigate('/')
        }
    
      }, [])
    
      return <p>Logging you in...</p>
}

export default OAuthSuccess
