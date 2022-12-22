import React , { useState} from "react";
import { IoEye, IoEyeOff, IoLockClosed, IoMailOpen } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function Login (props) {
  
  const [credentials , setCredentials] = useState({email :'', password:''})
  const [showPass , setShowPass] = useState(false);
  const [cookies, setCookie] = useCookies();
  let {email , password} = credentials ;
  let navigate = useNavigate();

  const handleChange=(event )=>{
    setCredentials({ ...credentials, [event.currentTarget.name]: event.currentTarget.value });
  }

  const handlelogin =  async (e) =>{
    e.preventDefault();
    console.log(process.env.REACT_APP_PURSUIT_URL)
   const res= await  axios.post(`${process.env.REACT_APP_PURSUIT_URL}/users/login`,
     {email : credentials.email,
    password : credentials.password})
.then(response=>{
  return response
})
console.log(res)
if(res.data.token){
  setCookie("token" , res.data.token)
  setCookie("userId" ,res.data.data._id )
  setCookie("userType" , res.data.data.userType)
  navigate("/userRoles");
}
    
}

  return (
     <form className=" shadow-2xl rounded-3xl w-1/3 p-5 my-5 mx-10 bg-neutral-100">
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
      type={ showPass ? "text": "password"}
      name='password'
      value={password}
      onChange={handleChange}
      placeholder="Password"
      ></input>
      {
        showPass ?
        <IoEyeOff size={30}  color={'orange'} onClick={()=>setShowPass(false)}/> :
        <IoEye size={30}  color={'orange'} onClick={()=>setShowPass(true)}/>
      }
      </div>
      <div className=" flex justify-center">
        <button className=" bg-orange-200 border border-orange-400 p-4 rounded-lg my-8 text-base font-medium"
        onClick={(e)=>{handlelogin(e)}}> Login </button>
      </div>
      <div className=" flex justify-center">
       <p className=" text-sm text-neutral-400 underline " onClick={()=>{props.setSignUp(true)}}>Go Back to signUp</p>
      </div>
      
      </form>
  )
}