import React from "react";
import { Link } from "react-router-dom";
import { IoClose, IoHome, IoPencil, IoPerson} from 'react-icons/io5'

export default function Menu ( props) {

  return (
    <>
   
    <ul className=" w-50 border border-neutral-300 h-screen bg-neutral-200">
    <div className=" mx-3 my-5">
    <IoClose size={40} onClick={()=>props.setShowNav(false)}/>
    </div>
    <div className=" my-10  mx-4 py-2 px-4 font-sans text-xl font-bold  bg-white rounded-lg ">
     <Link to={'/interviews'}> 
     <li className=" flex justify-between space-x-3 align-middle place-items-center">
        <IoHome size={40}/>
        <p>Dashboard</p>
      </li>
      </Link>
     </div>
     <div className=" my-10 mx-4 py-2 px-4 font-sans text-xl font-bold  bg-white rounded-lg">
      <Link to ={'/candidates'}>
      <li className=" flex justify-between space-x-3 align-middle place-items-center">
        <IoPerson size={40}/>
        <p>Candidates</p>
      </li>
      </Link>
      </div> <div className=" my-10  mx-4 py-2  px-4 font-sans text-xl font-bold  bg-white rounded-lg">
      <Link to ={'/panelists'}>
      <li className=" flex justify-between space-x-3 align-middle place-items-center">
        <IoPencil size={40}/>
        <p>Panelists</p>
      </li>
      </Link>
      </div>
    </ul>
    </>
  )
}