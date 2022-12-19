import React from "react";
import { Link } from "react-router-dom";
import { IoHome, IoMenu, IoPencil, IoPerson} from 'react-icons/io5'

export default function Navbar (props) {

  return (
    <>
    
    <div className=" w-20 bg-neutral-300  ">
    <ul className="  h-screen  ">
    <div className=" flex justify-center mx-3 mt-8 mb-4 p-1 font-sans text-xl font-bold  bg-white rounded-lg "> <li>
        <IoMenu size={40} onClick={()=>props.setShowNav(true)}/>
      </li>
     </div>
     <div className=" flex justify-center mx-3 my-8 p-1 font-sans text-xl font-bold  bg-white rounded-lg ">
     <Link to={'/interviews'}> <li>
        <IoHome size={40}/>
      </li>
      </Link>
     </div>
     <div className=" flex justify-center mx-3 my-8 p-1 font-sans text-xl font-bold  bg-white rounded-lg">
      <Link to ={'/candidates'}>
      <li>
        <IoPerson size={40}/>
      </li>
      </Link>
      </div> <div className=" flex justify-center mx-3 my-8 p-1  font-sans text-xl font-bold  bg-white rounded-lg">
      <Link to ={'/panelists'}>
      <li>
        <IoPencil size={40}/>
      </li>
      </Link>
      </div>
    </ul>
    </div>
    </>
  )
}