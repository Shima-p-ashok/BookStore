import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { IoIosImages } from "react-icons/io";
import { useParams } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { getABookAPI, makePaymentAPI } from '../../services/allAPIs';
import { serverURL } from '../../services/serverURL';
import {loadStripe} from '@stripe/stripe-js';



function ViewBook() {
  const [openModal, setOpenModal] = useState(false);

  //get id of particular book
  const { id } = useParams()
  console.log(id);

  //to hold book data
  const [bookdata, setBookData] = useState({})

  //to hold Uploadedimage
  const [UploadedImage, setUploadedImages] = useState([])

  //to hold token
  const [token, setToken] = useState("")

  //API call
  const getABook = async (id) => {
    console.log("get A Book");

    const reqHeader = { Authorization: `Bearer ${token}` }

    try {
      const result = await getABookAPI(id, reqHeader)
      console.log(result);
      setBookData(result.data)
      setUploadedImages(result.data.UploadedImage)
    }
    catch (err) {
      console.log(err);
    }
  }

  const makePayment = async () => {
    console.log(bookdata);
    const stripe = await loadStripe('pk_test_51RxOp5GTbRwqqFyofSMPPnOiDz9UdizHqb65auLl9HixTRKFPtx62w22xSsJEq5CGU15AlzyufJdFWFN8NZZMwdE00ewgPtGFa');
    console.log(stripe);
    
    const reqHeader = { Authorization: `Bearer ${token}` }

    const reqBody = {
      bookDetails : bookdata
    } 
    try{
       const result = await makePaymentAPI(reqBody, reqHeader)
       console.log(result);

       const sessionID = result.data.sessionID

       const response = stripe.redirectToCheckout({sessionId:sessionID})

       if(response.error){
        console.log("error in payment");
        
       }
       
    }
    catch(err){
      console.log("error"+err);
      
    }
  }

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken)); // removes extra quotes
    }
  }, []);


  useEffect(() => {
    if (token) {
      getABook(id); // Now runs only AFTER token is set
    }
  }, [token]);

  return (
    <div>
      <Header />


      <div className="flex justify-around mt-40 p-20 mx-20 border-0 shadow-2xl rounded-2xl bg-amber-50">
        <div className="w-2/5 ..."> <img src={bookdata?.imageUrl} width={'400px'} height={'200px'} alt="" />
        </div>

        <div className="w-3/5 text-center">
          <div className='flex justify-end'>
            <h3 className='text-3xl my-5'  >  <IoIosImages onClick={() => setOpenModal(true)} className='text-amber-900' /></h3>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
              <ModalHeader className='!bg-amber-950'><h1 className='text-amber-100'>Book Photos</h1></ModalHeader>
              <ModalBody className='!bg-amber-50'>


                <div className=" !bg-amber-50 space-y-6 flex gap-10">
                  {
                    bookdata ? UploadedImage?.map((item) => (
                      <>
                        <img src={`${serverURL}/upload/${item}`} alt="" width={'200px'} height={'400px'} />

                      </>
                    )) :
                      "No images Added"
                  }
                </div>
              </ModalBody>
              <ModalFooter className='!bg-amber-950'>

              </ModalFooter>
            </Modal>

          </div>
          <h3 className='text-3xl my-5' >{bookdata?.title}</h3>
          <p className='text-2xl mb-3'>- {bookdata?.author}</p>

          <p>Publisher : {bookdata?.publisher}</p>

          <p>Language :{bookdata?.language}</p>

          <p>No. of pages : {bookdata?.noofpages}</p>

          <p>Seller Mail : {bookdata?.userMail}
          </p>

          <p>Real Price : {bookdata?.price}
          </p>

          <p>ISBN : {bookdata?.isbn}
          </p>

          <p>{bookdata?.abstract}
          </p>
          <div className='flex justify-around mt-8'>

            <button onClick={makePayment} type="button" className="text-white bg-amber-800 rounded-lg hover:bg-amber-950 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> <svg class="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21"> <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
             </svg> Buy now </button>
              <button type="button" className="text-white bg-amber-800 rounded-lg hover:bg-amber-950 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Back <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" /> </svg> </button>


          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewBook
