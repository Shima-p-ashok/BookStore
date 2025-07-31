import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function AdminHome() {
  return (
    <div>
      <AdminHeader/>
      <div className='row flex h-150'>
        <div className='col flex flex-col items-center'>
          <AdminSidebar/>
        </div>
        <div className='col flex justify-around h-50'>
          <div className='bg-blue-800 mx-10 p-10 rounded-2xl shadow-2xl text-amber-50 text-center'>
            <p>Total Number of Books</p>
            <p className='text-2xl font-extrabold'>100+</p>
          </div>

          <div className='bg-red-500 mx-10 p-10 rounded-2xl shadow-2xl text-amber-50 text-center'>
            <p>Total Number of Users</p>
            <p className='text-2xl font-extrabold'>100+</p>
          </div>

          <div className='bg-yellow-400 mx-10 p-10 rounded-2xl shadow-2xl text-amber-50 text-center'>
            <p>Total Number of Employees</p>
            <p className='text-2xl font-extrabold'>100+</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
