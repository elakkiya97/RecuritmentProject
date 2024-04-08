import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import axios from "axios";
import customLogo from "../../Component/mainlogo.png";
import { Input, Button, Select, Form, Row, Col, notification } from "antd";
import { useForm } from "antd/lib/form/Form";

function App() {
  const [resumeData, setResumeData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Resume");
  const [viewedPDF, setViewedPDF] = useState(null);
  const [form] = useForm();
  const [showPopup, setShowPopup] = useState(false);
  const [showAcceptedMessage, setShowAcceptedMessage] = useState(false);
  const API_BASE_URL = "http://localhost:5042";
  const [skillOptions, setSkillOptions] = useState({
    skillType: 2, // Default value for skillType
    skillName: "" // Default value for skillName
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/Skill/CreateSkill`,
          skillOptions
        );
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, [skillOptions]); // Trigger effect when skillOptions changes

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchResumeData(category);
  };

  const fetchResumeData = (category) => {
    // Dummy data
    const dummyData = [
      {
        id: 1,
        name: "John Doe",
        category: "UI/UX Designer",
        resume: "https://example.com/resume2.pdf",
        status: "Viewed",
      },
      {
        id: 2,
        name: "Jane Smith",
        category: "UI/UX Designer",
        resume: "https://example.com/resume2.pdf",
        status: "New",
      },
      {
        id: 3,
        name: "Michael Johnson",
        category: "Frontend-Developer",
        resume: "...",
        status: "Viewed",
      },
      // Add more dummy data as needed
    ];

    // Filter data based on the selected category
    let filteredData;
    if (category === "All Resume") {
      filteredData = dummyData;
    } else {
      filteredData = dummyData.filter(
        (resume) => resume.category === category
      );
    }
    setResumeData(filteredData);
  };

  const viewPDF = (pdfUrl) => {
    setViewedPDF(pdfUrl);
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const acceptResume = () => {
    setShowPopup(false);
    setShowAcceptedMessage(true);
  };

  const handleHardSkills = () => {
    const selectedValues = form.getFieldValue("hardSkills");
    setSkillOptions({
      ...skillOptions,
      skillName: selectedValues // Update only skillName, keep skillType as it is
    });
    console.log("Selected hard skills:", selectedValues);
    // Further logic to handle selected values
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* Boxicons */}
      <link
        href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
        rel="stylesheet"
      />
      {/* My CSS */}
      <link rel="stylesheet" href="style.css" />
      <title>JobAdmin</title>
      {/* SIDEBAR */}
      <section id="sidebar">
        <a href="#" className="brand">
          <i className="bx bxs-smile" />
          <span className="text">JobAdmin</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="#">
              <i className="bx bxs-dashboard" />
              <span className="text">Dashboard</span>
            </a>
          </li>
        </ul>

        <ul className="side-menu">
          <li>
            <a href="#">
              <i className="bx bxs-cog" />
              <span className="text">All Resume</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-cog" />
              <span className="text">Manage Users</span>
            </a>
          </li>

          <li>
            <a href="#">
              <i className="bx bxs-cog" />
              <span className="text">Settings</span>
            </a>
          </li>
          <li>
            <a href="#" className="logout">
              <i className="bx bxs-log-out-circle" />
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
      {/* SIDEBAR */}
      {/* CONTENT */}
      <section id="content">
        {/* NAVBAR */}
        <nav>
          <form action="#"></form>

          <a href="#" className="profile">
            <img src={customLogo} alt="Custom Logo" />
          </a>
        </nav>
        {/* NAVBAR */}
        {/* MAIN */}
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>
                  <a className="active" href="#">
                    Home
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ul className="box-info">
            <li>
              <span className="text">
                <h3>1020</h3>
                <p>New Resume</p>
              </span>
            </li>
            <li>
              <span className="text">
                <h3>2834</h3>
                <p>View Resume</p>
              </span>
            </li>
            <li>
              <span className="text">
                <h3>2543</h3>
                <p>Select Resume</p>
              </span>
            </li>
            <li>
              <span className="text">
                <h3>2543</h3>
                <p>Reject Resume</p>
              </span>
            </li>
          </ul>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>categories</h3>
                <select
                  className="nav-link"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="All Resume">All</option>
                  <option value="UI/UXDesigner">UI/UX Designer</option>
                  <option value="Frontend-Developer">Frontend-Developer</option>
                  <option value="QualityAssurance">Quality Assurance</option>
                  <option value="fullStackDeveloper">FullStackDeveloper</option>
                </select>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Resume</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {resumeData.map((resume) => (
                    <tr
                      key={resume.id}
                      style={{
                        backgroundColor:
                          resume.status === "Viewed" ? "#3C91E6" : "#CFE8FF",
                        color: resume.status === "Viewed" ? "white" : "#3C91E6",
                      }}
                    >
                      <td>{resume.id}</td>
                      <td>{resume.name}</td>
                      <td>
                        <a
                          href="#"
                          onClick={() => viewPDF(resume.resume)}
                          style={{
                            color: resume.status === "Viewed" ? "white" : "#3C91E6",
                          }}
                        >
                          {" "}
                          {resume.status === "Viewed"
                            ? "Viewed Resume"
                            : "View Resume"}
                        </a>
                      </td>
                      <td>{resume.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="todo">
              <div className="head">
                <h3>fullView</h3>
                <i className="bx bx-plus" />
                <i className="bx bx-filter" />
              </div>
              <ul className="todo-list">
                {viewedPDF && (
                  <embed src={viewedPDF} type="application/pdf" width="100%" height="600px" />
                )}

                <ul>
                  <li classname="list">Name: </li>
                  <li classname="list">Phone Number: </li>
                  <li classname="list">Email Address: </li>
                  <button onClick={openPopup}>Accept</button>
                  <button>Reject</button>
                </ul>
              </ul>

              {showPopup && (
                <div className="accepted-message">
                  <h2>Resume Accepted Successfully!</h2>
                  {/* Additional content or redirection logic can be added here */}
                </div>
              )}
              <div>
                <Col span={12}>
                  <Form.Item
                    label="HardSkills"
                    name="hardSkills"
                    rules={[
                      { required: true, message: "Please enter your email address." },
                    ]}
                  >
                    <Input />
                    <Button onClick={handleHardSkills}>Set Hard Skills</Button>
                  </Form.Item>
                </Col>
              </div>
            </div>
          </div>
        </main>
        {/* MAIN */}
      </section>
      {/* CONTENT */}
    </>
  );
}

export default App;
