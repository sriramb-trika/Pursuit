import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import SearchableDropdown from  "../SearchableDropDown/SearchableDropdown";

export default function AddCandidateDetails(props) {

  const [positions, setPositions] = useState()
  const [value, setValue] = useState('');
    const [candidateDetails , setCandidateDetails] = useState({
      firstName : '',
      lastName: "",
      email: "",
      phoneNumber: "",
      dob: "",
      address: "",
      yearsOfExperience: "",
      qualification: "",
      noticePeriod: "",
      linkedInAccount: "",
      preferredLocation: "",
      referredBy: "",
      referralEmail: ""
    })
    const [notice , setNotice] = useState(false);
    const [gender , setGender] = useState(false);
    const [cookies, setCookie] = useCookies();

    const {firstName , lastName , email , phoneNumber , dob , address , yearsOfExperience , 
      qualification ,  noticePeriod ,linkedInAccount , preferredLocation , referredBy , referralEmail }= candidateDetails

  async function getPositions (){
    return    axios.get(`${process.env.REACT_APP_PURSUIT_URL}/positions/listAllPositionsWithSearch/ `,{
      headers: {'x-access-token': cookies['token'] },
      params:{
        searchText : ''
      }
    }).then(
      response=>{
        console.log(response)
       setPositions(response.data.data)
      }
    )
  }

  const handleChange=(event )=>{
    event.preventDefault()
    setCandidateDetails({ ...candidateDetails, [event.currentTarget.name]: event.currentTarget.value });
  }

  const handleSubmit =async (e) =>{
    e.preventDefault(); 
    await axios.post(`${process.env.REACT_APP_PURSUIT_URL}/candidates/addCandidateProfile`,
    {
      firstName: firstName,
      lastName : lastName,
      email : email,
      phoneNumber : phoneNumber,
      gender : gender ,
      dob : dob,
      address : address,
      ...(notice ? {immediateJoinee : false} : {immediateJoinee : false}),
      yearsOfExperience : yearsOfExperience,
      qualification : qualification,
      noticePeriod : noticePeriod,
      linkedInAccount,
      preferredLocation ,
      referredBy,
      referralEmail,
      ...(value ? {positionConsidered : positions?.find(item=>(item.positionText===value))?._id}: '')
    }
    ,{
      headers: {'x-access-token': cookies['token']},
    }).then(response =>{
      if(response.data.data){
        props.setAddUser(false)
        props.setScreen('candidates')
      }
    })
  }




    useEffect( ()=>{
      getPositions();
    },[])
    

  return (
    <>
    
    <div className=" w-full px-4 border border-neutral-300 h-screen overflow-y-scroll ">
  
      <form className=" p-3  " >
        {/* <header className=" flex justify-between text-lg font-medium text-left ">
          <p>Add New User</p>
          <IoClose size={20} onClick={() => { props.setShowModal(false) }} />
        </header> */}
        <div className=" mb-5 ">
          <div className=" mb-5">
            <label >Email</label>
            
            
          </div>
          <div className=" border border-neutral-300 rounded-lg mb-5 h-10 p-2">
            <input type="email"
            name="email"
            value={email}
            onChange={(e)=>handleChange(e)}
             className=" focus:outline-none" placeholder=" enter email"></input>
          </div>
        </div>
        <div className="  mb-5">
            <label>FirstName</label>
            <div className=" border border-neutral-300 rounded-lg  h-10 p-2">
              <input type="text" 
              name="firstName"
              value={firstName}
              onChange={(e)=>handleChange(e)}
              className="w-28 focus:outline-none"></input>
            </div>
          
          </div>

          <div className="mb-5">
            <label>LastName</label>
            <div className=" border border-neutral-300 rounded-lg  h-10 p-2 ">
              <input type="text" 
              name="lastName"
              value={lastName}
              onChange={(e)=>handleChange(e)}className="  focus:outline-none"></input>
            </div>
          </div>
          <div className=" mb-5 ">
            <label >Phone Number</label>
          <div className="  border border-neutral-300 rounded-lg mb-5 h-10 p-2">
            <input type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e)=>handleChange(e)} className=" w-full focus:outline-none" ></input>
          </div>
        </div>
         <div className=" flex justify-between  space-x-5 align-top place-content-center">
         <div className="w-1/3   mb-5">
            <label>Date of Birth</label>
            <div className=" border border-neutral-300 rounded-lg  h-10 p-2">
              <input type="date" 
              name="dob"
              value={dob}
              onChange={(e)=>handleChange(e)}className=" focus:outline-none"></input>
            </div>
          
          </div>
          
          <div className="w-1/3   mb-5 flex align-middle justify-center space-x-3">
            <div className="flex justify-center align-top place-items-center place-content-center space-x-4">
              
              <p>Male</p>
              <input type="radio" onChange={()=>{setGender("Male")}}/>
              </div>
              <div className=" flex justify-center align-top place-items-center place-content-center space-x-4 ">
              <label onChange={()=>{setGender("Male")}}>Female</label>
              <input type="radio"  />
             
              </div>
            
          </div>
        </div>
        <div className="  mb-5">
            <label>Qualification</label>
            <div className="  border border-neutral-300 rounded-lg  h-10 p-2">
              <input type="text" 
              name="qualification"
              value={qualification}
              onChange={(e)=>handleChange(e)}className=" w-20 focus:outline-none"></input>
            </div>
          
          </div>
        <div className=" mb-5 ">
            <label >Address</label>
          <div className="  border border-neutral-300 rounded-lg mb-5 h-10 p-2">
            <input type="text" 
            name="address"
            value={address}
            onChange={(e)=>handleChange(e)}className=" w-full focus:outline-none" ></input>
          </div>
        </div>
        <div className=" mb-5 ">
            <label >LinkedIn Profile</label>
          <div className="  border border-neutral-300 rounded-lg mb-5 h-10 p-2">
            <input type="text"
            name="linkedInAccount"
            value={linkedInAccount}
            onChange={(e)=>handleChange(e)} className=" w-full focus:outline-none" ></input>
          </div>
        </div>
          <div className=" flex justify-start space-x-20 align-top">
         <div className="  mb-5">
            <label>Years of Experience</label>
            <div className=" w-24 border border-neutral-300 rounded-lg  h-10 p-2">
              <input type="text"
              name="yearsOfExperience"
              value={yearsOfExperience}
              onChange={(e)=>handleChange(e)} className=" w-20 focus:outline-none"></input>
            </div>
          
          </div>
          <div className="w-1/3   mb-5 flex align-middle justify-center space-x-3">
            <div className="flex justify-center align-top place-items-center place-content-center space-x-4">
              
              <p>Immediate Joinee</p>
              <input type="checkbox" disabled={notice} onChange={()=>setNotice(false)}/>
              </div>
              <div className=" flex justify-center align-top place-items-center place-content-center space-x-4 ">
              <label>Notice</label>
              <input type="checkbox"  checked={notice===true} onChange={()=>setNotice(!notice)}/>
             
              </div>
            
          </div>
        </div>
        { notice ?
        <div className=" flex justify-start space-x-12 my-4" >
        <label>Notice period</label>
        <div className=" border border-neutral-300 rounded-lg  h-10 p-2">
              <input type="text" 
               name="noticePeriod"
               value={noticePeriod}
               className=" focus:outline-none"></input>
            </div>
      </div> : null}
         <div className=" mb-5 ">
            <label >Referred by</label>
          <div className="  border border-neutral-300 rounded-lg mb-5 h-10 p-2">
            <input type="text"
            name="referredBy"
            value={referredBy}
            onChange={(e)=>handleChange(e)} className=" w-full focus:outline-none" ></input>
          </div>
        </div>
        <div className=" mb-5 ">
            <label >Referred email</label>
          <div className="  border border-neutral-300 rounded-lg mb-5 h-10 p-2">
            <input type="text"
            name="referralEmail"
            value={referralEmail}
            onChange={(e)=>handleChange(e)} className=" w-full focus:outline-none" ></input>
          </div>
        
         </div>
         <div className=" mb-5 ">
            <label >Loaction</label>
          <div className="  border border-neutral-300 rounded-lg mb-5 h-10 p-2">
            <input type="text" 
            name="preferredLocation"
            value={preferredLocation}
            onChange={(e)=>handleChange(e)}className=" w-full focus:outline-none" ></input>
          </div>
        </div>
        {positions ? <div className=" mb-5 flex justify-start space-x-6  relative" >
            <label >Position</label>
            <div >
            <SearchableDropdown
        options={positions}
        label="positionText"
        id="_id"
        selectedVal={value}
        handleChange={(val) => setValue(val)}
      />
    </div>
   
        </div> : null}
        <div className=" flex justify-start space-x-5 my-4"> 
        <p>Upload resume</p><input type="file"/>
        </div>
        

         <div className=" flex justify-between ">
        
         <button  onClick={() => { props.setAddUser(false) }}
         className ="  text-xl border border-blue-500 p-2 rounded-lg bg-blue-300">close</button>
           <button onClick={(e)=>handleSubmit(e)}  
         className ="  text-xl border border-blue-500 p-2 rounded-lg bg-blue-300">save</button></div>
        
       
      </form>
      </div>
      
      </>

  )
}