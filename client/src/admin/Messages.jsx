import React from 'react'
import AdminSideBar from './AdminSideBar'
import AdminChat from './AdminChat'

const Messages = () => {
    return (
        <div className='w-full h-screen pt-26 bg-[#3f3f3f]'>
            
            <div className='flex gap-12 items-center'>
            <AdminSideBar />
            <AdminChat />
            </div>

        </div>
    )
}

export default Messages
