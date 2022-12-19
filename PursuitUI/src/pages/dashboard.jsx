import React from "react";
import Piechart from "../components/pieChart";
import BarChart from "../components/barChart";

export default function Dashboard (props) {
  return (
    <>
    <div className={" w-full " }>
      <header className=" flex justify-center border border-white border-b-neutral-300  p-8 text-xl font-bold">
      Pursuit
      </header>
    <div className="  flex justify-between space-x-8 my-10 mx-5 place-items-center align-middle">
      <BarChart/>
      <Piechart/>
    </div>
     <div className=" border border-neutral-300 rounded-xl  mx-4"> 
     <ul > 

<li className=" border border-white border-b-neutral-300">
<ul className=" flex justify-between space-x-3 text-lg font-bold align-middle text-center p-4">
  <li className=" w-1/5">FirstName</li>
  <li className=" w-1/5" >LastName</li>
  <li className=" w-1/5">Experience</li>
  <li className=" w-1/5">Location</li>
  <li className=" w-1/5">Status</li>
</ul>
</li>

<li   >
<ul className=" flex justify-between space-x-3 text-base font-medium align-middle text-center p-4">
  <li className=" w-1/5">Pallavi</li>
  <li className=" w-1/5">S</li>
  <li className=" w-1/5">3.5 </li>
  <li className=" w-1/5">Bangalore</li>
  <li className=" w-1/5">Selected</li>
</ul>
</li>

</ul>
     </div>
    <div className=" flex justify-center align-middle ">
    <button  className=" p-3 bg-neutral-300 text-black font-medium text-base m-10 border border-black rounded-lg"
    onClick={()=>{props.setShowModal(true)}}>Add User</button>
    </div>
    </div>
    </>
  )
}