import React, { useState } from "react";
import Piechart from "./pieChart";
import LineChart from "./lineChart";
import { IoPerson } from "react-icons/io5";
import Profile from "../User/profile";
import Pursuit from '../../images/pursuit.jpg'

export default function Dashboard (props) {
  const[showProfile , setSowProfile] = useState(false);
  return (
    <>
    <div className={" w-full " }>
    <header className=" flex justify-between border border-white border-b-neutral-300  p-8 text-xl font-bold realtive">
     <img src={Pursuit} width={200} height={50}  alt='' />
      <IoPerson size={40} color={'orange'} onClick={()=>setSowProfile(!showProfile)}/>
      {showProfile ?
      <Profile/> : null}
      </header>
    <div className="  flex justify-between space-x-8 my-10 mx-5 place-items-center align-middle">
      <LineChart/>
      <Piechart/>
    </div>
    
    <div className=" flex justify-center align-middle ">
    <button  className=" p-3 bg-neutral-300 text-black font-medium text-base my-3 border border-black rounded-lg"
    onClick={()=>{props.setAddUser(true)}}>Add Candidate</button>
    </div>
    </div>
    </>
  )
}