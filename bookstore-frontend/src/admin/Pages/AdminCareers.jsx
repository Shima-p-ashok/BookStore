import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { Card, Button, Textarea} from "flowbite-react";
import { Label, TextInput } from "flowbite-react";
import { IoMdSend } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Modal, ModalBody, ModalFooter, ModalHeader} from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import { uploadJobAPI } from '../../services/allAPIs';


function AdminCareers() {
  const [jobStatus, setJobStatus] = useState(false)
  const [viewStatus, setViewStatus] = useState(false)
  const [openModal, setOpenModal] = useState(false);

  const [token, setToken] = useState()
  

  //To hold Book Details
      const [jobDetails, setJobDetails] = useState({
          title: "", location:"", jobType:"", salary:"", qualification:"", experience:"", description:""
      })
      
      const handleAddJob = async() =>{
        const {title, location, jobType, salary, qualification, experience, description} = jobDetails
        console.log(jobDetails);
         if (!title || !location || !jobType || !salary || !qualification || !experience || !description ) {
                    toast.warn("Please fill the form!", {
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
                else {
                    //ADD API
                    //create request header, includes token
                    const reqHeader = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}` // ✅ Must have Bearer
}
                    
                    try {
                        const result = await uploadJobAPI(jobDetails, reqHeader)
                        console.log(result);
                        if (result.status == 200) {
                         toast.success("Job Added Succesfully !", {
                                  position: "top-center",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: false,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "light"
                                })
                                // handleReset()
                            }
                            else{
                                toast.error(result.response.data, {
                                            position: "top-center",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: false,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "light"
                                          })
                                          // handleReset()
                            }
                    }
                    catch (err) {
                        console.log(err);
                    }
                }     
      }

     useEffect(() => {
         const storedToken = sessionStorage.getItem("token");
         if (storedToken) {
             setToken(JSON.parse(storedToken)); // removes extra quotes
         }
     }, []);

  return (
    <div>
      <AdminHeader />
      <div className="row flex h-150">
        <div className="col flex flex-col items-center">
          <AdminSidebar />
        </div>

        <div className="col bg-amber-50 w-400">
          <h1 className='text-4xl font-extrabold text-center mt-10'>Careers</h1>
          <div className="flex flex-row mt-5">
            <div className="basis-128"></div>
            <div className="basis-64">
              <div className="flex w-full text-center">
                 <p className={jobStatus ? 'border border-r-2  border-l-2 border-t-2 border-b-0 p-3 mx-2   ' : 'border border-r-2  border-l-2 border-t-2 border-b-2  p-3 mx-2 shadow-2xl '} onClick={() => { setJobStatus(true); setViewStatus(false) }}>Job List</p>
                <p onClick={() => { setJobStatus(false); setViewStatus(true) }} className={viewStatus ? 'border border-r-2  border-l-2 border-t-2 border-b-0 p-3 mx-2' : 'border border-r-2  border-l-2 border-t-2 border-b-2 p-3 mx-2 shadow-2xl'}>View Applicant</p>

              </div>
            </div>
            <div className="basis-128"></div>

          </div>
          <div className="flex-row">
            {
              jobStatus ?
               <div className="">
                
                 <div className='flex'>
                  <div className='flex'>
                     <div className="flex items-center justify-center my-10 ms-35">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-amber-900 rounded-r-lg hover:bg-amber-950 focus:outline-none focus:ring-2 focus:ring-black"
          >
            🔍
          </button>
        </div>
      </div>
      <div className='mt-9.5 ms-150'>
        <button className='flex items-center px-4 py-2 text-white bg-amber-900 rounded-4xl hover:bg-amber-950 focus:outline-none focus:ring-2 focus:ring-black' onClick={() => setOpenModal(true)}>Add +</button>
      </div>
                  </div>
                  <Modal show={openModal} onClose={() => setOpenModal(false)}>
                            <ModalHeader className='!bg-amber-50 text-amber-950'>Application Form</ModalHeader>
                            <ModalBody className='!bg-amber-50  text-amber-950'>
                              <div className="space-y-6">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  <TextInput value={jobDetails.title} onChange={(e)=>setJobDetails({...jobDetails, title: e.target.value})} type="text" placeholder='Job Title'color="warning" className='w-100  !bg-amber-50 !text-amber-950 font-extrabold  me-3 my-2' />
                                  <TextInput value={jobDetails.location} onChange={(e)=>setJobDetails({...jobDetails, location: e.target.value})} type="text" placeholder='Location'color="warning" className='w-100  !bg-amber-50 !text-amber-950 font-extrabold  me-3 my-2' />

                                  <TextInput value={jobDetails.jobType} onChange={(e)=>setJobDetails({...jobDetails, jobType: e.target.value})} type="text" placeholder='Job type'color="warning" className='w-100  !bg-amber-50 !text-amber-950 font-extrabold  me-3 my-2' />

                                  <TextInput value={jobDetails.salary} onChange={(e)=>setJobDetails({...jobDetails, salary: e.target.value})} type="text" placeholder='Salary' color="warning" className='w-100  !text-amber-950 font-extrabold ' />
                                  <TextInput value={jobDetails.qualification} onChange={(e)=>setJobDetails({...jobDetails, qualification: e.target.value})} type="text" placeholder='Qualification' color="warning" className='w-100   !text-amber-950 font-extrabold me-3 my-2'/>
                                  <TextInput value={jobDetails.experience} onChange={(e)=>setJobDetails({...jobDetails, experience: e.target.value})} type="text" placeholder='Experience ' color="warning" className='w-100   !text-amber-950 font-extrabold '/>
                                </p>
                                <p className="text-base leading-relaxed ">
                                  <div className="max-w ">
                         
                          <Textarea value={jobDetails.description} onChange={(e)=>setJobDetails({...jobDetails, description: e.target.value})} id="comment" placeholder="Description" color="warning" required rows={4} className='!bg-amber-50  !text-amber-950 font-extrabold ' />
                        </div>        </p>
                              </div>
                            </ModalBody>
                            <ModalFooter>
                              <Button onClick={handleAddJob}>Add</Button>
                              <Button color="alternative" onClick={() => setOpenModal(false)}>
                               Reset
                              </Button>
                            </ModalFooter>
                          </Modal>
                  </div> 

                 <div className='shadow bg-amber-200 rounded-lg mx-65 mt-5'>
                         <div className='flex items-center justify-between px-6 py-4'>
                           <div className='basis-1/3'>
                             <h1 className='text-2xl text-center mt-2'>HR Assistant</h1>
                           </div>
                           <div>
                             <button
                               className='flex items-center gap-2 p-3 text-white bg-amber-900 rounded-lg hover:bg-amber-950 focus:outline-none focus:ring-2 focus:ring-black'>
                               Delete <RiDeleteBin5Line className="ms-1 fs-2" />
                             </button>
                           </div>
                         </div>
                 
                         <hr className='mx-4' />
                 
                         <div className='px-6 py-4'>
                           <p className='flex items-center gap-2 text-ms font-bold'><FaLocationDot /> Location: Kochi</p>
                           <p className='text-ms'>Job type: Full-time</p>
                           <p className='text-ms'>Salary: ₹25,000 - ₹35,000</p>
                           <p className='text-ms'>Qualification: Any Degree</p>
                           <p className='text-ms'>Experience: 1+ year</p>
                           <p className='text-ms'>Description: Handle employee records, onboarding, and assist HR operations.</p>
                         </div>
                       </div>
              </div>
                :
                <div className="flex items-stretch justify-evenly pt-5 ">
                  <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell className='bg-amber-700 text-amber-50'>Sl</TableHeadCell>
            <TableHeadCell className='bg-amber-700 text-amber-50'>Job Title</TableHeadCell>
            <TableHeadCell className='bg-amber-700 text-amber-50'>Name</TableHeadCell>
            <TableHeadCell className='bg-amber-700 text-amber-50'>Qualification</TableHeadCell>
            <TableHeadCell className='bg-amber-700 text-amber-50'>Email</TableHeadCell>
            <TableHeadCell className='bg-amber-700 text-amber-50'>Phone</TableHeadCell>
            <TableHeadCell className='bg-amber-700 text-amber-50'>coverletter</TableHeadCell>
            <TableHeadCell className='bg-amber-700 text-amber-50'>Resume</TableHeadCell>
           
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Apple MacBook Pro 17"
            </TableCell>
            <TableCell>Sliver</TableCell>
            <TableCell>Laptop</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>Sliver</TableCell>
            <TableCell>Laptop</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Edit
              </a>
            </TableCell>
            
          </TableRow>
         
          
        </TableBody>
      </Table>
                  
                </div>
            }

          </div>
        </div>

      </div>
      
 <ToastContainer />
    </div>
  )
}

export default AdminCareers
