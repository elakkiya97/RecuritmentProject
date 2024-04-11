import { NavLink } from "react-router-dom"
import "../css/Dashboard.css"
import axios from "axios"
import customLogo from "../../Component/mainlogo.png"
import React, { useState, useEffect } from "react"


function RejectResume() {
  const [resumeData, setResumeData] = useState([])

  const API_BASE_URL = "http://recruitmentapi.iykons.com"

  useEffect(() => {
    fetchResumeData4()
  }, [])

  const fetchResumeData4 = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/User/REJECT`)
      setResumeData(response.data.$values)
     
    } catch (error) {
      console.error("Error fetching resume data:", error)
    }
  }

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
      <link
        href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="style.css" />
      <title>JobAdmin</title>
      
      <section id="sidebar">
        <a href="/dashboard" className="brand">
          Dashboard
          <i className="bx bxs-smile" />
          <span className="text">JobAdmin</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="/Dashboard">
              <i className="bx bxs-dashboard" />
              <span className="text">Dashboard</span>
            </a>
          </li>
        </ul>

        <ul className="side-menu">
          <li>
            <NavLink to="/all">
              
              <span className="text">All Resume</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/new">
              
              <span className="text">New Resume</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/accept">
             
              <span className="text">Accept Resume</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/approve">
             
              <span className="text">Approved Resume</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/reject">
             
              <span className="text">Reject Resume</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage">
             
              <span className="text">Manage Users</span>
            </NavLink>
          </li>
        </ul>
      </section>
    
      <section id="content">
      
        <nav>
          <form action="#"></form>

          <a href="/dashboard" className="profile">
            <img src={customLogo} alt="Custom Logo" />
          </a>
        </nav>
      
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>Reject Resumes</li>
              </ul>
            </div>
          </div>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Resumes</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>PhoneNo</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {resumeData.map((resume) => (
                    <tr key={resume.id}>
                      <td>
                        {resume.firstName} {resume.lastName}
                      </td>
                      <td>
                        {resume.applicantDetails
                          ? resume.applicantDetails.phoneNo
                          : "N/A"}
                      </td>
                      <td>
                        {resume.applicantDetails
                          ? resume.applicantDetails.email
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default RejectResume
