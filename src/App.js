import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Component/Login';
import ApplicantForm from './Component/ApplicantForm';
import Signup from './Component/SignUp';

import Skill from './Component/Skill';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/Applicant" element={<ApplicantForm />} />
      <Route path="/Signup" element={<Signup />} />
     
      <Route path="/Skill" element={<Skill />} />
      
       
     
    </Routes>
  </BrowserRouter>
  );
}

export default App;
