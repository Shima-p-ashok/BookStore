import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './users/pages/Home';
import { useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import Auth from './pages/Auth';
import AllBooks from './users/pages/AllBooks';
import ViewBook from './users/pages/ViewBook';
import Careers from './users/pages/Careers';
import Contact from './users/pages/Contact';
import Profile from './users/pages/Profile';

import AdminHome from './admin/Pages/AdminHome'
import AdminBooks from './admin/Pages/AdminBooks'
import AdminCareers from './admin/Pages/AdminCareers'
import AdminSettings from './admin/Pages/AdminSettings'

import PaymentError from './users/pages/PaymentError';
import PaymentSuccess from './users/pages/PaymentSuccess';

import PageNotFound from './pages/PagenotFound';
import EditProfile from './users/components/EditProfile';




function App() {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 3000)
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={isLoading ? <Home /> : <Preloader />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />

        <Route path='/allbooks' element={<AllBooks />} />
        <Route path='/viewBook/:id' element={<ViewBook />} />
        <Route path='/career' element={<Careers />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        

        <Route path='admin-home' element={<AdminHome/>}/>
        <Route path='admin-books' element={<AdminBooks/>}/>
        <Route path='admin-career' element={<AdminCareers/>}/>
        <Route path='admin-settings' element={<AdminSettings/>}/>
        
        <Route path='payment-success' element={<PaymentSuccess/>}/>
        <Route path='payment-error' element={<PaymentError/>}/>

        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
    </>
  )
}

export default App
