import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <GoogleOAuthProvider clientId="228791223842-j1iu4cd29ck3eagvs87s0r8410o5k6bd.apps.googleusercontent.com"><App /></GoogleOAuthProvider>
   </BrowserRouter>
  </StrictMode>,
)
