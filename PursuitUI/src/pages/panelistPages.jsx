import React, { useState } from "react";
import AddFeedback from "../components/Panelist/AddFeedBack";
import InterviewForPanelists from "../components/Panelist/InterviewsForPanelist";

export default function PanelistPages () {
  const[addFeedBack , setAddFeedBack] = useState(false);

  return (
    <>
    {console.log(addFeedBack)}
    <div className= ' relative'>
      <div className={addFeedBack ? ' flex opacity-5':'flex'}>
      <InterviewForPanelists  setAddFeedBack={setAddFeedBack}/>
      </div>
      {addFeedBack ? 
      <div className=" absolute top-0 left-1/3   ">
        <AddFeedback setAddFeedBack={setAddFeedBack}/>
        </div>: null}
      </div>
    </>

  )  
}