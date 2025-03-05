
import React  from 'react'
import {useEffect} from 'react'
import Navbar from './components/Navbar'
import {Routes,Route,Navigate} from "react-router-dom"
import HomePage from '../../frontend/src/pages/Homepage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { axiosInstance } from './lib/axios'
import {Loader} from "lucide-react"
import { useAuthStore } from './store/useAuthStore'
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore'
const App = () => {

 const { authUser, checkAuth,isCheckingAuth } = useAuthStore(); // ✅ Correctly calling Zustand store
 const {theme} =  useThemeStore();

 useEffect(() => {
     checkAuth();
 }, [checkAuth]); // ✅ Using `checkAuth` correctly

 console.log({authUser});
  if(isCheckingAuth&& !authUser) 
  return(
    <div className='flex items-center justify-center h-screen'>
    <Loader className="size-10 animate-spin"/>
    </div>
  )
  return (
    <div data-theme={theme}>
      <Navbar /> 
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
