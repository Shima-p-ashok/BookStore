import React from 'react'
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

function PageFooter() {
  return (
    <div>
      <Footer container className='!bg-amber-800'>
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <a href="https://flowbite.com" className="flex items-center space-x-3">
                <img
                  src="https://th.bing.com/th/id/R.f57aba50eca8714ef92a554c69472757?rik=sFDtXE3DZw3xKg&riu=http%3a%2f%2fpngimg.com%2fuploads%2fbook%2fbook_PNG51108.png&ehk=LnTQzpkH%2bkANYL0EmPwcso%2fKiEDEJtZpzQIRrk%2fMg54%3d&risl=1&pid=ImgRaw&r=0"
                  className="h-10"
                  alt="InkByte Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-bold text-amber-100">
                  InkByte
                </span>
              </a>

            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 ">
              <div >
                <FooterTitle className='text-amber-100' title="about" />
                <FooterLinkGroup col>
                  <FooterLink href="#" className='text-amber-100'>Flowbite</FooterLink>
                  <FooterLink href="#" className='text-amber-100'>Tailwind CSS</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle className='text-amber-100' title="Follow us" />
                <FooterLinkGroup col>
                  <FooterLink href="#" className='text-amber-100'>Github</FooterLink>
                  <FooterLink href="#" className='text-amber-100'>Discord</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle className='text-amber-100' title="Legal" />
                <FooterLinkGroup col>
                  <FooterLink href="#" className='text-amber-100'>Privacy Policy</FooterLink>
                  <FooterLink href="#" className='text-amber-100'>Terms &amp; Conditions</FooterLink>
                </FooterLinkGroup>
              </div>
            </div>
          </div>
          <FooterDivider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href="#" className='text-amber-100' by="InkByte™" year={2025} />
            <div className=" mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="#" className='text-amber-100' icon={BsFacebook} />
              <FooterIcon href="#" className='text-amber-100' icon={BsInstagram} />
              <FooterIcon href="#" className='text-amber-100' icon={BsTwitter} />
              <FooterIcon href="#" className='text-amber-100' icon={BsGithub} />
              <FooterIcon href="#" className='text-amber-100' icon={BsDribbble} />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  )
}

export default PageFooter
