import React, { useState } from 'react';
import { IoMdSend } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { Modal, ModalFooter } from "flowbite-react";
import PageFooter from '../../components/PageFooter';
import Header from '../components/Header';
import { useEffect } from 'react';
import { getAdminAllJobsAPI } from '../../services/allAPIs';


function Careers() {
  const [openModal, setOpenModal] = useState(false);

  const [alljobs, setAllJobs] = useState([]);


  const [token, setToken] = useState()


  //To hold Book Details
  const [jobDetails, setJobDetails] = useState({
    title: "", location: "", jobType: "", salary: "", qualification: "", experience: "", description: ""
  })

  const getAllJobs = async (token) => {
      console.log("Get All Jobs");
      console.log(token);
  
      //create request header, includes token
      const reqHeader = { Authorization: `Bearer ${token}` }
      console.log(reqHeader);
  
      try {
        const result = await getAdminAllJobsAPI(reqHeader);
        console.log(result);
        console.log(result.data);
        setAllJobs(result.data)
        
        
      } catch (err) {
        console.log(err);
       
      }
    };

    useEffect(() => {
          const storedToken = sessionStorage.getItem("token");
          if (storedToken) {
              setToken(JSON.parse(storedToken)); // removes extra quotes
          }
      }, []);
    
      useEffect(() => {
        if (token) {
          getAllJobs(token); // Now runs only AFTER token is set
        }
      }, [token]);
      console.log(token);
  

  return (
    <div>
      <Header />

      <div>
        <h1 className='text-center text-5xl m-10 pt-10'>Careers</h1>
        <div className='mx-16'>
          <h2 className='text-2xl m-3'>Work with us:</h2>
          <p className='text-ms m-3 text-justify'>
            Join our team and be part of something exciting. We value creativity, dedication, and fresh ideas.
            Every day brings new opportunities to grow and learn. We believe in supporting each other and working as one team.
            Your skills and passion can make a real difference here. We welcome people from all backgrounds and experiences.
            Together, we strive to achieve great things. Let's build a future full of possibilities.
            Discover how rewarding it can be to work with us!
          </p>
        </div>
      </div>

      <h1 className='text-center text-4xl mt-16'>Current Openings</h1>

      {/* Search Bar */}
      <div className="flex items-center justify-center my-10">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-gray-700 border border-gray-300 bg-amber-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-amber-800 rounded-r-lg hover:bg-amber-950 focus:outline-none focus:ring-2 focus:ring-black"
          >
            🔍
          </button>
        </div>
      </div>

      {/* Job Card */}
      {alljobs?.length>0 ? alljobs.map((job)=>(
      <div className='mx-20 shadow bg-amber-200 rounded-lg mx-75 p-4 m-4'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div className='basis-1/3'>
            <h1 className='text-2xl text-center mt-2'>{job.title}</h1>
          </div>
          <div>
            <button
              className='flex items-center gap-2 p-3 text-white bg-amber-800 rounded-lg hover:bg-amber-950 focus:outline-none focus:ring-2 focus:ring-black'
              onClick={() => setOpenModal(true)}
            >
              Apply <IoMdSend className="ms-1 mt-1" />
            </button>
          </div>
        </div>

        <hr className='mx-4' />

        <div className='px-6 py-4'>
          <p className='flex items-center gap-y-8 text-ms font-bold'><FaLocationDot /> Location: Kochi</p>
          <p className='text-ms'>Job type: {job.jobType}</p>
          <p className='text-ms'>Salary: ₹{job.salary}</p>
          <p className='text-ms'>Qualification: {job.qualification}</p>
          <p className='text-ms'>Experience: {job.experience}</p>
          <p className='text-ms'>Description: {job.description}</p>
        </div>
      </div>
      )) :"No Openings"}

      {/* Modal with Floating Labels */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <div className="bg-white rounded shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">Application Form</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'fullName', label: 'Full Name', type: 'text' },
                { name: 'qualification', label: 'Qualification', type: 'text' },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'phone', label: 'Phone', type: 'tel' },
              ].map((field, idx) => (
                <div className="relative" key={idx}>
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    placeholder={field.label}
                    className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                  <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500">
                    {field.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="relative">
              <textarea
                name="coverLetter"
                rows="4"
                placeholder="Cover Letter"
                className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-700"
              ></textarea>
              <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500">
                Cover Letter
              </label>
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">Upload Resume</label>
              <input
                type="file"
                name="resume"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>

            <ModalFooter>
              <div className="flex justify-end w-full gap-2 mt-4">
                <button
                  type="reset"
                  onClick={() => setOpenModal(false)}
                  className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-700"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  onClick={() => setOpenModal(false)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-800"
                >
                  Submit
                </button>
              </div>
            </ModalFooter>
          </form>
        </div>
      </Modal>
<div className="mb-8"></div>
      <PageFooter />
    </div>
  );
}

export default Careers;
