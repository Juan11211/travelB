import React from 'react'
import { Link } from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import {FiLogOut} from 'react-icons/fi'

export default function Navbar(props){
  const { logout } = props
  return (
    <div className='border-b px-4 py-2 bg-[whitesmoke]'>
      <img  className='h-[80px] w-[200px]' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpHvSAB1Z1IoGClUy_NBqT6LsyhNmVOhmvqw&usqp=CAU' />
    <div className='flex justify-end px-3 text--500 font-semibold text-3xl'>
      <Link  className='mx-1' to="/profile"><CgProfile>Profile</CgProfile></Link>
      <Link className='mx-1' to="/public"><AiFillHome>Public</AiFillHome></Link>
      <Link className='mx-1' to="/sneakers">All Post</Link>
      <button className='mx-1' onClick={logout}><FiLogOut>Logout</FiLogOut></button>
    </div>
    </div>
  )
}