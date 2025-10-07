import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assist/logo.png'
import Btn from '../common/Btn'
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL; 

function DashbaordHeader() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handelLogoutBtn = async() => {
    await logout();
    navigate('/');
  }
  return (
    <div className='flex w-full'>
      {/* First part - Logo section with glossy effect */}
      <div className="bg-white/30 backdrop-blur-xl shadow-md border border-white/40 md:w-60 p-1 fixed top-4 md:h-18 rounded-2xl z-10 hover:bg-white/40 transition-all duration-300">
        <div className="flex items-center h-full justify-center p-3">
           <img src={logo} alt="HabitAura Logo" className="w-20 md:w-40 mx-auto object-fill hover:scale-105 transition-transform duration-300" />
        </div>
      </div>

      {/* Second part - Dashboard header with enhanced glossy effect */}
      <div className="bg-white/30 backdrop-blur-xl shadow-md hover:shadow-lg border border-white/40 p-3 fixed top-4 right-4 w-[65%] md:w-[calc(100%-18rem)] rounded-2xl z-10 hover:bg-white/40 transition-all duration-300">
        <div className="flex justify-between items-center h-full">
          <h1 className="text-xl md:text-3xl font-bold text-gray-700 px-4">Dashboard</h1>
          <div className="flex items-center space-x-4 px-4">
            <Link onClick={handelLogoutBtn}>
              <Btn text='Logout' className='bg-white text-black border border-gray-300 hover:bg-gray-100' />
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>
    </div>
  )
}

export default DashbaordHeader