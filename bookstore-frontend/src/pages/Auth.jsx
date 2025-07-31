import React, { useEffect } from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLoginAPI, loginAPI, registerAPI } from '../services/allAPIs';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'

function Auth({ register }) {
  //create a state for holding userdata
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      // alert("please fill the form")
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
      // API call
      try {
        const result = await registerAPI(userDetails)
        console.log(result);
        if (result.status == 200) {
          toast.success("Registration Succesfull!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          })
          setUserDetails({
            username: "",
            email: "",
            password: ""
          })
          setTimeout(() => {
            navigate('/login')
          }, 4000)
        }
        else {
          //Registered data in result.response.data(in Backend)
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
  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      // alert("please fill the form")
      toast.warn("Please fill the form!", {
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
    else {
      try {
        const result = await loginAPI(userDetails)
        console.log(result);
        if (result.status == 200) {

          sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token", JSON.stringify(result.data.token))

          toast.success("Login Succesfull!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          })

          setUserDetails({
            username: "",
            email: "",
            password: ""
          })
          if (result.data.existingUser.email == "admin@gmail.com") {
            navigate('/admin-home')
          }
          else {
            navigate('/')
          }

        }
        else {
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

  const handleGoogleAuth = async (credentialResponse) => {
    console.log(credentialResponse);
    const decode = jwtDecode(credentialResponse.credential)
    console.log(decode);

    try {
      const result = await GoogleLoginAPI({ username: decode.name, email: decode.email, password: 'googlepswd', photo: decode.picture })

      console.log(result);
      if (result.status == 200) {
      
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", JSON.stringify(result.data.token))

        toast.success("Login Succesfull!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        })

        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        if (result.data.existingUser.email == "admin@gmail.com") {
          navigate('/admin-home')
        }
        else {
          navigate('/')
        }

      }
    }
    catch(err) {
      console.log(err);

    }

  }



  return (
    <div >
      <div className="bg-[url('https://cdn.pixabay.com/photo/2014/09/05/18/32/old-books-436498_1280.jpg')] bg-cover bg-center bg-fixed h-screen flex justify-center"
      >
        <div className='basis-128'></div>
        <div className='basis-128'>
          <form className="flex max-w-md flex-col gap-4 mt-45 bg-amber-50 p-5 rounded-2xl ">
            {
              register ?
                <h1 className='text-center text-amber-950 text-4xl'>Register</h1>
                :
                <h1 className='text-center text-amber-950 text-4xl'>Login</h1>
            }
            <div>
              {
                register &&
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="username" className='!text-amber-950'>Username</Label>
                  </div>
                  <TextInput className='' onChange={e => { setUserDetails({ ...userDetails, username: e.target.value }) }} id="username" type="text" placeholder="John Doe" required />
                </div>
              }
              <div className="my-2 block">
                <Label htmlFor="email1" className='!text-amber-950'>Your email</Label>
              </div>
              <TextInput className='' onChange={e => { setUserDetails({ ...userDetails, email: e.target.value }) }} id="email1" type="email" placeholder="name@gmail.com" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" className='!text-amber-950'>Your password</Label>
              </div>
              <TextInput onChange={e => { setUserDetails({ ...userDetails, password: e.target.value }) }} id="password1" type="password" required />
            </div>

            {
              register ?
                <div className='flex flex-col'>
                  <Button type="button" onClick={handleRegister} className='!bg-amber-950'>SignUp</Button>
                  <p className='text-center mt-3'>Already a member?
                    <Link to={'/login'}>
                      Login Now!
                    </Link>
                  </p>
                </div>
                :
                <div className='flex flex-col'>
                  <Button type="button" onClick={handleLogin} className='!bg-amber-950'>SignIn</Button>
                  <p className='text-center mt-3'>New to here?
                    <Link to={'/register'}>
                      Register Now!
                    </Link>
                  </p>
                  <div className='m-2'>.....................or.....................</div>
                  <div>
                    <GoogleLogin
                      onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        handleGoogleAuth(credentialResponse)
                      }}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                    />
                  </div>
                </div>
            }
            <div>

            </div>
          </form>

        </div>
        <div className='basis-128'></div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Auth
