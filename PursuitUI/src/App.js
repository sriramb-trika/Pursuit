import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import Home from './pages/Home';
import Dashboard from './pages/dashboard';
import Interviews from './pages/interviews';
import Candidates from './pages/Candidates';
import Panelists from './pages/panelists';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path = "/dashboard" element={<Dashboard/>} />
          <Route path = "/interviews" element={<Interviews/>} />
          <Route path = "/candidates" element={<Candidates/>} />
          <Route path = "/panelists" element={<Panelists/>} /> 
        </Routes>
      </Router>
    </>

  );
}

export default App;
