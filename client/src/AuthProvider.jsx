import React, { createContext, useContext, useState, useEffect } from 'react'
import {jwtDecode} from 'jwt-decode'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))
    const [user, setUser] = useState(null)


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const decoded = jwtDecode(token)
                setUser({ id: decoded.id || decoded._id, ...decoded })
                setLoggedIn(true)
            } catch (err) {
                console.log('Error decoding token:', err)
                setUser(null)
                setLoggedIn(false)
            }
        }
    }, [])

    const login = (token) => {
        localStorage.setItem('token', token)
        try {
            const decoded = jwtDecode(token)
            setUser({ id: decoded.id || decoded._id, ...decoded })
            setLoggedIn(true)
        } catch (err) {
            console.log('Error decoding token on login:', err)
            setUser(null)
            setLoggedIn(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setLoggedIn(false)
    }

    const autoLogout = async () => {
        const token = localStorage.getItem('token')
        if (!token) return null
        try {
            const decoded = jwtDecode(token)
            const currentTime = Date.now() / 1000
            if (decoded.exp < currentTime) {
                logout()
            }
        } catch (err) {
            console.log('Error in autoLogout:', err)
        }
    }

    return (
        <AuthContext.Provider value={{ login, logout, loggedIn, autoLogout, user, token: localStorage.getItem('token') }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext)
