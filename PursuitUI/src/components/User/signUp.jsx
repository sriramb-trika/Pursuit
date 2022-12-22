import React , {useState } from "react";
import { IoEye, IoEyeOff, IoLockClosed, IoMailOpen, IoPersonCircleOutline } from "react-icons/io5";
import validator from "validator";
import axios from "axios";
import bcrypt from 'bcryptjs';

export default function SignUp (props) {
  const [checkPass , setCheckPass] = useState();
  const [passMsg , setPassMsg] = useState('');
  const strongPass = ' mx-44  text-green-500 font-bold text-xl';
  const weakPass = ' mx-44  text-red-500 font-bold text-xl';

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

  const gnearateHash =(password)=>{
 const salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
    return hash ;
  }

  const [showPass , setShowPass] = useState(false);
  const [credentials , setCredentials] = useState({name:'' , email :'', password:''  })
  const [userType, setUserType] = useState();

  let {name , email , password} = credentials ;

  const handleChange=(event )=>{
    event.preventDefault()
    setCredentials({ ...credentials, [event.currentTarget.name]: event.currentTarget.value });
  }

  const handleSignUp =  async (e) =>{
    e.preventDefault();
   const res= await  axios.post(`${process.env.REACT_APP_PIRSUIT_URL}/users/userSignup`,
     {name: credentials.name,
      email : credentials.email,
    password : gnearateHash(credentials.password),
  userType:userType})
.then(response=>{
  return response
})
if(res.data.data ){
  props.setSignUp(false)
}
    
} 
  

  
  return (
     <form className=" shadow-2xl rounded-3xl w-1/3  my-5 mx-10 bg-neutral-100 py-2">
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
      type={ showPass ? "text": "password"}
      name="password"
      value={password}
      placeholder="Password"
      onChange={(e)=>{
        validatePass(e.target.value);
      handleChange(e)}}
      ></input>
      {
        showPass ?
        <IoEyeOff size={30}  color={'orange'} onClick={()=>setShowPass(false)}/> :
        <IoEye size={30}  color={'orange'} onClick={()=>setShowPass(true)}/>
      }
      </div>
      <div className=" flex justify-center mx-10 my-5">
        <p className=" text-sm text-neutral-400">
        Your password must have minimum 8 characters, atleast one Caps , one number , one specialcharacter</p></div>
      
      {passMsg ? <div className={checkPass ? strongPass : weakPass }>
      <h1>{passMsg}</h1>
      </div> : null}

      <div className=" flex justify-center space-x-2 m-3">
      <div 
        className={userType===1 ? " border border-orange-500 bg-orange-500 p-2 font-medium  text-white":
        " border border-orange-500 bg-neutral-200 p-2 font-medium " } onClick={()=>setUserType(1)}
        >Recruiter</div>
        <div
         className={userType===2 ?  " border border-orange-500 bg-orange-500 p-2 font-medium  text-white"  : 
          " border border-orange-500 bg-neutral-200 p-2 font-medium " }onClick={()=>setUserType(2)}
         >Panelist</div>
      </div>
      <div className=" flex justify-center mb-2">
        <button className=" bg-orange-200 border border-orange-400 rounded-lg mt-5 p-3 "
        onClick={(event)=>{handleSignUp(event)}}>
          Sign Up
        </button>
      </div>
      <div className=" flex justify-center my-4">
        <p>Already have an account ?</p> <p className=" underline" onClick={()=>{props.setSignUp(false)}}>Login</p>
      </div>
      </form>
  )
}