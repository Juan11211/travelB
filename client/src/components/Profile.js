import React, { useContext, useEffect } from 'react'
import TravelForm from './TravelForm.js'
import TravelList from './TravelList.js'
import { UserContext } from '../context/UserProvider.js'
import UserAvatar from './UserAvavtar.js'


export default function Profile(){
  const { 
    user: { 
      username 
    }, 
    addTravel, 
    travel, 
    deleteTravel, 
    editTravel, 
    getUserTravel
  } = useContext(UserContext)

  // my post will not refresh when page refreshes
  useEffect(() => {
    getUserTravel()
  }, [])

  return (
    <div className="mx-5 p-10">
      <div className='grid grid-cols-3 gap-4 mx-2'>
      <h1 className='text-gray-700 text-2xl mr-4 flex '>Welcome {username} <UserAvatar /> </h1>
      <div className='ml-4'>
      </div>
      <div className='text-2xl flex my-3'>
      <h3>Share something...</h3>
      </div>
      </div>
      <div className='my-3 mx-2'>
      <TravelForm  addTravel={addTravel}/>
      </div>
      <hr className='border-gray-500 mt-6'></hr>
      <TravelList username={username} travel={travel} deleteTravel={deleteTravel} editTravel={editTravel} />
    </div>
  )
}