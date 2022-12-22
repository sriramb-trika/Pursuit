import React from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile () {

  const [cookies, setCookie] = useCookies(['token']);
  let navigate = useNavigate();
  const handleLogOut=(e)=>{
    e.preventDefault()
    console.log(cookies['token'])
      axios.post(`${process.env.REACT_APP_PURSUIT_URL}/users/logOut`,{},{
        headers: {'x-access-token': cookies['token'] }
      }).then(response=>{
        if(response?.data?.data.accessToken){
          navigate("/")
        }
      })
  }

  return (
    <ul className=" border  rounded-lg  bg-neutral-300 absolute top-20 right-2 text-base font-medium p-4">
          <li>
       {cookies['userType']==='1' ? "Recruiter" : "Panelist"}
        </li>
          {/* <li >
            Edit profile
          </li> */}
          
          <li onClick={(e)=>{handleLogOut(e)}}>
            Logout
          </li>
        </ul>
  )
}