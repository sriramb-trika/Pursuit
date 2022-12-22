import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import SearchableDropdown from "../SearchableDropDown/SearchableDropdown";
//import {PanelistsData} from '../SearchableDropDown/panelistsData';

export default function ScheduleInterview (props){

  const[cookies, setCookie] = useCookies();
  const [panelists , setPanelists]= useState();
  const [skill , setSkill] = useState()
  const [value , setValue] = useState()
  const [date , setDate] = useState();
  const [time , setTime] = useState();
  const [round , setRound ]=useState()


  const handleDate =(e)=>{
    e.preventDefault(e)
    setDate(e.target.value)
  }

  const handleTime =(e)=>{
    e.preventDefault(e)
    setTime(e.target.value)
  }
  const handleRound =(e)=>{
    e.preventDefault(e)
    setRound(e.target.value)
  }



  const handleChange=(e)=>{
    e.preventDefault(e)
    setSkill(e.target.value)

  }
  const handleSearch = (e) =>{
    e.preventDefault()
    axios.get(`${process.env.REACT_APP_PURSUIT_URL}/panelists/getPanelistsBySkills/ `,{
      headers: {'x-access-token': cookies['token'] },
      params:{
        searchText : skill,
        skip :0,
        limit :10
      }
    }).then(
      response=>{
        console.log(response)
        setPanelists(response.data.data)
      }
    )
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    let dateVal = date.concat('T',time,':00Z')
    axios.post(`${process.env.REACT_APP_PURSUIT_URL}/interviewSchedule/addInterviewSchedule`,
    {"candidateId": cookies['candidateId'],
    "panelistId": panelists.find(item => item.firstName === value)._id,
    "currentRound":round,
    "interviewDate": new Date(dateVal).getTime(),
    "interviewTime":time,
    "venue":"Trika Office - Bangalore"},
    {headers :{"x-access-token" : cookies['token']}}
    )
    .then(response=>
     { if(response.status===200){
            props.setSchedule(false);
            props.setScreen('interviews')
      }})
  }




  return (
   
    <div className=" w-full px-4 border border-neutral-300  h-96">
      <form  className=" p-2">
      <div className=" flex justify-between space-x-5 my-5">
      <label for="gsearch">Search Panelists by Skill</label>
   <div className=" border border-neutral-300 rounded-lg p-1 h-10">
   <input className=" focus:outline-none w-30 "  
   type="search"  onChange={(e)=>{handleChange(e)}}/>

   </div>
  <input type="submit" onClick={(e)=> handleSearch(e)} className=" border border-neutral-300 h-10 rounded-lg"/>
  </div>   
  <div></div>
<div className=" flex justify-start space-x-3 align-middle my-5">
<label>Schedule Interview</label>
  <div className=" border border-neutral-300">
    <input type="date" className=" focus:outline-none w-30" onChange={(e)=>{handleDate(e)}} />
  </div>
  <div className=" border border-neutral-300">
    <input type="time" className=" focus:outline-none w-30" onChange={(e)=>{handleTime(e)}} />
  </div>
</div>


{console.log(panelists)}
{panelists ? <div className=" mb-5 flex justify-start space-x-6  relative" >
            <label >Panelists</label>
            <div >
            <SearchableDropdown
        options={panelists}
        label="firstName"
        id="_id"
        selectedVal={value}
        handleChange={(val) => setValue(val)}
      />
    </div>
   
        </div> : null}

        <div className=" flex justify-start space-x-5 my-5">
  <label>Select Round</label>
  <div className=' border border-neutral-300 rounde-lg'>
    <input type="number"  className=" w-20 focus:outline-none" onChange={(e)=>{handleRound(e)}}/>
  </div>
</div>
    
    <div className=" flex justify-center space-x-5 my-5" >
      <button onClick={()=>{props.setSchedule(false)}} className ='border border-neutral-300 p-2 rounded-lg'>back</button>
      <button className ='border border-neutral-300 p-2 rounded-lg' onClick={(e)=>handleSubmit(e)}>save</button>
    </div>
      </form>
    </div>
  )

}