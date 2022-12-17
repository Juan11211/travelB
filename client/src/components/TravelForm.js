import React, { useState } from 'react'

const initInputs = {
  location: "",
  review: "",
  imgUrl: ""
}

export default function TravelForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const { addTravel } = props

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addTravel(inputs)
    setInputs(initInputs)
  }

  const { location, review, imgUrl } = inputs
  return (
    <form onSubmit={handleSubmit}>
      <input 
        className='border-2'
        type="text" 
        name="location" 
        value={location} 
        onChange={handleChange} 
        placeholder="Location"/>
      <textarea 
        className='border-2 h-[40px] my-'
        type="text" 
        name="review" 
        value={review} 
        onChange={handleChange} 
        placeholder="Review"/>
      <input 
        className='border-2'
        type="text" 
        name="imgUrl" 
        value={imgUrl} 
        onChange={handleChange} 
        placeholder="Image Url"/>
      <button className='border-2 mx-2 w-[250px] hover:bg-[lightblue]'>Add Your Experience</button>
    </form>
  )
}