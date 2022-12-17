import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import PublicTravel from "./PublicTravel";


export default function Public(props) {

    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    const [list, setList] = useState([])
    
        useEffect(() => 
        {userAxios.get(`/api/travel/`) 
        .then(res => setList(res.data))
        .catch(err => console.log(err.response.data.errMsg))
    }, [])
 


    return (
        <div className='grid grid-cols-3 gap-5 bg-[white] p-4'>
            
            <>
            {list.map(list => <div className='h-59 overflow-hidden'> <PublicTravel {...list} key={list._id}  
            />
            </div>)}</>
        </div>
    )
}