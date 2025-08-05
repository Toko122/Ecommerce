import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import shopLogo from '../assets/logo.png';
import cartIcon from '../assets/cart_icon.png';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useAuth } from '../AuthProvider'
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState('shop');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { loggedIn, logout, autoLogout } = useAuth()

  const [cartCount, setCartCount] = useState(0)


  const fetchCartItem = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get('/api/cart/getCart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCartCount(res.data.totalItems)
    } catch (err) {
      console.log('error getting cart', err)
    }
  }

  useEffect(() => {
    if (loggedIn) {
      fetchCartItem()
    } else {
      setCartCount(0)
    }
  
    const handleUpdate = () => {
      fetchCartItem()
    }
  
    window.addEventListener('cartUpdated', handleUpdate)
  
    return () => {
      window.removeEventListener('cartUpdated', handleUpdate)
    }
  
  }, [loggedIn])

    const location = useLocation()

    return (
      <div className='w-full bg-white shadow-lg fixed top-0 z-50'>
        <div className='flex lg:justify-around justify-between pr-16 items-center px-6 py-4'>

          <div onClick={() => { navigate('/'); setMenu('shop') }} className='flex gap-2 items-center cursor-pointer'>
            <img src={shopLogo} alt='Logo' className='w-15 h-15' />
            <h1 className='sm:text-3xl text-2xl font-semibold uppercase'>Shopper</h1>
          </div>


          <div className='lg:hidden'>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <IoClose className='text-3xl' />
              ) : (
                <GiHamburgerMenu className='text-3xl' />
              )}
            </button>
          </div>


          <div className='hidden lg:flex gap-8 items-center'>
            {['shop', 'men', 'women', 'kid'].map((item) => {

              const isHome = (item === 'shop' && location.pathname === '/') || location.pathname.startsWith(`/${item}`)

              return (
                <Link
                  key={item}
                  to={item === 'shop' ? '/' : `/${item}`}
                  onClick={() => setMenu(item)}
                  className='text-xl flex flex-col items-center'
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  {isHome && <span className='bg-red-500 h-[3px] rounded-full w-full mt-1' />}

                </Link>
              )
            })}
          </div>

          <div className='gap-6 items-center lg:flex hidden'>

            {
              loggedIn ? (
                <button
                  onClick={() => {
                    logout()
                    setCartCount(0)
                    navigate('/login')
                  }}
                  className='text-xl border rounded-[30px] py-2 px-9 hover:bg-[#f4f3f3] transition duration-200'
                >
                  Logout
                </button>
              ) : (
                <Link
                  to='/login'
                  className='text-xl border rounded-[30px] py-2 px-9 hover:bg-[#f4f3f3] transition duration-200'
                >
                  Login
                </Link>
              )
            }
            <Link to='/cart' className='relative'>
              <span className='bg-red-500 rounded-full px-1.5 absolute -top-2 -right-2 text-sm text-white'>{cartCount}</span>
              <img src={cartIcon} alt='Cart' className='w-8 h-8' />
            </Link>
          </div>

        </div>

        {
          mobileMenuOpen ? (
            <>
              <div className='flex lg:hidden gap-4 items-center flex-col py-6 px-8 md:px-10'>
                {['shop', 'men', 'women', 'kids'].map((item) => (
                  <>

                    <Link
                      key={item}
                      to={item === 'shop' ? '/' : `/${item}`}
                      onClick={() => setMenu(item)}
                      className='text-xl flex flex-col items-center '
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                      {menu === item && <span className='bg-red-500 h-[3px] rounded-full w-full mt-1' />}
                    </Link>

                    <span className='w-full bg-gray-200 h-[1px]'></span>
                  </>
                ))}

                <div className='gap-6 items-center lg:hidden flex justify-between w-full'>
                  {loggedIn ? (
                    <button
                      onClick={() => {
                        logout()
                        navigate('/login')
                      }}
                      className='text-xl border rounded-[30px] py-2 px-9 hover:bg-[#f4f3f3] transition duration-200'
                    >
                      Logout
                    </button>
                  ) : (
                    <Link to='/login' className='text-xl border rounded-[30px] py-2 px-9 hover:bg-[#f4f3f3] transition duration-200'>
                      Login
                    </Link>
                  )}
                  <Link to='/cart' className='relative'>
                    <span className='bg-red-500 rounded-full px-1.5 absolute -top-2 -right-2 text-sm text-white'>{cartCount}</span>
                    <img src={cartIcon} alt='Cart' className='w-8 h-8' />
                  </Link>
                </div>

              </div>


            </>
          ) : (
            <>
            </>
          )
        }

      </div>



    );
  };

  export default Navbar;
