import React from 'react'

export default function AuthForm(props){
  const {
    handleChange, 
    handleSubmit, 
    btnText,
    errMsg, 
    inputs: {
      username, 
      password
    } 
  } = props
  
  return (
    <div className="h-screen bg-whitesmoke-50 flex flex-col justify-center items-center">
      <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpHvSAB1Z1IoGClUy_NBqT6LsyhNmVOhmvqw&usqp=CAU' />
    <form className="mt-8 w-64 flex flex-col" onSubmit={handleSubmit}>
      <input 
        className='border-2 my-2 bg-[lightgray] border-[lightgray]'
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="Username"/>
      <input 
        className='border-2 my-2 bg-[lightgray] border-[lightgray]'
        type="text" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Password"/>
      <button className='mt-4 flex border-2 justify-center'>{ btnText }</button>
      <p style={{color: "red"}}>{ errMsg }</p>
    </form>
    </div>
    </div>
  )
}