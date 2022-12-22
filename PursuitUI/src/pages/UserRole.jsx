import React  from "react";
import { useCookies } from "react-cookie";
import RecruiterPages from "./RecruiterPages";
import PanelistPages from "./panelistPages";

export default function UserRoles () {
  const[cookies, setCookie]=useCookies()

  const userType = (cookies['userType']);


  return ( 
    <>
    {userType === '1' ?
    <RecruiterPages/>
  : <PanelistPages/>}
</>
  )  
} 