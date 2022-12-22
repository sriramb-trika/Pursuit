import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { IoPerson } from "react-icons/io5";
import Profile from "../User/profile";
import Pursuit from '../../images/pursuit.jpg'


export default function Candidates (props) {
  const [cookies , setCookie] = useCookies();
  const [candidates , setCandidates] = useState();
  const[showProfile , setSowProfile] = useState(false);

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_PURSUIT_URL}/candidates/getCandidatesByName/ `,
    {
      headers : {"x-access-token": cookies['token']},
  params :{
    searchText : '',
    skip :0,
    limit : 10
  }
   })
    .then(
      response=>{
        console.log(response)
        setCandidates(response.data.data)
      }
    )

  },[])

  return (
    <>
     <div className=" border border-neutral-300 rounded-xl w-full mx-4"> 
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
  <li className=" w-1/5" >Email</li>
  <li className=" w-1/5">Phone NUmber</li>
  <li className=" w-1/5">Position</li>
  <li className=" w-1/5">YearsOfExperience</li>
</ul>
</li>

{candidates ? candidates.map(candidate =>{
  return (<li className=" border border-white border-b-neutral-300" onClick={()=>{
    setCookie('candidateId', candidate._id)
    props.setSchedule(true)}}>
    <ul className=" flex justify-between space-x-3 text-base font-medium align-middle text-left p-4">
      <li className=" w-1/5">{candidate.firstName}</li>
      <li className=" w-1/5">{candidate.email}</li>
      <li className=" w-1/5">{candidate.phoneNumber}</li>
      <li className=" w-1/5">{candidate.positionConsidered}</li>
      <li className=" w-1/5">{candidate.yearsOfExperience}</li>
    </ul>
    </li>)
}) :  null}

</ul>
{/* <div className=" flex justify-center">
  <button className=" border border-neutral-300 rounded-lg p-2 " onClick={()=>{props.setSeeFeedBack(true)}}>
  show
  </button></div> */}
     </div>
    </>
  )  
}