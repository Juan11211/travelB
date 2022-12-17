import React, {useContext, useState} from 'react'
import TravelEdit from './TravelEdit'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {FaEdit} from 'react-icons/fa'
import {AiOutlineCloseCircle} from 'react-icons/ai'


// profile list 
export default function Travel(props){
  const { username, location, review, imgUrl, _id, deleteTravel, addTravel, editTravel } = props

  
  const [editToggle, setEditToggle] = useState(false)
  return (

    <div className="bg-white border-2 rounded-sm max-w-md my-3">
      
    {
        !editToggle?
        
    <>
        
        <h1 className="text-md font-semibold antialiased block leading-tight mx-3 flex justify-center my-2">{ location } </h1>
        <img src={imgUrl} alt="travel image"  className="flex items-center justify-between mt-3 mb-2" />
        <h3 className="text-lg mx-2"> { review } </h3>
        <span className="flex gap-5"> 
        <button className='text-2xl my-2 px-2' onClick={() => setEditToggle(prevState => !prevState)}><FaEdit /></button>
        <button className='text-2xl my-2 px-2 content-end'  onClick={() => deleteTravel(_id)}><RiDeleteBin5Line /></button>
        </span>
    </>
    :
    <>
        <TravelEdit {...props} addTravel={addTravel} setEditToggle={setEditToggle} />
        <button className="text-2xl border-2 mx-auto my-3 hover:bg-blue-200 hover:border-blue-200" onClick={() => editTravel(_id)}><FaEdit /></button>
        <button className="text-2xl border-2 mx-auto my-3 hover:bg-blue-200 hover:border-blue-200" onClick={() => setEditToggle(prevState => !prevState)}><AiOutlineCloseCircle /></button>
    </>
    
    }
    </div>
  

  )
}