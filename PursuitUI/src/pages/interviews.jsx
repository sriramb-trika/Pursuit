import React , {useState} from "react";
import Dashboard from "./dashboard";
import Navbar from '../components/navbar';
import Menu from "../components/menu";
import NewUser from "../components/newUser";

export default function Interviews () {

  const [showNav , setShowNav] = useState(false);
  const [showModal , setShowModal] = useState(false);

  return ( 
    <>
    <div className = "relative">
    {showModal ?
     <div className=" fixed shadow-2xl w-full h-screen flex justify-center align-middle place-content-center items-center bg-neutral-300/50  ">
    <NewUser setShowModal={setShowModal}/> 
    </div>
    : null}
    { showNav?
      <div className=" fixed ">
         <Menu setShowNav={setShowNav}/>
        </div>
    : null}
    
  
    <div className={ "flex"}>
     <Navbar setShowNav={setShowNav}/>
     <Dashboard  showModal={showModal} setShowModal={setShowModal}/></div>
     
   
     </div>
    
    
     
    </>
  )  
} 