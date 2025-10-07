import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assist/logo.png'
import Btn from './common/Btn'

function Header() {
  return (
    <header className="sticky top-0 bg-gray-100 shadow-md z-50">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <Link to="/" className=" hover:cursor-pointer">
          <img src={logo} alt="logo" className="w-20 md:w-40 mx-auto object-fill" />
        </Link>
        <nav className="space-x-4">
          <Link to="/auth" className=""><Btn text='Login' className='bg-white text-black border-black border'/></Link>
          <Link to="/auth/" className="text-gray-600 hover:text-gray-800">
            <Btn text='Sign Up' className='bg-green-600 text-white'/>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header;
