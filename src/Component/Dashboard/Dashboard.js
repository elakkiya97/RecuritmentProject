import React, { useState, useEffect } from "react"
import "../css/Dashboard.css"
import axios from "axios"
import customLogo from "../../Component/mainlogo.png"

import { NavLink } from "react-router-dom"

function App() {
  const [resumeData, setResumeData] = useState([])
  

  const API_BASE_URL = "http://localhost:5042"

  const [allResumeCount, setAllResumeCount] = useState(0)
  const [newResumeCount, setnewResumeCount] = useState(0)
  const [approveResumeCount, setacceptResumeCount] = useState(0)
  const [rejctResumeCount, setrejectResumeCount] = useState(0)

  useEffect(() => {
    fetchResumeData()
    fetchResumeData1()
    fetchResumeData3()
    fetchResumeData4()
    fetchResumeData6()
  }, [])

  const fetchResumeData3 = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/User/APROVE`)
      setResumeData(response.data.$values)
   

    } catch (error) {
      console.error("Error fetching resume data:", error)
    }
  }

  const fetchResumeData6 = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/User/user`)

      setAllResumeCount(response.data.$values.length)
    
      
    } catch (error) {
      console.error("Error fetching resume data (fetchResumeData1):", error)
    }
  }

  const fetchResumeData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/User/APROVE`)

      setacceptResumeCount(response.data.$values.length)
    
    } catch (error) {
      console.error("Error fetching resume data (fetchResumeData1):", error)
    }
  }
  const fetchResumeData1 = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/User/NEW`)

      setnewResumeCount(response.data.$values.length)
    
    } catch (error) {
      console.error("Error fetching resume data (fetchResumeData1):", error)
    }
  }
  const fetchResumeData4 = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/User/REJECT`)

      setrejectResumeCount(response.data.$values.length)
     
    } catch (error) {
      console.error("Error fetching resume data (fetchResumeData1):", error)
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
          <i className="bx bxs-smile" />
          <span className="text">JobAdmin</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="/dashboard">
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
                <li>Home</li>
              </ul>
            </div>
          </div>
          <ul className="box-info">
            <li>
              <span className="text">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "40px" }}
                >
                  <h2>{allResumeCount}</h2>
                  <p>All Resume</p>
                </div>
              </span>
            </li>
            <li>
              <span className="text">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "40px" }}
                >
                  <h3>{newResumeCount}</h3>
                  <p>New Resume</p>
                </div>
              </span>
            </li>
            <li>
              <span className="text">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "40px" }}
                >
                  <h3>{approveResumeCount}</h3>
                  <p>Approved Resume</p>
                </div>
              </span>
            </li>
            <li>
              <span className="text">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "40px" }}
                >
                  <h3>{rejctResumeCount}</h3>
                  <p>Rejected Resume</p>
                </div>
              </span>
            </li>
          </ul>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>categories</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {resumeData
                    .slice(Math.max(resumeData.length - 10, 0))
                    .map((resume) => (
                      <tr key={resume.id}>
                        <td>{resume.id}</td>
                        <td>
                          {resume.firstName} {resume.lastName}
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

export default App
