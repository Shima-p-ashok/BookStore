import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <p className="text-4xl font-bold">404</p>
        <p className="mb-4">Sorry, there is no page</p>
        <img
          src="https://schoolville.com/assets/img/empty-cart-illustration.gif"
          alt="Not found"
          className="mx-auto mb-6" height={'400px'} width={'400px'}
        />
        <Link to="/allBooks">
          <button className="bg-amber-800 hover:bg-amber-900 text-amber-100 px-6 py-3 rounded-2xl">
            Buy Books
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
