import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { GiBookshelf } from "react-icons/gi";
import { Card } from 'flowbite-react';
import PageFooter from '../../components/PageFooter';
import { getHomeBookAPI } from '../../services/allAPIs';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/ContextShare';
import { useContext } from 'react';
import { IoSearch } from "react-icons/io5";



function Home() {
  const navigate = useNavigate
  const {searchKey, setSearchKey} = useContext(SearchContext)
    console.log(searchKey); //""

  const [token, setToken] = useState("")

  //To hold homebooks
  const [homeBooks, setHomeBooks] = useState([])

  const getHomeBooks = async () => {
    try {
      const result = await getHomeBookAPI()
      console.log(result);
      setHomeBooks(result.data)
    }
    catch (err) {
      console.log(err);
    }
  }
  
  console.log(homeBooks); //array[4]

  const hanldeSearch = ()=>{
    // alert("searching")
    const token = sessionStorage.getItem("token")
    if(searchKey == ""){
      alert("Please enter the book file")
    }
    else if(!token){
       alert("Please Login") 
       navigate('/login')
    }
    else if(searchKey && token){
        navigate('/allBook')
    }
    else{
        alert("Something went wrong")
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
      getHomeBooks(token);
    }
  }, [token]);

  return (
    <div>
      <Header />
      <section id='banner' className="bg-[url('https://wallpapercave.com/wp/wp2036897.jpg')] bg-cover bg-top bg-fixed h-screen flex-justify-center">
        <div className='text-center p-40'>
          <h1 className='text-5xl mt-10 text-amber-100 hover:text-amber-700 '>Let your shelf tell a story of its own.</h1>
          <p className=' text-amber-100 my-4'>Curate your collection with stories that have already lived and loved.</p>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-amber-100 pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 mx-50">
              <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"><GiBookshelf className='text-2xl' /></div>
              <input
                id="book"
                name="book"
                type="text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Choose your book"
                className="block w-2 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              />
              <button onClick={hanldeSearch} className="bg-amber-950 text-amber-100 border-2 rounded-4xl p-5"><IoSearch /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber-50 p-6">
        <div className="flex items-stretch justify-center">
          <div className="py-4"></div>
          <div className="py-12 text-center">
            <p className="text-4xl">NEW ARRIVALS</p>
            <p className="text-2xl">Explore Our Latest Collection</p>
          </div>
          <div className="py-2"></div>
        </div>

        <div className="flex items-stretch justify-evenly ">
          {
            homeBooks.length>0?
            homeBooks.map(item=>(
              <div className="py-4">
              <Card className=" flex flex-wrap !bg-amber-100 h-100 w-70 p-2 text-center" horizontal>
              <img src={item.imageUrl} className="h-70 w-80 p-2 object-cover" alt="" />
              <h5 className="text-2xl text-wrap font-bold tracking-tight text-amber-900">
                {item.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Price : ${item.dprice}
              </p>
            </Card>
            </div>
            )):
            "No Books found"
          }
          
        </div>
        <div className="text-center m-4">
          {
            token?
                    <Link to='/allbooks'><button className="bg-amber-950 text-amber-100 border-2 rounded-4xl p-5">Explore More</button></Link>
            :
                    <Link to='/'><button className="bg-amber-950 text-amber-100 border-2 rounded-4xl p-4 opacity-70 cursor-not-allowed">Explore More</button></Link>
          }
        </div>
      </section>
      <section className="bg-amber-100 p-10">
        <div className="flex justify-evenly">
          <div className="p-5 flex flex-col w-200">
            <p className="text-4xl">FEATURED AUTHORS</p>
            <p className="text-5xl text-wrap mb-5">Shakespeare, Poet</p>
            <p className="text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem autem numquam quam delectus ullam earum ab soluta non ipsum, quos explicabo? Fugit dolores qui tenetur optio tempora inventore cum molestias. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas itaque dolorem placeat quisquam, dolorum assumenda incidunt quis dolore voluptas tenetur aspernatur explicabo a error delectus ad ipsam. Numquam, sit obcaecati.
            </p>
            <p className="text-justify">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda non hic harum doloremque maxime aut vitae necessitatibus soluta officiis modi, repellat quidem dolorem libero vero! Beatae esse perspiciatis quidem eveniet!
              Beatae voluptatum hic unde facere nihil soluta deleniti quos officia obcaecati distinctio repudiandae excepturi delectus tenetur nam suscipit dolores amet, voluptates fugiat sequi, tempore dolorum. Unde fugit libero dolores ducimus!
              Odio laboriosam placeat quaerat earum distinctio neque ipsa maxime id corporis optio eaque enim nulla fugiat dolorem est sapiente, aspernatur repellendus sint sequi porro quam amet veniam dolores! Ut, ullam!</p>

          </div>
          <div className="p-5">
            <img src="https://cdn.pixabay.com/photo/2012/11/28/11/10/shakespeare-67698_1280.jpg" alt="" width={'350px'} height={'500px'} />
          </div>

        </div>
      </section>
      <section className="bg-amber-50 p-6 text-center">
        <p className="text-4xl">TESTIMONIALS </p>
        <p className="text-4xl">See What Others Are Saying</p>



        <div className="flex items-stretch justify-evenly  ">
          <div className="py-4">
            <Card
              className=" flex flex-wrap !bg-amber-50 h-100 w-100 p-15   text-center"
              horizontal
            >
              <img
                src="https://cdn.pixabay.com/photo/2018/07/12/18/15/man-3534091_1280.jpg"
                className="h-80 w-80 p-2 "
                alt=""
                width={'50px'}
                height={'50px'}
              />
              <h5 className=" text-wrap font-bold tracking-tight text-amber-900">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quidem natus debitis, id quia reiciendis consequuntur accusantium laborum magnam, aliquid maxime distinctio eaque minima labore. Commodi quidem ex magnam quae?
              </h5>

            </Card>
          </div>


        </div>
      </section>


      <PageFooter />
    </div>
  )
}

export default Home
