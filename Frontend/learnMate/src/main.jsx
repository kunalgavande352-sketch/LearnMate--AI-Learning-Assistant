import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "react-hot-toast";
import App from './App.jsx'
import { AuthProvide } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvide>
        <Toaster position='top-right' toastOptions={{duration:3000}}/>
      <App/>
    </AuthProvide>
    
)
