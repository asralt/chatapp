import React, { useEffect } from 'react'
import Navbar from './component/Navbar'
import {Routes,Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import SettingsPage from './pages/SettingsPage'
import { axiostInstance } from '../lib/axios'
import { useAuthStore, checkAuth } from './store/useAuthStore'


const App = () => {  
  const {authUser,checkAuth}= useAuthStore() //zustand
  useEffect(()=>{
    checkAuth()
  },
  [checkAuth]
);
console.log({authUser});

  return (
      <div>
        <Navbar/>

        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/SettingsPage" element={<SettingsPage/>}/>
          <Route path="/profile" element={<Profile/>}/>

        </Routes>
        
      </div>
  )
}

export default App
