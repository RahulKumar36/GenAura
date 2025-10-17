import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'


const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()

  return user ? (

    <div className='flex flex-col items-start justify-center bg-gray-900 text-white'>
      <nav className='w-full px-8 min-h-14 flex items-center justify-between bg-gray-950 border-b border-gray-700'>
        <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate('/')}>
          <img src={assets.logo} alt="logo" className='h-12 w-auto' />
          <p className='text-3xl font-bold bg-gradient-to-r from-blue-700 to-green-500 bg-clip-text text-transparent'>
            GenAura
          </p>
        </div>

        {
          sidebar ? <X onClick={() => setSidebar(false)} className='w-6 h-6 text-gray-300 sm:hidden' />
            : <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-gray-300 sm:hidden' />
        }

      </nav>

      <div className='w-full flex h-[calc(100vh-56px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className='flex-1 bg-gray-950 overflow-y-auto'>
          <Outlet />
        </div>
      </div>

    </div>
  ) : (
    <div className='flex items-center justify-center h-screen bg-gray-900'>
      <SignIn />
    </div>
  )
}

export default Layout