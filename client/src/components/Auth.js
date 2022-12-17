import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.js'
import { UserContext } from '../context/UserProvider.js'

const initInputs = { username: "", password: "" }

export default function Auth(){
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  function toggleForm(){
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return (
    <div name='auth' className="w-full h-full bg-[whitesmoke]">
      <h1 className='text-5xl flex justify-center items-center '>TravelGram</h1>
      { !toggle ?
        <div className='text-md'>
          <AuthForm className=''
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg} />
          <p className='bg-[white] border-[white] text-center w-80 py-4 ' onClick={toggleForm}>Already a member?</p>
        </div>
      :
      <div className='text-md'>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
          />
          <p className='bg-[white] border-[white] text-center w-80 py-4' onClick={toggleForm}>Not a member?</p>
        </div>
      }
    </div>
  )
}