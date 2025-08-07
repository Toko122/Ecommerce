import React, { createContext, useContext, useState } from 'react'
import {jwtDecode} from 'jwt-decode'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))

    const login = (token) => {
        localStorage.setItem('token', token)
        setLoggedIn(true)
    }

    const logout = () => {
       localStorage.removeItem('token')
       setLoggedIn(false)
    }

    const autoLogout = async() => {
         const token = localStorage.getItem('token')
         if(!token) return null
         try{
           const decode = jwtDecode(token)
           const currentTime = Date.now() / 1000
           if(decode.exp < currentTime){
            logout()
           }
         }catch(err){
            console.log('error aoutLogout', err);
         }
    }

    return (
        <AuthContext.Provider value={{login, logout, loggedIn, autoLogout}}>
           {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)