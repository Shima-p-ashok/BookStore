import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AdminHome() {

const books = [
  { title: "The Great Gatsby", sold: 120 },
  { title: "To Kill a Mockingbird", sold: 200 },
  { title: "1984", sold: 180 },
  { title: "The Alchemist", sold: 250 },
];

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
        
       <div className="bg-white p-6 m-4 rounded-2xl shadow-md w-full h-96">
      <h2 className="text-xl font-semibold mb-4">Book Sales</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={books}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Line dataKey="sold" fill="#6366F1" radius={[10, 10, 0, 0]} />
        </LineChart>
      </ResponsiveContainer>
    </div>


      </div>
    </div>
  )
}

export default AdminHome
