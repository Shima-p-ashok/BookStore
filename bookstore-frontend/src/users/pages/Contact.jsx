import React from 'react'
import Header from '../components/Header'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Button, Drawer, DrawerHeader, DrawerItems, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiEnvelope } from "react-icons/hi2";
import PageFooter from '../../components/PageFooter';



function Contact() {

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  return (

    <div>
      <Header />
      <div>
        <h1 className='text-4xl text-center m-4' >Contact us</h1>
      </div>
      <div className='text-xl text-center text-justify m-10' >
        We’re always happy to connect with you.
        Your thoughts and feedback truly matter to us.
        Whether you have questions, suggestions, or ideas, we’re here to listen.
        Don’t hesitate to reach out and share what’s on your mind.
        We believe communication helps us serve you better.
        Every message we receive is important and valued.
        Our team is dedicated to offering the support you need.
        We’re committed to making your experience exceptional.
        Thank you for taking the time to connect with us.
      </div>

      <div className='flex gap-70 m-7'>
        <div>
           <h1 className='text-2xl'><FaLocationDot /> <span className='text-xl'>123,Main Street,Kochi</span></h1>
        </div>
        
        <div>
           <h1 className='text-2xl'><FaPhoneAlt /> <span className='text-xl'>‪+91 9123456789‬</span></h1>
        </div> 

        <div>
           <h1 className='text-2xl'><MdEmail /> <span className='text-xl'>Mail@gmail.com</span></h1>
        </div>


      </div>
       

        
      <div className='flex gap-33 m-10'>

        <div class="basis-128">
        <div className="  text-center min-h-[50vh] items-center justify-center pt-33">
          <h1 className='text-2xl'>Message us...</h1>
        <Button className='!bg-amber-900 m-auto p-3' onClick={() => setIsOpen(true)}>Show contact form</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} className='!bg-amber-50'>
        <DrawerHeader className='' title="CONTACT US" titleIcon={HiEnvelope} />
        <DrawerItems>
          <form action="#">
            <div className="mb-6 mt-3">
              <Label htmlFor="email" className="mb-2 block  !text-amber-900">
                Your email
              </Label>
              <TextInput id="email" name="email" placeholder="name@company.com" type="email" />
            </div>
            <div className="mb-6">
              <Label htmlFor="subject" className="mb-2 block  !text-amber-900">
                Subject
              </Label>
              <TextInput id="subject" name="subject" placeholder="Let us know how we can help you" />
            </div>
            <div className="mb-6">
              <Label htmlFor="message" className="mb-2 block  !text-amber-900">
                Your message
              </Label>
              <Textarea id="message" name="message" placeholder="Your message..." rows={4} />
            </div>
            <div className="mb-6">
              <Button type="submit" className="w-full !bg-amber-900" >
                Send message
              </Button>
            </div>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <a href="mailto:info@company.com" className="hover:underline !text-amber-900">
                info@company.com
              </a>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <a href="tel:2124567890" className="hover:underline !text-amber-900">
                212-456-7890
              </a>
            </p>
          </form>
        </DrawerItems>
      </Drawer>
      </div>

      <div class="basis-64">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125745.78609839798!2d76.22589078994696!3d9.97086449502177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d08f976f3a9%3A0xe9cdb444f06ed454!2sErnakulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1751019666396!5m2!1sen!2sin" width="600" height="450"  allowfullscreen="" loading="lazy" ></iframe>
      </div>
      </div>

<PageFooter/>
    </div>
  )
}

export default Contact
