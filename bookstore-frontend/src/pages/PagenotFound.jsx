import React from 'react'
import { Link } from 'react-router-dom'

function PagenotFound() {
  return (
    <div>
      <div className='flex'>
        <div className='basis-100'></div>
        <div className='w-100 text-center mt-50'>
          <p className='text-4xl'>404</p>
          <p>Sorry there is no pages!</p>
          <img src="https://th.bing.com/th/id/OIP.PJ0PyRXOXD-2gqlfs4RG-wHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="" width={'600px'} height={'400px'}  />
          <Link to={'/allbooks'}>
          <button className='bg-amber-950 text-amber-100 p-4 rounded-2xl'>Buy Books</button>
          </Link>
        </div>
        <div className='basis-100'></div>

      </div>
    </div>
  )
}

export default PagenotFound
