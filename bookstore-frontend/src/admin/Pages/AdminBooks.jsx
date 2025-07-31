import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSIdebar from '../components/AdminSidebar'
import { Card, Button } from "flowbite-react";
function AdminBooks() {
  const [bookStatus, setBookStatus] = useState(true)
  const [userStatus, setUserStatus] = useState(false)
  return (
    <div>
      <AdminHeader />
      <div className="row flex h-150">
        <div className="col flex flex-col items-center">
          <AdminSIdebar />
        </div>

        <div className="col bg-amber-50 w-400">
          <h1 className='text-4xl font-extrabold text-center mt-10'>All Books</h1>
          <div class="flex flex-row mt-5">
            <div class="basis-128"></div>
            <div class="basis-64">
              <div className="flex">
                <p className={bookStatus?'border border-r-2  border-l-2 border-t-2 border-b-0 p-3 mx-2   ':'border border-r-2  border-l-2 border-t-2 border-b-2  p-3 mx-2 shadow-2xl '} onClick={() => { setBookStatus(true); setUserStatus(false) }}>Book List</p>
                <p onClick={() => { setBookStatus(false); setUserStatus(true) }} className={userStatus?'border border-r-2  border-l-2 border-t-2 border-b-0 p-3 mx-2':'border border-r-2  border-l-2 border-t-2 border-b-2 p-3 mx-2 shadow-2xl'}>Users</p>
              </div>


            </div>
            <div class="basis-128"></div>

          </div>
          <div className="flex-row">
            {
              bookStatus ?
                <div className='flex flex-wrap p-5 '>
                  <Card
                    className="max-w-sm !bg-amber-50 h-80 w-50 !text-amber-950 ">

                    <img src="https://cdn.pixabay.com/photo/2024/10/23/19/54/ai-generated-9144025_1280.jpg" alt="" width={'200px'} height={'300px'} />
                    <h5 className="text-2xl font-bold tracking-tight !text-gray-900 text-center">
                      Noteworthy
                    </h5>
                    <p className="font-normal text-red-700 text-center">
                      $668     </p>
                  </Card>
                </div>
                :
                <div className='flex p-5'>
                  <Card className="max-w-sm !bg-amber-50">
                                        <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/large_2x/user-icon-on-transparent-background-free-png.png
" alt="" width={'200px'} height={'300px'} />

                    <h5 className="text-2xl font-bold tracking-tight !text-gray-900">
                      ID : 
                    </h5>
                    <h5 className="text-2xl font-bold tracking-tight !text-gray-900">
                      Name : 
                    </h5>
                    <h5 className="text-2xl font-bold tracking-tight !text-gray-900">
                      Email : 
                    </h5>
                   
                   
                  </Card>
                </div>
            }

          </div>
        </div>

      </div>

    </div>
  )
}

export default AdminBooks