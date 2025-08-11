import React from 'react'
import { Link } from 'react-router-dom'
import { MdForwardToInbox } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { RxDashboard } from "react-icons/rx";
import { BsCollection } from "react-icons/bs";

const AdminSideBar = () => {
    return (
        <div className='h-full'>
            <div className='h-full bg-[#1d1d1d] px-8 py-8 w-[300px] rounded-t-lg'>

                <div className='flex flex-col gap-4 text-white font-semibold text-2xl'>
                    <Link to='/admin' className='hover:underline w-fit'>
                      <div className='flex items-center gap-2'>
                         <RxDashboard />
                         <span>Dashboard</span>
                      </div>
                    </Link>

                    <Link to='/admin/statics' className='hover:underline w-fit'>
                        <div className='flex items-center gap-2'>
                            <FcStatistics />
                            <span>Statics</span>
                        </div>
                    </Link>

                    <Link to='/admin/invetory' className='hover:underline w-fit'>
                       <div className='flex items-center gap-2'>
                            <BsCollection />
                            <span>Invetory</span>
                        </div>
                    
                    </Link>

                    <Link to='/admin/messages' className='hover:underline w-fit relative'>
                        <div className='flex gap-2 items-center'>
                            <MdForwardToInbox />
                            <span>Messages</span>
                        </div>
                        <span className='bg-red-500 rounded-full px-1.5 absolute -top-0.5 -right-3.5 text-sm text-white'>0</span>
                    </Link>

                </div>

            </div>
        </div>
    )
}

export default AdminSideBar
