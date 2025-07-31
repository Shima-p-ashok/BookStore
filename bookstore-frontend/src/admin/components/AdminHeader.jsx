import React from 'react'
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

import { Link } from 'react-router-dom';
import { RiLogoutCircleLine } from "react-icons/ri";

function AdminHeader() {
  return (
    <div>
      <Navbar fluid rounded className='!bg-amber-800 fixed top-0 left-0 right-0 '>
                  <NavbarBrand href="https://flowbite-react.com">
                    <img src="https://th.bing.com/th/id/R.f57aba50eca8714ef92a554c69472757?rik=sFDtXE3DZw3xKg&riu=http%3a%2f%2fpngimg.com%2fuploads%2fbook%2fbook_PNG51108.png&ehk=LnTQzpkH%2bkANYL0EmPwcso%2fKiEDEJtZpzQIRrk%2fMg54%3d&risl=1&pid=ImgRaw&r=0" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold !text-amber-100 dark:text-white">InkByte</span>
                  </NavbarBrand>
                  <div className="flex md:order-2">
                   <Link to='/login'>
                   <Button className='p-5 text-xl !bg-amber-100 text-amber-950'>Logout<RiLogoutCircleLine className='text-3xl ms-3' /></Button>
                  </Link>
                   
                  </div>
                </Navbar>
                
                  <marquee className="mt-15 bg-amber-100 p-2 " behavior="" direction="left">
                  Welcome, Admin! You're all set to manage the system. Let's go to work!
                  </marquee>
                
    </div>
  )
}

export default AdminHeader
