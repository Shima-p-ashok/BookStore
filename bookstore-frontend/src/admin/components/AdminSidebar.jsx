import React from 'react'
import { IoIosHome } from "react-icons/io";
import { FaBagShopping } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Link } from 'react-router-dom';


function AdminSidebar() {
  return (
    <div className='flex flex-col w-60 h-screen bg-amber-900 justify-center p-5'>
     <img src="https://icon-library.com/images/admin-icon-png/admin-icon-png-20.jpg" alt="" height={'100'} weight={'100'} />
     <h1 className='text-amber-50 text-3xl text-center my-3'>Admin</h1>

     <ul className='text-center m-3'>
      <Link to={'/admin-home'}>
      <li className='border-0 hover:border-2 rounded bg-amber-700 hover:bg-amber-100 shadow-2xl flex text-xl my-3 py-2'> <IoIosHome className='text-2xl mx-3' />Home</li>
      </Link>
      
      <Link to={'/admin-books'}>
      <li className='border-0 hover:border-2 rounded bg-amber-700 hover:bg-amber-100 shadow-2xl flex text-xl my-3 py-2'> <FaBook className='text-2xl mx-3' />All Books</li>
      </Link>
      
      <Link to={'/admin-career'}>
      <li className='border-0 hover:border-2 rounded bg-amber-700 hover:bg-amber-100 shadow-2xl flex text-xl my-3 py-2'><FaBagShopping className='text-2xl mx-3' /> Careers</li>
      </Link>
      
       <Link to={'/admin-settings'}>
       <li className='border-0 hover:border-2 rounded bg-amber-700 hover:bg-amber-100 shadow-2xl flex text-xl my-3 py-2'><IoMdSettings className='text-2xl mx-3' />Settings</li>
       </Link>
      
     </ul>
    </div>
  )
}

export default AdminSidebar
