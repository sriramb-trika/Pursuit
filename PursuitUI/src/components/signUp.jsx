import React , {useState } from "react";
import { IoEyeOff, IoLockClosed, IoMailOpen, IoPersonCircleOutline } from "react-icons/io5";
import validator from "validator";
import axios from "axios";
require('dotenv').config()

export default function SignUp (props) {
  const [checkPass , setCheckPass] = useState();
  const [passMsg , setPassMsg] = useState('');
  const strongPass = ' mx-44  text-green-500 font-bold text-xl';
  const weakPass = ' mx-44  text-red-500 font-bold text-xl'
  const validatePass = (value) =>{
    if(value){
      if (validator.isStrongPassword(value, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })) {
        setCheckPass(true)
        setPassMsg('Password is strong')
      } else {
        setCheckPass(false)
        setPassMsg('Password is not strong')
      }
    }
    else{
      setPassMsg('')
    }
  }

  const [credentials , setCredentials] = useState({name:'' , email :'', password:''  })

  let {name , email , password} = credentials ;

  const handleChange=(event )=>{
    event.preventDefault()
    setCredentials({ ...credentials, [event.currentTarget.name]: event.currentTarget.value });
  }

  const handleSignUp =  async (e) =>{
    e.preventDefault();
   const res= await  axios.post(`${process.env.PIRSUIT_URL}/users/userSignup`,
     {name: credentials.name,
      email : credentials.email,
    password : credentials.password,
  userType:1})
.then(response=>{
  return response
})
if(res.data.data ){
  props.setSignUp(false)
}
    
} 
  

  
  return (
     <form className=" shadow-2xl rounded-3xl w-1/3  my-40 mx-10 bg-neutral-100 py-2">
      <div className=" text-4xl font-extrabold= m-10 text-center">Sign Up</div>
      <div className=" flex justify-start space-x-3 rounded-xl shadow-2xl w-4/5 h-16 mx-16 my-12 bg-white px-2">
      <IoPersonCircleOutline size={60} color={'orange'} />
      <input className=" border-none bg-white focus:outline-none text-lg "
      type="text"
      name="name"
      value={name}
      onChange={(e)=>handleChange(e)}
      placeholder="Name"></input>
      </div>
      <div className=" flex justify-start space-x-3 rounded-3xl shadow-2xl w-4/5 h-16 mx-16 my-12 bg-white px-2">
      <IoMailOpen size={60} color={'orange'} />
      <input className=" border-none bg-white focus:outline-none text-lg "
      type="text"
      name="email"
      value={email}
      onChange={(e)=>handleChange(e)}
      placeholder="Email"></input>
      </div>
      <div className=" flex justify-start space-x-3 rounded-3xl shadow-2xl w-4/5 h-16 mx-16 mt-12 bg-white px-2 align-middle items-center">
      <IoLockClosed size={60} color={'orange'}/>
      <input className=" border-none bg-white focus:outline-none text-lg  w-80"
      type="password"
      name="password"
      value={password}
      placeholder="Password"
      onChange={(e)=>{
        validatePass(e.target.value);
      handleChange(e)}}
      ></input>
      <IoEyeOff size={30}  color={'orange'}/>
      </div>
      <div className=" flex justify-center mx-10 my-5">
        <p className=" text-sm text-neutral-400">
        Your password must have minimum 8 characters, atleast one Caps , one number , one specialcharacter</p></div>
      
      {passMsg ? <div className={checkPass ? strongPass : weakPass }>
      <h1>{passMsg}</h1>
      </div> : null}
      <div className=" flex justify-center mb-2">
        <button className=" bg-orange-200 border border-orange-400 rounded-lg mt-5 p-3 "
        onClick={(event)=>{handleSignUp(event)}}>
          Sign Up
        </button>
      </div>
      <div className=" flex justify-center">
        <p>Already have an account ?</p> <p className=" underline" onClick={()=>{props.setSignUp(false)}}>Login</p>
      </div>
      </form>
  )
}