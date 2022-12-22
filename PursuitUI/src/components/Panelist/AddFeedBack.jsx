import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function  AddFeedback (props) {

const [cookie, setCookie] = useCookies();
const [Comments , setComments] = useState();
const [Recommendation ,setRecommendation] = useState();
const [selected , setSelected] = useState();
const [notSelected , setNotselected] = useState();
const [rating , setRating] = useState();

const handleComments=(e)=>{
  e.preventDefault();
  setComments(e.target.value)
}

const handleRecommendation=(e)=>{
  e.preventDefault();
  setRecommendation(e.target.value)
}
const handleRating=(e)=>{
  e.preventDefault();
  setRating(e.target.value)
}

const handleSubmit =(e)=>{
  e.preventDefault();
  axios.post(`${process.env.REACT_APP_PURSUIT_URL}/interviewRoundFeedback/addInterviewRoundFeedback`,
  {
    "interviewScheduleId":cookie['interviewId'],
  "recommendation":Recommendation,
  "feedback":[
    {"comment":Comments,"rating":rating},
  ],
  ...(selected ? {"isSelected": true}   : {"isSelected": false})
},
    {
      headers : {"x-access-token": cookie['token']}
   })
   .then(response=>{
    if(response.status === 200){
      props.setAddFeedBack(false)
    }
   })
    
}


  return (
    <>
    <div className=" border border-neutral-300 rounded-ld h-96 ">
      <form className=" p-2" >
       
        <div className=" flex justify-center space-x-4 my-3">
          <label>Feedback</label>
          
        </div>
        <div className=" flex justify-start space-x-20 my-3">
          <label>Comments</label>
          <div className=" border border-neutral-300 rounded-lg">
           <textarea className=" focus:outline-none" onChange={(e)=>handleComments(e)}/>
          </div>
        </div>
        <div className=" flex justify-start space-x-28 my-3 align-middle">
          <label>Rating</label>
          <div className=" border border-neutral-300 rounded-lg">
            <input type="number" className=" w-20 focus:outline-none"onChange={(e)=>handleRating(e)} />
          </div>
        </div>
       
        
        <div className=" flex justify-between space-x-4 my-3">
          <label>Recommendation</label>
          <div className=" border border-neutral-300 rounded-lg">
            <input type="text" className=" w-30 focus:outline-none"onChange={(e)=>handleRecommendation(e)} />
          </div>
        </div>

        <div className=" flex justify-center space-x-4 my-3">
          <div className=" flex justify-start space-x-2 align-middle">
            <p>Selected</p>
            <input type="checkbox" disabled={notSelected}
            onChange={()=>{selected ?  setSelected(!selected) : setSelected(true)}}/>
          </div>
          <div className=" flex justify-start space-x-2 align-middle">
            <p>Not Selected</p>
            <input type="checkbox" disabled={selected}
             onChange={()=>{notSelected ?  setNotselected(!notSelected) : setNotselected(true)}}/>
          </div>
        </div>
        <div className=" flex justify-center space-x-6">
  <button className=" border border-neutral-300 rounded-lg p-2 " onClick={()=>{props.setAddFeedBack(false)}}>
  back
  </button>
  <button className=" border border-neutral-300 rounded-lg p-2 " onClick={(e)=>{handleSubmit(e)}}>
  save
  </button></div>
      </form>
    </div>
    </>
  )
}