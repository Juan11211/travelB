import React, {useState, useContext} from "react";
import {MdOutlineSaveAlt} from 'react-icons/md'

export default function TravelEdit(props) {
    const {editTravel} = props

    const initInputs = {
        location: props.location || "",
        review: props.review || "",
        imgUrl: props.imgUrl || ""
    }

    const [ inputs, setInputs ] = useState(initInputs)
    
    function handleChange(e) {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        editTravel(inputs, props._id)
        props.setEditToggle(prevState => !prevState)
    }

    const { location, review, imgUrl } = inputs

    return (
        <form className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3" onSubmit={handleSubmit}>
            <input 
                className="border-2"
                type="text"
                name="location"
                value={location}
                onChange={handleChange}
                placeholder="Location"
            />
            <textarea 
                className="border-2"
                type="textarea"
                name="review"
                value={review}
                onChange={handleChange}
                placeholder="Leave your review"
            /> 
             <input 
                className="border-2"
                type="text" 
                name="imgUrl" 
                value={imgUrl} 
                onChange={handleChange} 
                placeholder="Image Url"/>           
            <button className="border-2 text-2xl mx-3 hover:bg-[lightblue]"><MdOutlineSaveAlt /></button>
        </form>
    )

}