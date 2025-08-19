import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSIdebar from '../components/AdminSidebar'
import { Card, Button } from "flowbite-react";
import { getAdminAllBookAPI, getAllUsersAdminAPI, adminApprovedBookAPI } from '../../services/allAPIs';
import { serverURL } from '../../services/serverURL';


function AdminBooks() {
  const [bookStatus, setBookStatus] = useState(true)
  const [userStatus, setUserStatus] = useState(false)

  const [ApproveStatus, setApproveStatus] = useState(false)


  //To hold token
  const [token, setToken] = useState("")

  const [books, setBooks] = useState([])
  const [users, setUsers] = useState([])


  const getAllBooksAdmin = async () => {
    //create request header, includes token
    const reqHeader = { Authorization: `Bearer ${token}` }

    try {
      //API call
      const result = await getAdminAllBookAPI(reqHeader)
      console.log(result);
      setBooks(result.data)
      // setTempdata(result.data) //temporary
    }
    catch (err) {
      console.log(err);
    }
  }

  //approve books
  const handleApprove = async (data) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const result = await adminApprovedBookAPI(data, reqHeader)
      console.log(result);
      setApproveStatus(true)
      getAllBooksAdmin(token)


    } catch (error) {
      console.log(error);


    }

  }



  //get all users
  const getAllUsersAdmin = async (token) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const result = await getAllUsersAdminAPI(reqHeader)
      console.log(result);
      setUsers(result.data)
      setBookStatus(false); setUserStatus(true)

    } catch (err) {
      console.log("err" + err);

    }
  }
  console.log(users);//users list

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken)); // removes extra quotes
    }
  }, []);

  useEffect(() => {
    if (token) {
      getAllBooksAdmin(token); // Now runs only AFTER token is set
    }
  }, [token]);
  return (
    <div className='bg-amber-50'>
      <AdminHeader />
      <div className="row flex h-150">
        <div className="col flex flex-col items-center">
          <AdminSIdebar />
        </div>

        <div className="col bg-amber-50 w-400 ">
          <h1 className='text-4xl font-extrabold text-amber-900 text-center mt-10'>All Books</h1>
          <div className="flex flex-row  mt-5">
            <div className="basis-128"></div>
            <div className="basis-64">
              <div className="flex ">
                <p className={bookStatus ? 'border border-r-2  border-l-2 border-t-2 border-b-0 hover:bg-amber-100  p-3 m-2 ' : 'border border-r-2  border-l-2 border-t-2 border-b-2 hover:bg-amber-100  p-3 m-2 '} onClick={() => { setBookStatus(true); setUserStatus(false) }}>Book List</p>
                <p onClick={() => getAllUsersAdmin(token)} className={userStatus ? 'border border-r-2  border-l-2 border-t-2 border-b-0 p-3 m-2 hover:bg-amber-100' : 'border border-r-2  border-l-2 border-t-2 border-b-2 p-3 m-2 hover:bg-amber-100'}>Users</p>
              </div>


            </div>
            <div class="basis-128"></div>

          </div>
          <div className="flex flex-row  gap-5 space-y-5 ">
            {
              bookStatus ?
                <div className='flex justify-center items-center flex-wrap gap-4 '>
                  {
                    books.length > 0 ? books.map(item =>
                      <Card
                        className={`max-w-md !bg-amber-50 h-120 w-90 ${item.status == 'sold' ? `opacity-50 cursor-not-allowed` : ""}`}

                      >
                        <img className=' p-3 w-[300px] h-[300px]' src={item.imageUrl} height={'300px'} alt="" />
                        <h5 className="text-2xl font-bold text-center tracking-tight text-amber-800 ">
                          {item.title}
                        </h5>
                        <p className="font-normal text-center text-amber-800 ">
                          Price: ${item.dprice}
                        </p>
                        <div className='flex justify-center items-center'>
                          {
                            item.status == 'pending' && <button onClick={() => handleApprove(item)} className='bg-amber-950 p-2 border-2 outline-amber-400 rounded-4xl hover:bg-amber-50 hover:text-amber-950 hover:border-amber-950  text-amber-100'>Approve</button>}{
                            item.status == "approved" &&
                            <img className='w-[50px]' src='https://tse3.mm.bing.net/th/id/OIP.wQr60Ji2lwOqzXQ8u7ho1QHaH_?cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3' />
                          }
                          {
                            item.status == 'sold' &&
                            <img className='w-[50px]' src='https://cdn-icons-png.flaticon.com/512/6188/6188726.png' />
                          }

                        </div>
                      </Card>
                    ) : "No Books Found..."
                  }


                </div>
                :
                <div className='flex justify-center items-center flex-wrap gap-4 '>
                  {
                    users.length > 0 ? users.map(item =>
                      <Card className="max-w-sm !bg-amber-50">
                        {/* <img src={item.profile == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/large_2x/user-icon-on-transparent-background-free-png.png' : `${item.profile}`} alt="" width={'50px'} height={'50px'} referrerPolicy='no referrer' /> */}
                        <img
                          src={
                            !item.profile
                              ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                              : item.profile.startsWith("https://lh3.googleusercontent.com")
                                ? item.profile
                                : `${serverURL}/upload/${item.profile}`
                          }
                          alt="user icon"
                          referrerPolicy='no referrer'
                          className="w-10 h-10 rounded-full object-cover"
                        />

                        <h5 className="text-xl font-bold tracking-tight !text-gray-900">
                          ID : {item._id}
                        </h5>
                        <h5 className="text-xl font-bold tracking-tight !text-gray-900">
                          Name : {item.username}
                        </h5>
                        <h5 className="text-xl font-bold tracking-tight !text-gray-900">
                          Email : {item.email}
                        </h5>


                      </Card>

                    ) : "No Users"
                  }

                </div>
            }

          </div>
        </div>

      </div>

    </div>
  )
}

export default AdminBooks