import React , {useState}  from "react";
import ManWorking from '../images/laptop.jpg'
import Profile from '../images/seeprofile.webp';
import SignUp from "../components/signUp";
import Login from "../components/login";

export default function Home () {

  const [signUp , setSignUp] = useState(true);

  return (
    <>
     {/* bg-gradient-to-r from-orange-300 to-red-400  */}
    <div className=" h-screen flex justify-center px-10 ">

    <div className=" w-1/3  my-40 mx-10 p-4 border border-r-neutral-300 border-white">
    <div className=" flex mb-4 space-x-3 ">
    <img src={ManWorking} width={300} height={300}  alt='' className='float-left rounded-2xl shadow-2xl'/>
   <p className=' text-center pt-20 text-2xl font-bold text-neutral-500'>
    Staffing solution and a platform for the recruiters to 
    keep track of the end to end flow for a candidates recruitment process</p>
    </div>
    <div className=" flex space-x-3 ">
    <p className=' text-center pt-20 text-2xl font-bold  text-neutral-500'>
    Collecting interview feedback from the panelists 
    Capturing candidate profile details and performance details</p>
    <img src={Profile} width={300} height={300}  alt='' className='float-left rounded-2xl shadow-2xl'/>
   
    </div>
    </div>
   {signUp ?  <SignUp setSignUp={setSignUp}/> : <Login setSignUp={setSignUp}/>}

    </div>
    </>
  )
}