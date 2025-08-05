import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Button } from "flowbite-react";
import PageFooter from '../../components/PageFooter';
import { Card } from 'flowbite-react';
import { getAllBookAPI } from '../../services/allAPIs';
import { all } from 'axios';
import { Link } from 'react-router-dom';


function AllBooks() {

  //To hold allbooks
  const [allBooks, setAllBooks] = useState([])
  //To hold token
  const [token, setToken] = useState("")

  const getAllBooks = async () => {
    
    try {
      //create request header, includes token
      const reqHeader = {Authorization: `Bearer ${token}`}
      
      //API call
      const result = await getAllBookAPI(reqHeader)
      console.log(result);
      setAllBooks(result.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  console.log(allBooks);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken)); // removes extra quotes
    }
  }, []);

  console.log(token);

  useEffect(() => {
  if (token) {
    getAllBooks(); // Now runs only AFTER token is set
  }
}, [token]);



  return (
    <div>
      <Header />
      <h1 className='text-center mt-25 text-4xl font-bold'>Collections</h1>
      <div className='text-center'>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ms-100 sm:grid-cols-6">
          <div className="sm:col-span-4">
            {/* <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label> */}
            <div className="mt-5 mx-20">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Search Book Name</div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Eg: Alchemist"
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
                <Button className="flex flex-wrap gap-2 !bg-amber-800">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='flex mt-20'>
        <div className='w-70 ms-30 mb-8 flex-none...'>
          <h1 className='mb-5 font-bold mt-12 me-70'>Filters</h1>
          <div>
            <input type="radio" id='philosophy' name='filter' className='mb-4 me-1' />
            <label htmlFor="">Literary Fiction</label>
          </div>
          <div>
            <input type="radio" id='philosophy' name='filter' className='mb-4 me-1' />
            <label htmlFor="">Philosophy</label>
          </div>
          <div>
            <input type="radio" id='philosophy' name='filter' className='mb-4 me-1' />
            <label htmlFor="">Thriller</label>
          </div>
          <div>
            <input type="radio" id='philosophy' name='filter' className='mb-4 me-1' />
            <label htmlFor="">Romance</label>
          </div>
          <div>
            <input type="radio" id='philosophy' name='filter' className='mb-4 me-1' />
            <label htmlFor="">Horror</label>
          </div>
          <div>
            <input type="radio" id='philosophy' name='filter' className='mb-4 me-1' />
            <label htmlFor="">Auto/Biography</label>
          </div>
          <div>
            <input type="radio" id='philosophy' name='filter' className='mb-4 me-1' />
            <label htmlFor="">Self-Help</label>
          </div>
          <div>
            <input type="radio" id='philosophy' name='filter' className='mb-4 me-1' />
            <label htmlFor="">Politics</label>
          </div>
          <div>
            <input type="radio" id='philosophy' name='filter' className='mb-3 me-1' />
            <label htmlFor="">No-filter</label>
          </div>
        </div>

        <section>
          <div className="flex flex-wrap justify-evenly ">
            {
              allBooks.length > 0 ?
                allBooks.map(item => (
                  <div className="py-4">
                    <Link to= {`/viewBook/${item._id}`}>
                       <Card className=" flex flex-wrap !bg-amber-100 h-100 w-70 p-2 text-center" horizontal>
                      <img src={item.imageUrl} className="h-70 pt-10 w-80 p-2 object-cover" alt="" />
                      <h5 className="text-xl text-wrap font-bold tracking-tight text-amber-900">
                        {item.title}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400 pb-4">
                        Price : {item.price}
                      </p>
                    </Card>
                    </Link>
                  </div>

                )) :
                "No Books Found"

            }


          </div>
        </section>
      </div>
      <div className='mb-15'></div>

      <PageFooter />
    </div>
  )
}

export default AllBooks
