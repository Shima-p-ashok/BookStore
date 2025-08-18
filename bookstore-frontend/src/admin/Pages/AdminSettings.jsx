import React from 'react'
import AdminSIdebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import { Label, Textarea, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { Button } from "flowbite-react";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getAdminDetailsAPI, updateAdminAPI } from '../../services/allAPIs';
import { useEffect } from 'react';


function AdminSettings() {

  const [adminDetails, setAdminDetails] = useState({
    username:"",
    password:"",
    cpassword:"",
    profile:""
  })

  const [preview, setPreview] = useState("")
  const [token, setToken] = useState()

  const handleFile = (e)=>{
    setAdminDetails({...adminDetails, profile:e.target.files[0]})
    console.log(adminDetails.profile);

     //obj URL conversion
  const url = URL.createObjectURL(e.target.files[0])
  console.log(url);
  setPreview(url)
  console.log(preview);
  setAdminDetails({...adminDetails, profile:url})
  }

  const handleProfileUpdate = async()=>{
    console.log(adminDetails);
    //get values from from the state using destructuring
        const { username, password, cpassword, profile} = adminDetails

       
             if(password!==cpassword){
                 toast.warn("Password Mismatched!", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    })
             }
             else{
                const reqHeader = {Authorization: `Bearer ${token}`}

                const reqBody = new FormData()
                for (let key in adminDetails) {
                    reqBody.append(key, adminDetails[key])
                }
                try{
                  const result = await updateAdminAPI(reqBody, reqHeader)
                  console.log(result);
                  setAdminDetails(result.data)
                  handleGetAdminDetails(token)
                  alert("Admin Details Updated")
                  
                  
                }
                catch(err){
                  console.log(err);
                  
                }
             }
            
          
  }
  
  const handleReset = () => {
   setAdminDetails({ username:"", password:"", cpassword:"", profile:""})
   setPreview("")
  }

  const handleGetAdminDetails=async(token)=>{
    console.log("Inside Admin Details");
    console.log(token);
    
    const reqHeader = {Authorization: `Bearer ${token}`}
        try {
          
          //API call
          const result = await getAdminDetailsAPI(reqHeader)
          console.log(result);
          setAdminDetails(result.data[0])
          console.log(adminDetails);
        }
        catch (err) {
          console.log(err);
        }
  }

  useEffect(() => {
  const storedToken = sessionStorage.getItem("token");
  if (storedToken) {
    setToken(JSON.parse(storedToken)); // ensure token is clean
  }
}, []);

useEffect(() => {
  if (token) {
    handleGetAdminDetails(token);
  }
}, [token]);


  return (
     <div>
        <AdminHeader/>
           <div className="row flex h-150">
          <div className=" flex flex-col items-center">
            <AdminSIdebar/>
                     </div>
          <div className="col bg-amber-50 w-400">
                  <h1 className='text-center m-4 text-2xl'>Settings</h1>
            <div className="flex">
                <div className='basis-150 p-10 ps-10 '>
                    <p className='text-justify'>   Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab minus assumenda suscipit, doloribus omnis fuga vero dolorem necessitatibus blanditiis odio autem excepturi fugiat temporibus asperiores explicabo quos? Obcaecati, rerum excepturi?
                    Nihil nostrum eligendi error possimus dolores nulla adipisci natus, explicabo sint consequatur provident saepe pariatur. Numquam sed ullam iste cumque qui! Voluptas, repellat perferendis dolorem officia sunt iste culpa sequi.
                    Tenetur impedit corrupti culpal </p><br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ab vitae, inventore sapiente debitis amet adipisci corrupti. Non voluptatum excepturi rerum beatae quae, asperiores qui, nihil repudiandae, quos delectus sed?</p>
                   </div>
                   <div className='basis-150 p-7'>
                     <form className="bg-amber-800 rounded p-10 ms-20">
                        <div className="max-w-md">
                          <div className="md-2">
                           <label htmlFor="profile">
                             <input  id='profile' type="file" style={{display:'none '}} onChange={e=>handleFile(e)} />
                            <img src={preview?preview:"https://icon-library.com/images/admin-icon-png/admin-icon-png-18.jpg"} width={'200px'} alt="" />
                           </label>
                          </div>

                         <div className="mb-2 block">
                           <Label htmlFor="name" className='text-amber-50' >Your Name</Label>
                         </div>
                         <TextInput onChange={e=>setAdminDetails({...adminDetails, username:e.target.value})} value={adminDetails.username} id="name" type="text"  placeholder="John Doe" required />
                       </div>
                       <div className="max-w-md">
                         <div className="mb-2 block">
                           <Label htmlFor="email4" className='text-amber-50'>Your Password</Label>
                         </div>
                         <TextInput onChange={e=>setAdminDetails({...adminDetails, password:e.target.value})} value={adminDetails.password} id="p" type="password"  placeholder="name@flowbite.com" required />
                       </div>
                       <div className="max-w-md">
                         <div className="mb-2 block">
                           <Label htmlFor="comment" className='text-amber-50'>Confirm Password</Label>
                         </div>
                        <TextInput onChange={e=>setAdminDetails({...adminDetails, cpassword:e.target.value})} value={adminDetails.cpassword} id="cp" type="password"  placeholder="password" required />

                       </div>
                     <div className='flex justify-evenly my-10'>
                        <Button onClick={handleReset} className='!bg-amber-950 '>Reset</Button>
                          <Button onClick={handleProfileUpdate} className='!bg-amber-950 '>Update</Button>
                     </div>
                     </form>
                   </div>
                 
                 </div>
            </div>
        </div>
         <ToastContainer />
    </div>
  )
}

export default AdminSettings
