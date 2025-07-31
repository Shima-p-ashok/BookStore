import React, { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { IoMdLogIn } from "react-icons/io";
import { Link } from 'react-router-dom';
import { serverURL } from '../../services/serverURL';


function Header() {

  //to hold token
  const [token, setToken] = useState("")
  //image
  const [userData, setUserData] = useState([])

  useEffect(() => {
    //check token in sessionstorage
    let usertoken = sessionStorage.getItem("token")
    //get userdetails
    let userDetails = JSON.parse(sessionStorage.getItem("existingUser"))
    console.log(userDetails);
     
    if (usertoken) {
      setToken(usertoken) //assign token to the state
      setUserData(userDetails.profile)
    }
  }, [token])
  console.log(token);
  
  
  return (
    <div>
      <Navbar fluid rounded className='!bg-amber-800 fixed top-0 left-0 right-0 '>
        <NavbarBrand href="https://flowbite-react.com">
          <img src="https://th.bing.com/th/id/R.f57aba50eca8714ef92a554c69472757?rik=sFDtXE3DZw3xKg&riu=http%3a%2f%2fpngimg.com%2fuploads%2fbook%2fbook_PNG51108.png&ehk=LnTQzpkH%2bkANYL0EmPwcso%2fKiEDEJtZpzQIRrk%2fMg54%3d&risl=1&pid=ImgRaw&r=0" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold !text-amber-100 dark:text-white">InkByte</span>
        </NavbarBrand>
        <div className="flex md:order-2">
{
  token ?
 <div>


<Dropdown
  inline
  label={
    <div className="p-[2px] bg-brown-600 rounded-full hover:bg-brown-700 transition duration-200">
      <img
        src={
          !userData
            ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            : userData.startsWith("https://lh3.googleusercontent.com")
            ? userData
            : `${serverURL}/upload/${userData}`
        }
        alt="user icon"
        className="w-10 h-10 rounded-full object-cover"
      />
      
    </div>
  }
>
  <Link to="/profile">
    <DropdownItem>Profile</DropdownItem>
  </Link>
  <DropdownItem>Sign out</DropdownItem>
</Dropdown>


          
   {/* <Dropdown label={<img
  src={
    userData === "" || !userData
      ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
      : userData.startsWith("https://lh3.googleusercontent.com")
      ? userData
      : `${serverUrl}/upload/${userData}`
  }
  alt="user icon"
  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
  className="mx-2"
/>} dismissOnClick={false}>
    <Link to={'/profile'}>
      <DropdownItem>Profile</DropdownItem>
    </Link>
     
      <DropdownItem>Sign out</DropdownItem>
    </Dropdown> */}
 </div>
  
  :
  <Link to={'/login'}>
        <Button className='p-5 text-xl !bg-amber-100 text-amber-950'>Login <IoMdLogIn className='text-4xl ms-3'/></Button>

</Link>
}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" className=' !text-amber-200' active>
          Home
        </NavbarLink>
        <Link to="/allbooks" className=' !text-amber-100 '>Books</Link>
        <Link to="/career" className=' !text-amber-100 '>Careers</Link>
        <Link to="/contact" className=' !text-amber-100 '>Contact</Link>
      </NavbarCollapse>
    </Navbar>  </div>
  )
}

export default Header
