import React from 'react'
import Travel from './Travel.js'

export default function TravelList(props){
  const { travel, deleteTravel, editTravel, username } = props

  return (
    <div className='grid grid-cols-3 gap-5'>
      { travel.map(travel => 
      <div className='h-full overflow-hidden'>
      <div className='relative group cursor-pointer'>
      <div className='relative h-full'></div>
      <Travel {...travel} username={username} key={travel.id} deleteTravel={deleteTravel} editTravel={editTravel}
     /> 
     </div> 
     </div>
     )}
    </div>
    
  )
}