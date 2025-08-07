import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const OAuthSuccess = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const email = params.get('email')
        const name = params.get('name')

        if (email && name) {
            localStorage.setItem('user', JSON.stringify({ email, name }))
            navigate('/')
        } else {
            navigate('/login')
        }

    }, [])

    return(
        <div className='flex justify-center items-center h-screen'>
          <h1 className='text-2xl font-bold'>Login successful. Redirecting...</h1>
       </div>
    )
}

export default OAuthSuccess
