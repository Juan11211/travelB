import React from "react";
import {RiDeleteBin5Line} from 'react-icons/ri'

export default function Comment(props) {
    
    return (
        <div className="comment">
            <h4>{props.username} mentioned: "{props.comment}"</h4>
            <button className='border-2 w-[20px] hover:bg-blue-200 hover:border-blue-200' onClick={() => props.deleteComment(props._id)}><RiDeleteBin5Line /></button>
        </div>
    )
}