import React, { useState } from 'react'
import axios from 'axios'


export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props){
  
  const initState = { 
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || "", 
    travel: [],
    errMsg: ""
  }

  const [userState, setUserState] = useState(initState)

  function signup(credentials){
    axios.post("/auth/signup", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function login(credentials){
    axios.post("/auth/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getUserTravel()
       // getAllTravel()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      travel: []
    })
  }

  function handleAuthErr(errMsg){
    setUserState(prevState => ({
      ...prevState,
      errMsg
    }))
  }

  function resetAuthErr(){
    setUserState(prevState => ({
      ...prevState,
      errMsg: ""
    }))
  }


  function getUserTravel(){
    userAxios.get("/api/travel/user")
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          travel: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function addTravel(newTravel){
    userAxios.post("/api/travel", newTravel)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          travel: [...prevState.travel, res.data]
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function deleteTravel(travelId){
    userAxios.delete(`/api/travel/${travelId}`)
    .then(res => setUserState(prevState => ({
      ...prevState, 
      travel: prevState.travel.filter(travel => travel._id !== travelId)
    })))
    .catch(err => console.log(err))
  }

  function editTravel(updatedTravel, travelId){
    userAxios.put(`/api/travel/${travelId}`, updatedTravel)
    .then(res => setUserState(prevState => ({
      ...prevState,
      travel: prevState.travel.map(travel => travel._id !== travelId ? travel : res.data)
    })))
  } 

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addTravel,
        resetAuthErr, 
        getUserTravel, 
        deleteTravel, 
        editTravel,  
      }}>
      { props.children }
    </UserContext.Provider>
  )
}