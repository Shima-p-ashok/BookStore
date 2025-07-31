import React from 'react'
import img from '../assets/book.gif'

function Preloader() {
  return (
    <div>
      <div className='flex flex-row bg-amber-100'>
        <div className='basis-128'></div>
        <div className='basis-128 justify-center mt-60 p-5'>
         <img src={img} alt=''></img>
         <h1>Welcome to InkByte</h1>
         </div>
         <div className='basis-128'></div>
        </div>
    </div>
  )
}

export default Preloader
