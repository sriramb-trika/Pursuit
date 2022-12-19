import React, { useState } from "react";
import { IoAdd, IoClose } from "react-icons/io5";

export default function NewUser(props) {

  const [skills, setSkills] = useState(
    {
      java: 0
      , javascript: 0
      , python: 0
      , sql: 0
      , react: 0
      , reactNative: 0
      , mongo: 0
      , java1: 0
      , javascript1: 0
      , python1: 0
      , sql1: 0
      , react1: 0
      , reactNative1: 0
      , mongo1: 0
    })

  return (

    <div className=" border  border-neutral-300 rounded-lg bg-white p-10  ">
      <form >
        <header className=" flex justify-between text-lg font-medium text-left mb-10">
          <p>Add New User</p>
          <IoClose size={20} onClick={() => { props.setShowModal(false) }} />
        </header>
        <div className=" mb-5">
          <div className=" mb-5">
            <label >Email</label>
          </div>
          <div className=" border border-neutral-300 rounded-lg mb-5 h-10 p-2">
            <input type="email" className=" focus:outline-none" placeholder=" enter email"></input>
          </div>
        </div>
        <div className=" flex justify-between space-x-3 ">
          <div className=" mb-5">
            <label>FirstName</label>
            <div className=" border border-neutral-300 rounded-lg  h-10 p-2">
              <input type="text" className=" focus:outline-none"></input>
            </div>
          </div>
          <div className=" mb-5">
            <label>LastName</label>
            <div className=" border border-neutral-300 rounded-lg  h-10 p-2 ">
              <input type="text" className=" focus:outline-none"></input>
            </div>
          </div>
        </div>
        <div className=" flex justify-between space-x-3">
          <div className=" mb-5">
            <label>Role</label>
            <div  className=" border border-neutral-300 rounded-lg  h-10 p-2">
              <select className=" focus:outline-none">
                <option value={'Candidate'}>Candidate</option>
                <option value={'Panelists'}>Panelist</option>
              </select>
            </div>
          </div>
          <div className=" mb-5">
            <label>Phone</label>
            <div  className=" border border-neutral-300 rounded-lg  h-10 p-2">
              <input type={"text"}
                className="focus:outline-none" />
            </div>
          </div>
        </div>
        <div className=" mb-5 flex justify-end  space-x-20">
          <label> Add Skills</label>
          <ul className=" w-96 h-20 overflow-y-auto   border border-neutral-300 rounded-lg  flex  p-4 flex-wrap flex-row gap-2" >
            {Object.keys(skills).map(skill => {
              return (
                <>
                  {skills[skill] === 1 ? <li className=" border border-blue-500 bg-blue-300 flex  align-middle rounded-lg p-1">
                    <p>{skill}</p>
                    <IoClose size={20} color={'blue'}
                      onClick={() => {
                        let updateObj = {};
                        updateObj[skill] = 0
                        console.log(updateObj)
                        setSkills(prevState => ({
                          ...prevState, ...updateObj
                        }))
                      }}
                    />
                  </li> : null}
                </>
              )
            })}
          </ul>

        </div>
        <div className=" mb-5 flex  justify-end space-x-3">
          <ul className=" w-96 h-20 overflow-y-auto  border border-neutral-300 rounded-lg  flex  p-4 flex-wrap flex-row gap-2" >
            {Object.keys(skills).map(skill => {

              return (
                <>
                  {skills[skill] === 0 ? <li className=" border border-blue-500 bg-blue-300 flex  align-middle rounded-lg p-1">
                    <p>{skill}</p>
                    <IoAdd onClick={() => {
                      let updateObj = {};
                      updateObj[skill] = 1
                      setSkills(prevState => ({
                        ...prevState, ...updateObj
                      }))
                      console.log(skills)
                    }} size={20} color={'blue'} />
                  </li> : null}
                </>
              )
            })}
          </ul>

        </div>
        <div className=" flex justify-start space-x-5">
          <button className=" bg-neutral-300 p-3 rounded-lg border border-black">Add User</button>
          <button className="  bg-neutral-300 p-3 rounded-lg border border-black">Cancel</button>
        </div>
      </form>
    </div>

  )
}