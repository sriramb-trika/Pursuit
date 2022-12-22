import axios from "axios";
import React,{ useEffect, useState} from "react";
import { useCookies } from "react-cookie";

export default function  SeeFeedback (props) {

  const [feedback , setFeedback] = useState({
    "_id" : "63a2ef201f1caef0da149886",
    "interviewScheduleId" : "63a1a0fab0a7f6df907770b3",
    "panelistName" : "Sriram B",
    "panelistEmail" : "sriram.b@trikatechnologies.com",
    "candidateName" : "Harry Ford",
    "candidateEmail" : "harry.ford@yopmail.com",
    "currentRound" : 1,
    "candidateGender" : "female",
    "interviewFeedback" : [
        {
            "_id" : "63a2ef201f1caef0da149887",
            "comment" : "He performed well in the OOPs",
            "rating" : 4
        },
        {
            "_id" : "63a2ef201f1caef0da149888",
            "comment" : "He did not perform well in the Java",
            "rating" : 1
        }
    ],
    "recommendation" : "Move to next round",
    "isSelected" : true
});
  const [cookie , setCookie] = useCookies();

  // useEffect(()=>{
  //   axios.get(`${process.env.REACT_APP_PURSUIT_URL}/interviewRoundFeedback/getInterviewFeedbackByInterviewScheduleId/`,
  //   {headers : {'x-access-token':cookie['token}']},
  // params : {
  //   id : cookie['interviewId']
  // }}
  //   ).then(
  //     response=>{
  //       if(response.status===200){
  //         setFeedback(response.data.data)
  //       }
  //     }
  //   )
  // },[])

  return (
    <>
   
  <div className=" border border-neutral-300 rounded-ld h-96 w-96">
  {feedback ?
  <form className=" p-2" >
  <div className=" flex justify-between space-x-4 my-3">
    <label>Candidate</label>
    <div className=" border border-neutral-300 rounded-lg">
      <input type="text" className=" w-30 focus:outline-none" value={feedback.candidateName} readOnly/>
    </div>
  </div>
  <div className=" flex justify-between space-x-4 my-3">
    <label>PanelistName</label>
    <div className=" border border-neutral-300 rounded-lg">
      <input type="text" className=" w-30 focus:outline-none"  value={feedback.panelistName} readOnly/>
    </div>
  </div>
  <div className=" flex justify-between space-x-4 my-3">
    <label>Rating</label>
    <div className=" border border-neutral-300 rounded-lg">
      <input type="text" className=" w-30 focus:outline-none" value={feedback.interviewFeedback[0].rating} readOnly/>
    </div>
  </div>
  <div className=" flex justify-between space-x-4 my-3">
    <label>Round Number</label>
    <div className=" border border-neutral-300 rounded-lg">
      <input type="text" className="focus:outline-none" value={feedback.currentRound} readOnly/>
    </div>
  </div>
  <div>
    <label>Feedback</label>
    <div className=" border border-neutral-300">
    <textarea value={feedback.interviewFeedback[0].comment} className=" focus:outline-none" readOnly/>
    </div>
  </div>
  <div className=" flex justify-between space-x-4 my-3">
    <label>selected</label>
    <div className=" border border-neutral-300 rounded-lg">
      <input type="checkbox" className=" w-30 focus:outline-none" checked={feedback.selected} readOnly/>
    </div>
  </div>
  <div className=" flex justify-center">
<button className=" border border-neutral-300 rounded-lg p-2 " onClick={()=>{props.setSeeFeedBack(false)}}>
Back
</button></div>
</form>
:null}
</div>
    </>
  )
}