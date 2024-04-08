import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Component/Login"
import ApplicantForm from "./Component/ApplicantForm"
import Signup from "./Component/SignUp"
import Acknolege from "./Component/Ack"
import Job from "./Component/job"
import AppQues from "./Component/AppQues"
import Review from "./Component/Review"
import Dashboard from "./Component/Dashboard/Dashboard"
import ManageUsers from "./Component/Dashboard/Manageusers"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Applicant" element={<ApplicantForm />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Job" element={<Job />} />
        <Route path="/Ack" element={<Acknolege />} />
        <Route path="/Appque" element={<AppQues />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/manage" element={<ManageUsers />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App
