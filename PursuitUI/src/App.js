import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";


import Home from './pages/Home';
import UserRoles from './pages/UserRole';
// import Interviews from './pages/Recruiter/interviews';
// import Candidates from './pages/Recruiter/Candidates';
// import Panelists from './pages/Recruiter/panelists';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path = "/userRoles" element={<UserRoles/>} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
