import React , { useState} from "react";
import { IoEyeOff, IoLockClosed, IoMailOpen } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login (props) {
  
  const [credentials , setCredentials] = useState({email :'', password:''})

  let {email , password} = credentials ;
  let navigate = useNavigate();

  const handleChange=(event )=>{
    setCredentials({ ...credentials, [event.currentTarget.name]: event.currentTarget.value });
  }

  const handlelogin =  async (e) =>{
    e.preventDefault();
    console.log(process.env.PIRSUIT_URL)
   const res= await  axios.post(`${process.env.PIRSUIT_URL}/users/login`,
     {email : credentials.email,
    password : credentials.password})
.then(response=>{
  return response
})

if(res.data.token){
  navigate("/interviews");
}
    
}

  return (
     <form className=" shadow-2xl rounded-3xl w-1/3 p-5 my-40 mx-10 bg-neutral-100">
      <div className=" text-4xl font-extrabold  m-10 text-center">Login</div>
     
      <div className=" flex justify-start space-x-3 rounded-3xl shadow-2xl w-4/5 h-16 mx-16 my-12 bg-white px-2">
      <IoMailOpen size={60} color={'orange'} />
      <input className=" border-none bg-white focus:outline-none text-lg "
      type="text"
      name='email'
      value={email}
      onChange={handleChange}
      placeholder="Email"></input>
      </div>
      <div className=" flex justify-start space-x-3 rounded-3xl shadow-2xl w-4/5 h-16 mx-16 mt-12 bg-white px-2 align-middle items-center">
      <IoLockClosed size={60} color={'orange'}/>
      <input className=" border-none bg-white focus:outline-none text-lg  w-80"
      type="password"
      name='password'
      value={password}
      onChange={handleChange}
      placeholder="Password"
      ></input>
      <IoEyeOff size={30}  color={'orange'}/>
      </div>
      <div className=" flex justify-center">
        <button className=" bg-orange-200 border border-orange-400 p-4 rounded-lg my-4 text-base font-medium"
        onClick={(e)=>{handlelogin(e)}}> Login </button>
      </div>
      <div className=" flex justify-center">
       <p className=" text-sm text-neutral-400 underline " onClick={()=>{props.setSignUp(true)}}>Go Back to signUp</p>
      </div>
      
      </form>
  )
}