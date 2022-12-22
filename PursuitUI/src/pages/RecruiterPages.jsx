  import React, { useState } from "react";
  import Navbar from "../components/Recruiter/navbar";
  import Dashboard from "../components/Recruiter/dashboard";
  import AddCandidateDetails from "../components/Recruiter/AddCandidateDetails";
  import SeeFeedback from "../components/Recruiter/seeFeedback";
  import Candidates from "../components/Recruiter/Candidates";
import ScheduleInterview from "../components/Recruiter/scheduleInterview";
import InterviewForRecruiters from "../components/Recruiter/InterviewsForRecruiters";

  export default function RecruiterPages(){
    const [screen , setScreen] = useState("dashboard");
    const [addUser , setAddUser] = useState(false);
    const [seeFeedBack , setSeeFeedBack] = useState(false);
    const [schedule , setSchedule] = useState(false);


    return (
      <>
    {screen==='dashboard' ?  <div className= ' relative'>
      <div className={addUser ? ' flex opacity-5':'flex'}>
      <Navbar setScreen={setScreen}/>
      <Dashboard setAddUser={setAddUser}/> 
      </div>
      {addUser ? 
      <div className=" absolute top-0 left-1/3  "><AddCandidateDetails 
      setAddUser={setAddUser} setScreen={setScreen}/>
      </div>: null}
      </div>
      : null}
    
     {screen==='interviews' ? <div className= ' relative'>
      <div className={seeFeedBack ? ' flex opacity-5':'flex'}>
      <Navbar setScreen={setScreen}/>
      <InterviewForRecruiters setSeeFeedBack={setSeeFeedBack} />
      </div>
      {seeFeedBack ? 
      <div className=" absolute top-0 left-1/3  "><SeeFeedback 
      setSeeFeedBack={setSeeFeedBack}/></div>: null}
      </div> : null}

      {screen==='candidates' ? <div className= ' relative'>
      <div className={schedule ? ' flex opacity-5':'flex'}>
      <Navbar setScreen={setScreen}/>
      <Candidates setSchedule={setSchedule} />
      </div>
      {schedule ? 
      <div className=" absolute top-0 left-1/3  "><ScheduleInterview 
      setSchedule={setSchedule}
      setScreen={setScreen}
      /></div>: null}
      </div> : null}
      
</>
    
    )
  }