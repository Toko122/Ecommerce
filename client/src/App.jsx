import './App.css'

import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import Navbar from './layout/Navbar'
import { Login } from './pages/Login'
import ShopCategory from './pages/ShopCategory'

import men_banner from './assets/banner_mens.png'
import women_banner from './assets/banner_women.png'
import kid_banner from './assets/banner_kids.png'
import Footer from './layout/Footer'
import ProductPage from './components/ProductPage'

import ShopContextProvider from './ShopContext'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'

import AuthProvider from './AuthProvider'
import { CartPage } from './pages/CartPage'
import ResetPassword from './components/ResetPassword'
import OAuthSuccess from './OauthSuccess'

function App() {


  return (
    <>


        <ShopContextProvider>
          <AuthProvider>
            <Navbar />

          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/men' element={<ShopCategory banner={men_banner} category='men' />} />
            <Route path='/women' element={<ShopCategory banner={women_banner} category='women' />} />
            <Route path='/kid' element={<ShopCategory banner={kid_banner} category='kid' />} />

            <Route path='/login' element={<Login />} />

            <Route path='/product/:id' element={<ProductPage />} />

            <Route path='/register' element={<Register />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />

            <Route path='/cart' element={<CartPage />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />

          </Routes>

          <Footer />
        </AuthProvider>
      </ShopContextProvider>

    </>
  )
}

export default App
