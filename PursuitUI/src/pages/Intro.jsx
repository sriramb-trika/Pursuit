import React  from 'react';
import {  IoLogoFacebook , IoLogoGoogle , IoLogoLinkedin} from 'react-icons/io5';
import ManWorking from '../images/laptop.jpg';
import Interview from '../images/interview.webp';
import Profile from '../images/seeprofile.webp';
import Onboard from '../images/onboarding.webp';
import TrikaIcon from '../images/trikaIcon.jpeg';
import Trika from '../images/trika.jpeg';
import Pursuit from '../images/pursuit.jpg';
import { Link } from 'react-router-dom';

function Home() {
  
  return (
    <>
    <header className=' w-full bg-gradient-to-r from-orange-300 to-red-400 '>
      <div className=' flex  justify-around items-center py-10'>
        <div>
        <img src={TrikaIcon} width={100} height={100}  alt='' className='rounded-2xl shadow-2xl'/>

        </div>
        <div className=' font-extrabold text-5xl text-white'>
        <div className=' flex justify-between items-baseline align-bottom'>
          {/* <p className=' p-4'>Pursuit</p> */}
          <img src={Pursuit} width={200} height={100}  alt='' className='rounded-2xl shadow-2xl'/>
            </div>
            <p className=' text-white text-xl font-sm pl-4 mt-5 font-serif'>... in search of talent</p>
            
            </div>
          <div className=' flex justify-between space-x-5 align-middle font-extrabold text-2xl text-white underline-offset-2'>
         <Link to={'/signUp'}> <p className=' p-3 border border-white rounded-lg'> Login</p> </Link>
            <p className=' p-3 border border-white rounded-lg'> SignUp</p>
            
          </div>
      </div>
    </header>
    <body className=' bg-neutral-100 py-10'>
   <div className=' grid grid-cols-3 '>
   <div className=' col-start-2'>
   <img src={ManWorking} width={300} height={300}  alt='' className='float-left rounded-2xl shadow-2xl'/>
   <p className=' text-center pt-20 text-2xl font-bold font-serif text-neutral-500'>
    Staffing solution and a platform for the recruiters to 
    keep track of the end to end flow for a candidates recruitment process</p>
   </div>
   <div className=' col-start-2 mt-20'>
   <img src={Interview} width={300} height={300}  alt=''className='float-right rounded-2xl shadow-2xl'/>
   <p className=' text-center text-2xl font-bold font-serif text-neutral-500 pt-10'>
   Collecting interview feedback from the panelists</p>
   </div>
   <div className=' col-start-2 mt-20'>
   <img src={Profile} width={300} height={300}  alt=''className='float-left rounded-2xl shadow-2xl'/>
   <p className=' text-center text-2xl font-bold font-serif text-neutral-500 pt-10'>
   Capturing candidate profile details and performance details</p>
   </div>
   <div className=' col-start-2 mt-20'>
   <img src={Onboard} width={300} height={300}  alt=''className='float-right rounded-2xl shadow-2xl'/>
   <p className=' text-center text-2xl font-bold font-serif text-neutral-500 pt-10'>
   Displaying various trends to display the recruitment activities</p>
   </div>
   </div>
    </body>

    <footer className='w-full bg-gradient-to-r from-orange-300 to-red-400 '>
    <div className=' flex  justify-around items-center py-10'>
        <div>
        <img src={Trika} width={100} height={100}  alt='' className='float-left rounded-2xl shadow-2xl'/>

        </div>
       
          <div className=' flex justify-between space-x-3 align-middle font-extrabold text-2xl text-white underline-offset-2'>
          <IoLogoGoogle size={40}/>
          <IoLogoFacebook size={40}/>
          <IoLogoLinkedin size={40}/>
            
          </div>
      </div>
    </footer>
    </>
    
  );
}

export default Home;
