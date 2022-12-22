import React, {useState , useEffect} from "react";
import { IoPerson } from "react-icons/io5";
import Profile from "../User/profile";
import axios from "axios";
import { useCookies } from "react-cookie";
import Pursuit from '../../images/pursuit.jpg'


export default function InterviewForPanelists (props) {
  const [cookies , setCookie] = useCookies();
  const [interviews , setINterviews] = useState();
  const[showProfile , setSowProfile] = useState(false);


  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_PURSUIT_URL}/interviewSchedule/getAllInterviewSchedulesForPanelist`,
    {
      headers : {"x-access-token": cookies['token']},
  
   })
    .then(
      response=>{
        setINterviews(response.data.data)
      }
    )

  },[])
  return (
    <>
    
     <div className=" border border-neutral-300 rounded-xl w-full"> 
     <header className=" flex justify-between border border-white border-b-neutral-300  p-8 text-xl font-bold realtive">
     <img src={Pursuit} width={200} height={50}  alt='' />
      <IoPerson size={40} color={'orange'} onClick={()=>setSowProfile(!showProfile)}/>
      {showProfile ?
      <Profile/> : null}
      </header>
     <ul > 
     <li className=" border border-white border-b-neutral-300">
<ul className=" flex justify-between space-x-3 text-lg font-bold align-middle text-left p-4">
  <li className=" w-1/5">Candidate Name</li>
  <li className=" w-1/5" >Current Round</li>
  <li className=" w-1/5">Interview Date</li>
  <li className=" w-1/5">Interview Time</li>
  <li className=" w-1/5">Venue</li>
</ul>
</li>

{interviews ? interviews.map(interview =>{
  return (<li className=" border border-white border-b-neutral-300" onClick={()=>{
    setCookie('interviewId', interview._id)
    props.setAddFeedBack(true)}}>
    <ul className=" flex justify-between space-x-3 text-base font-medium align-middle text-left p-4">
      <li className=" w-1/5">{interview.candidateName}</li>
      <li className=" w-1/5">{interview.currentRound}</li>
      <li className=" w-1/5">{interview.interviewDate}</li>
      <li className=" w-1/5">{interview.interviewTime}</li>
      <li className=" w-1/5">{interview.venue}</li>
    </ul>
    </li>)
}) :  null}

</ul>

     </div>
    </>
  )  
}