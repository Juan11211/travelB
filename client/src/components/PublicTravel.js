import React, {useState, useEffect, useContext} from "react";
import Comment from "../components/Comment";
import axios from "axios";
import {FaRegHeart} from 'react-icons/fa'
import {CgComment} from 'react-icons/cg'
import UserAvatar from "./UserAvavtar";
import {MdOutlineAddBox} from 'react-icons/md'

 

export default function PublicTravel(props) {
    
    const {location, review, imgUrl, _id, likes, user: travelUser} = props

    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })
   
    const [votes, setVotes] = useState({likes: likes || 0})
    const [voteErrMsg, setVoteErr] = useState("")
    const [commentToggle, setCommentToggle] = useState(false)
    const [comments, setComments] = useState([])
    const [postObject, setPostObject] = useState({comment: "", travelId: _id})
    const [travelStyle, setTravelStyle] = useState();

  
    useEffect(
        () => {
            userAxios.get(`/api/comments/${_id}`)
                .then(res => setComments(res.data))
                .catch(err => console.log(err))
        }, 
    [])

  function handleChange(e){
      e.preventDefault()
      const {name, value} = e.target
      setPostObject(prevPostObject => ({...prevPostObject,
    [name]: value
}))
  }

  function addLike(travelId) {
    userAxios.put(`/api/travel/likes/${travelId}`)
        .then(res => setVotes(prevVotes => ({
            ...prevVotes, likes: res.data.likes ||
            prevVotes.likes
        })))
        .catch(err => setVoteErr(err.response.data.errMsg))
}

function addComment(e) {
    e.preventDefault()
    userAxios.post("/api/comments", postObject)
        .then(res => {
            setComments(prevComments => [...prevComments, res.data])
        })
        .catch(err => console.log(err))

        setPostObject(prevPostObject => ({
            ...prevPostObject,
            comment: ""
        }))
}

    function deleteComment(commentId) {
        userAxios.delete(`/api/comments/${commentId}`)
            .then(res => setComments(prevState => prevState.filter(comment => comment._id !== commentId)))
            .catch(err => console.log(err))
    }

    const avatarSize = travelStyle === "full-post" ? 40 : 30;

    return (
        !commentToggle?
       <div className="bg-white border-2 rounded-sm max-w-md">
        <div className="flex items-center px-3 py-3 ">
            <>
        <UserAvatar name={travelUser?.username} size={avatarSize} />
            </>
        <h1 className="text-sm font-semibold antialiased block leading-tight mx-3">{location}</h1>
            </div>
        <img className='flex items-center justify-between mt-3 mb-2' src={imgUrl} />
        <h3 className="text-lg mx-2">{review}</h3>
       <span className="flex gap-5"> 
       <button className='text-lg mx-3 ' onClick={() => addLike(_id)}><FaRegHeart className="my-4"/>{votes.likes}</button> 
        <button className='text-lg flex mt-4  'onClick={() => setCommentToggle(prevToggle => !prevToggle)}><CgComment /></button> 
        </span>
        <p style={{color: "red"}}>{voteErrMsg}</p>
        </div>
        :

        <div className="border-2 ">
            <form className="border-2 my-3 w-[200px]" onSubmit={addComment}>
                <textarea 
                    className="text-[black]"
                    type="text"
                    name="comment"
                    value={postObject.comment}
                    onChange={handleChange}
                    placeholder="Comment here"
                />
                <hr></hr>
                <button className="border-2 hover:bg-[lightblue] hover:border-[lightblue] my-3 "><MdOutlineAddBox /></button>
            </form>
            {comments.map(comment => <Comment {...comment} addComment={addComment} deleteComment={deleteComment} />)}
            <br />
            <button className='border-2 hover:bg-blue-200 hover:border-blue-200' onClick={() => setCommentToggle(prevToggle => !prevToggle)}>Hide Comments</button>    
        </div>
    )
    
}