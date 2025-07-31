import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FaCheckCircle } from 'react-icons/fa';
import { RiImageAddFill } from "react-icons/ri";
import EditProfile from '../components/EditProfile';
import { ToastContainer, toast } from 'react-toastify';
import { uploadBookAPI } from '../../services/allAPIs';

function Profile() {
    const [sellstatus, setsellstatus] = useState(true)
    const [bookstatus, setbookstatus] = useState(false)
    const [purchaseStatus, setpurchaseStatus] = useState(false)

    //To hold Book Details
    const [bookDetails, setBookDetails] = useState({
        title: "", author: "", noofpages: "", imageUrl: "", price: "", dprice: "", abstract: "", publisher: "", language: "", isbn: "", category: "", UploadedImage: []
    })
    console.log(bookDetails);

    //to hold image url
    const [preview, setPreview] = useState("")
    const [previewList, setPreviewList] = useState([])
    const [token, setToken] = useState()

    const handleUpload = (e) => {
        //image value
        console.log(e.target.files[0]);
        //to hold 3 images
        let imageArray = bookDetails.UploadedImage
        imageArray.push(e.target.files[0])
        console.log(imageArray);
        setBookDetails({ ...bookDetails, UploadedImage: imageArray })
        //obj to url conversion
        const url = URL.createObjectURL(e.target.files[0])
        console.log(url);
        setPreview(url)

        //create a new array for holding imageList
        let imageListArray = previewList
        imageListArray.push(url)
        setPreviewList(imageListArray)
    }

    //Reset 
    const handleReset = () => {
        setBookDetails({
            title: "", author: "", noofpages: "", imageUrl: "", price: "", dprice: "", abstract: "", publisher: "", language: "", isbn: "", category: "", UploadedImage: []
        })
        setPreview("")
        setPreviewList([])
    }

    //Submit
    const handleAddBook = async () => {
        //get valuesz from from the state using destructuring
        const { title, author, noofpages, imageUrl, price, dprice, abstract, publisher, language, isbn, category, UploadedImage } = bookDetails
        //create request header includes token
        if (!title || !author || !noofpages || !imageUrl || !price || !dprice || !abstract || !publisher || !language || !isbn || !category || !UploadedImage) {
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
                Authorization: `Bearer ${token}`
            }

            const reqBody = new FormData()
            // reqBody.append("title", title)  ------ One by One method
            //if we have many data use for loop
         

            for (let key in bookDetails) {
                if (key != "UploadedImage") {
                    reqBody.append(key, bookDetails[key])
                }
                else {
                    bookDetails.UploadedImage.forEach((item) => {
                        reqBody.append("UploadedImage", item)
                    })
                }
            }

            try {
                const result = await uploadBookAPI(reqBody, reqHeader)
                console.log(result);
                if (result.status == 200) {
                 toast.success("Book Added Succesfully !", {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light"
                        })
                        handleReset()
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
            <Header />
            <div className="bg-[#0b1222] min-h-screen mt-40">

                <div className="bg-white pt-32 pb-16 rounded-t-3xl relative">

                    <div className="absolute -top-24 left-24">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <img
                                src="/profile.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>


                    <div className="max-w-7xl mx-auto mt-12 px-6 md:px-16">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">

                            <div className="flex items-center gap-2 mt-6 md:mt-0 ml-52 md:ml-0">
                                <h1 className="text-2xl font-serif font-semibold text-gray-900">
                                    Shima
                                </h1>
                                <FaCheckCircle className="text-blue-500 text-xl" />
                            </div>
                            <EditProfile />

                        </div>


                        <p className="mt-8 text-lg text-gray-800 max-w-6xl font-serif leading-relaxed">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum
                            dignissimos nam voluptas, architecto totam voluptatem qui
                            consequatur explicabo asperiores illum dolorem non sequi ipsam vero!
                            Dolore cum aliquid amet recusandae? Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Esse culpa ratione a voluptates natus
                            magni eius consequuntur velit sint commodi ipsum fuga nulla,
                            dignissimos officiis aut cum quos dolore alias.
                        </p>
                    </div>
                </div>
            </div>
            <div className='md:px-40'>
                {/* tab */}
                <div className='flex justify-center items-center my-5'>
                    <p onClick={() => { setsellstatus(true); setbookstatus(false); setpurchaseStatus(false) }} className={sellstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Sell Book</p>


                    <p onClick={() => { setsellstatus(false); setbookstatus(true); setpurchaseStatus(false) }} className={bookstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'} >Book status</p>


                    <p onClick={() => { setsellstatus(false); setbookstatus(false); setpurchaseStatus(true) }} className={purchaseStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Purchase History</p>
                </div>
            </div>

            {sellstatus &&
                <div className='bg-gray-200 p-10 my-20 mx-5'>

                    <h1 className='text-center text-3xl font-medium'>Book Details</h1>
                    <div className="md:grid grid-cols-2 mt-10 w-full">
                        <div className='px-3'>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} placeholder='Title' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} placeholder='Author' className='p-2 bg-white rounded placeholder-gray-300 w-full'
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.noofpages} onChange={(e) => setBookDetails({ ...bookDetails, noofpages: e.target.value })} placeholder='No of Pages' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.imageUrl} onChange={(e) => setBookDetails({ ...bookDetails, imageUrl: e.target.value })} placeholder='Image url' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} placeholder='Price' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.dprice} onChange={(e) => setBookDetails({ ...bookDetails, dprice: e.target.value })} placeholder='discount price' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <textarea rows={5} value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} placeholder='Abstract' className='p-2 bg-white rounded placeholder-gray-300 w-full' ></textarea>
                            </div>
                        </div>
                        <div className='px-3'>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} placeholder='Publisher' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>

                            <div className="mb-3">
                                <input type="text" value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} placeholder='Language' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} placeholder='ISBN' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} placeholder='Category' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>

                            <div className="mb-3 flex justify-center items-center w-full mt-10">
                                <label htmlFor="imagefile">
                                    <input id='imagefile' type="file" style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                                    <img src={preview ? preview : "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"} alt="no image" style={{ width: '200px', height: '200px' }} />
                                </label>

                            </div>

                            {
                                preview &&
                                <div className='flex justify-center items-center'>
                                    {
                                        previewList?.map(item => (
                                            <img src={item} alt="no image" style={{ width: '70px', height: '70px' }} className='mx-3' />
                                        ))
                                    }
                                    {

                                        previewList?.length < 3 && <label htmlFor="imagefile">
                                            <input id='imagefile' type="file" style={{ display: 'none' }} />
                                            <RiImageAddFill className='text-2xl text-blue-600' />
                                        </label>
                                    }

                                </div>
                            }


                        </div>
                    </div>
                    <div className='flex md:justify-end justify-center mt-8'>
                        <button onClick={handleReset} className='bg-amber-600 rounde text-black p-3 rounded hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600'>Reset</button>
                        <button onClick={handleAddBook} className='bg-green-600 rounde text-white p-3 rounded hover:bg-white hover:border hover:border-green-600 hover:text-green-600 ms-4'>Submit</button>
                    </div>

                </div>}


            {bookstatus &&
                <div className='p-10 my-20 shadow rounded'>


                    <div className='bg-gray-200 p-5 rounded mt-4'>
                        <div className="md:grid grid-cols-[3fr_1fr]">
                            <div className='px-4'>
                                <h1 className='text-2xl'>title</h1>
                                <h2>author</h2>
                                <h3 className='text-blue-600'>$ dprice</h3>
                                <p>abstract</p>
                                <div className='flex'>

                                    <img src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="no image" style={{ width: '70px', height: '70px' }} />

                                </div>
                            </div>
                            <div className='px-4 mt-4 md:mt-4'>
                                <img src="" alt="no image" className='w-full' style={{ height: '250px' }} />
                                <div className='flex justify-end mt-4'>
                                    <button className='p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* or */}

                    <div className='flex justify-center items-center flex-col'>
                        <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="no image" style={{ width: '200px', height: '200px' }} />
                        <p className='text-red-600 text-2xl'>No Book Added Yet</p>
                    </div>

                </div>}


            {purchaseStatus &&
                <div className='p-10 my-20 shadow rounded'>


                    <div className='bg-gray-200 p-5 rounded mt-4'>
                        <div className="md:grid grid-cols-[3fr_1fr]">
                            <div className='px-4'>
                                <h1 className='text-2xl'>title</h1>
                                <h2>author</h2>
                                <h3 className='text-blue-600'>$ dprice</h3>
                                <p>abstract</p>
                                <div className='flex'>

                                    <img src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="no image" style={{ width: '70px', height: '70px' }} />

                                </div>
                            </div>
                            <div className='px-4 mt-4 md:mt-4'>
                                <img src="imageurl" alt="no image" className='w-full' style={{ height: '250px' }} />
                            </div>
                        </div>
                    </div>
                    {/* or */}
                    <div className='flex justify-center items-center flex-col'>
                        <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="no image" style={{ width: '200px', height: '200px' }} />
                        <p className='text-red-600 text-2xl'>No Book Purchased Yet</p>
                    </div>

                </div>
            }
            <ToastContainer />
        </div>
    )
}

export default Profile