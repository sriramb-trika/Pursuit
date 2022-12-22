import React from "react";
import { Link } from "react-router-dom";
import { IoHome, IoMenu, IoPencil, IoPerson} from 'react-icons/io5'

export default function Navbar (props) {

  return (
    <>
    
    <div className=" w-20 bg-neutral-300 h-screen ">
    <ul className="  py-3">
    <div className=" flex justify-center mx-3  mb-4  font-sans text-xl font-bold  bg-white rounded-lg "> <li>
        <IoMenu size={40} />
      </li>
     </div>
     <div className=" flex justify-center mx-3 my-8 p-1 font-sans text-xl font-bold  bg-white rounded-lg ">
      <li>
        <IoHome size={40} onClick={()=>props.setScreen('dashboard')}/>
      </li>
     </div>
     <div className=" flex justify-center mx-3 my-8 p-1 font-sans text-xl font-bold  bg-white rounded-lg">
      <li>
        <IoPerson size={40} onClick={()=>props.setScreen('candidates')}/>
      </li>
      </div> 
      <div className=" flex justify-center mx-3 my-8 p-1 font-sans text-xl font-bold  bg-white rounded-lg">
      <li>
        <IoPencil size={40} onClick={()=>props.setScreen('interviews')}/>
      </li>
      </div> 
    </ul>
    </div>
    </>
  )
}