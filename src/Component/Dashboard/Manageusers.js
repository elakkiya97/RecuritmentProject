import { NavLink } from "react-router-dom"
import "../css/Dashboard.css"
import axios from "axios"
import customLogo from "../../Component/mainlogo.png"
import React, { useState, useEffect } from "react"

import { Input, Button, Form, Col, Row } from "antd"

function ManageUsers() {
  
  const [languageOptions, setLanguageOptions] = useState({
    skillType: 0,
    skillName: "Tamil",
  })
  const [skillOptions, setSkillOptions] = useState({
    skillType: 2,
    skillName: "Designer",
  })
  const [skillOptions1, setSkillOptions1] = useState({
    skillType: 1,
    skillName: "Music",
  })
  const [departmentOptions, setdepartmentOptions1] = useState({
    departmentID: 0,
    departmentName: "ICT",
  })
  const [positionOptions, setpositionOptions1] = useState({
    positionName: "",
  })

  const [newSkill, setNewSkill] = useState("")
  const [newSkill1, setNewSkill1] = useState("")
  const [newLanguage, setNewLanguage] = useState("")
  const [newDepartment, setNewDepartment] = useState("")
  const [newPosition, setNewposition] = useState("")

  const API_BASE_URL = "http://localhost:5042"

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        await axios.post(
          `${API_BASE_URL}/api/Position`,
          positionOptions
        )
      } catch (error) {
        console.error("Error fetching departments:", error)
      }
    }

    fetchDepartments()
  }, [positionOptions])

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        await axios.post(
          `${API_BASE_URL}/api/Skill/CreateSkill`,
          skillOptions
        )
      } catch (error) {
        console.error("Error fetching departments:", error)
      }
    }

    fetchDepartments()
  }, [skillOptions])

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        await axios.post(
          `${API_BASE_URL}/api/Skill/CreateSkill`,
          skillOptions1
        )
      } catch (error) {
        console.error("Error fetching departments:", error)
      }
    }

    fetchDepartments()
  }, [skillOptions1])

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        await axios.post(
          `${API_BASE_URL}/api/Skill/CreateSkill`,
          languageOptions
        )
      } catch (error) {
        console.error("Error fetching departments:", error)
      }
    }

    fetchDepartments()
  }, [languageOptions])

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        await axios.post(
          `${API_BASE_URL}/api/Department/CreateDepartment`,
          departmentOptions
        )
      } catch (error) {
        console.error("Error fetching departments:", error)
      }
    }

    fetchDepartments()
  }, [departmentOptions])

  const handleposition = () => {
    setpositionOptions1({
      ...positionOptions,
      positionName: newPosition,
    })
    setNewposition("")
  }

  const handleAddSkill = () => {
    setSkillOptions({
      ...skillOptions,
      positionName: newPosition,
    })
    setNewSkill("")
  }

  const handlesoftAddSkill = () => {
    setSkillOptions1({
      ...skillOptions1,
      skillName: newSkill1,
    })
    setNewSkill1("")
  }

  const handlelanguageSkill = () => {
    setLanguageOptions({
      ...languageOptions,
      skillName: newLanguage,
    })
    setNewLanguage("")
  }

  const handledepartment = () => {
    setdepartmentOptions1({
      ...departmentOptions,
      departmentName: newDepartment,
    })
    setNewDepartment("")
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
                <li>Manage Users</li>
              </ul>
            </div>
          </div>
        </main>
        <div style={{ padding: "50px", backgroundColor: "#f0f0f0" }}>
          <h2 style={{ textAlign: "center" }}>Manage Users</h2>
          <form>
            <div style={{ justifyContent: "center" }}>
              <div>
                <Row style={{ marginTop: "80px" }}>
                  <Col span={12}>
                    <Form.Item label="Hard Skill">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                      />
                      <Button
                        onClick={handleAddSkill}
                        style={{ marginLeft: "5px", marginBottom: "10px" }}
                      >
                        Add Hard Skill
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Soft Skill">
                      <Input
                        value={newSkill1}
                        onChange={(e) => setNewSkill1(e.target.value)}
                      />
                      <Button
                        onClick={handlesoftAddSkill}
                        style={{ marginLeft: "5px", marginBottom: "10px" }}
                      >
                        Add Soft Skill
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginTop: "20px" }}>
                  <Col span={12}>
                    <Form.Item label="Language">
                      <Input
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                      />
                      <Button
                        onClick={handlelanguageSkill}
                        style={{ marginLeft: "5px", marginBottom: "10px" }}
                      >
                        Add Language
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Department">
                      <Input
                        value={newDepartment}
                        onChange={(e) => setNewDepartment(e.target.value)}
                      />
                      <Button
                        onClick={handledepartment}
                        style={{ marginLeft: "5px", marginBottom: "10px" }}
                      >
                        Add Department
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginTop: "20px" }}>
                  <Col span={12}>
                    <Form.Item label="Position">
                      <Input
                        value={newPosition}
                        onChange={(e) => setNewposition(e.target.value)}
                      />
                      <Button
                        onClick={handleposition}
                        style={{ marginLeft: "15px", marginBottom: "28px" }}
                      >
                        Add Category
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default ManageUsers
