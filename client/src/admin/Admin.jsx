import React from 'react'
import AdminSideBar from './AdminSideBar'
import AdminChat from './AdminChat'

export const Admin = () => {
    return (
        <div className='w-full h-screen pt-26 bg-[#3f3f3f]'>
            <AdminSideBar />
            <AdminChat />
        </div>
    )
}
