import React, { useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import customLogo from "../Component/mainlogo.png"
import "bootstrap/dist/css/bootstrap.min.css"
import "../Component/css/Applicant.css"
import Job from "./job"
import APPQues from "./AppQues"
import Ack from "./Ack"
import {
  Steps,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  Form,
  Row,
  Col,
  notification,
} from "antd"

import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit"

const API_BASE_URL = "http://localhost:5042"

const applicantFormStyle = {
  flexDirection: "column",
  overflowy: "hidden",
}

const imageStyle = {
  display: "block",
  margin: "0 auto",
  width: "260px",
  height: "auto",
}

const imageStyle1 = {
  display: "block",
  width: "100%",
  height: "auto",
  marginTop: "40px",
}
const { Option } = Select

const ApplicantForm = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedStep, setSelectedStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)
  const [applicantData, setApplicantData] = useState({
    title: "",
    dob: "22/09/2023",
    gender: "",
    phoneNo: "",
    email: "",

    country: "",
    city: "",
    street: "",
    state: "",
    zip: "",
    permanentAddress: "",
    residentialAddress: "",
  })

  const location = useLocation()
  const jwtToken = location.state ? location.state.token : null
  const [validationErrors, setValidationErrors] = useState({})
  const handleChange = (name, value) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }))

    setApplicantData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < stepTitles.length - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedStep(currentStep + 1)
    }
  }
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setSelectedStep(currentStep - 1)
    }
  }
  const handleNextStep = () => {
    setCurrentStep(0)
    setSelectedStep(0)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(applicantData.email)) {
      errors.email = "Please enter a valid email address."
    }

    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/
    if (!phoneRegex.test(applicantData.phoneNo)) {
      errors.phoneNo =
        "Please enter a valid phone number in international format."
    }

    if (!Object.values(applicantData).every((value) => value)) {
      errors.common = "Please fill in all fields."
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)

      notification.error({
        description: errors.common,
      })
      return
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Applicant/App`,
        applicantData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )

      handleNext()
    } catch (error) {
      console.error("Error creating applicant:", error)
    }
  }
  const [, setIsAcknowledgmentSubmitted] = useState(false)
  const handleAcknowledgmentSubmit = (isSubmitted) => {
    setIsAcknowledgmentSubmitted(isSubmitted)
  }
  const stepTitles = [
    "Personal Details",
    "Experience Details",
    "Application Questions",
    "Acknowledgement",
  ]

  return (
    <div className="applicant-form-page" style={applicantFormStyle}>
      <header className="header">
        <img src={customLogo} alt="Custom Logo" style={imageStyle} />
      </header>
      <Steps
        current={currentStep}
        percent={60}
        style={{
          padding: "10px 0",
          width: "90%",
          display: "block",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          top: "-80px",
        }}
        items={stepTitles.map((title) => ({
          title,
        }))}
        itemRender={(item) => (
          <Steps.Item
            {...item}
            title={<span style={{ color: "blue" }}>{item.title}</span>}
          />
        )}
      />
      <main className="main">
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className="g-0">
              <MDBCol
                md="6"
                className="login-section"
                style={{ flexBasis: "35%" }}
              >
                <h1 className="application">{stepTitles[currentStep]}</h1>
                <MDBCardImage
                  src={process.env.PUBLIC_URL + "/login.png"}
                  alt="login form"
                  style={imageStyle1}
                />

                <ol className="applicant-list">
                  <li className="li">
                    Make your resume public to be visible to Hiring Employees.
                  </li>
                  <li className="li">
                    Speed up the application process with quick apply. You can
                    apply to jobs with just one click?
                  </li>
                  <li className="li">
                    See similar job titles and skills to help you make your next
                    move.
                  </li>
                </ol>
              </MDBCol>
              <MDBCol
                md="6"
                className="form-section"
                style={{ flexBasis: "65%", minHeight: "100vh" }}
              >
                <div>
                  <ul className="horizontal-list">
                    {stepTitles.map((title, index) => (
                      <li
                        key={index}
                        className={index === selectedStep ? "active-step" : ""}
                      >
                        {title}
                      </li>
                    ))}
                  </ul>

                  <Form method="post">
                    {currentStep === 0 && (
                      <div className="container" style={{ marginTop: "60px" }}>
                        <Row gutter={[24, 24]}>
                          <Col span={12}>
                            <Form.Item
                              label="Title"
                              name="title"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select a title.",
                                },
                              ]}
                            >
                              <Select
                                value={applicantData.title}
                                onChange={(value) =>
                                  handleChange("title", value)
                                }
                                placeholder="Title"
                                style={{ width: "100%" }}
                              >
                                <Option value="Mr">Mr</Option>
                                <Option value="Mrs">Mrs</Option>
                                <Option value="Ms">Ms</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="First Name"
                              name="firstName"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter your first name.",
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={applicantData.firstName}
                                onChange={(e) =>
                                  handleChange("firstName", e.target.value)
                                }
                                placeholder="First Name"
                                style={{ width: "100%" }}
                              />
                              {validationErrors.firstName && (
                                <span style={{ color: "red" }}>
                                  {validationErrors.firstName}
                                </span>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Last Name"
                              name="lastName"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter your last name.",
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={applicantData.lastName}
                                onChange={(e) =>
                                  handleChange("lastName", e.target.value)
                                }
                                placeholder="Last Name"
                                style={{ width: "100%" }}
                              />
                              {validationErrors.firstName && (
                                <span style={{ color: "red" }}>
                                  {validationErrors.firstName}
                                </span>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Email"
                              name="email"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter your email address.",
                                },
                              ]}
                            >
                              <Input
                                type="email"
                                id="email"
                                name="email"
                                value={applicantData.email}
                                onChange={(e) =>
                                  handleChange("email", e.target.value)
                                }
                                placeholder="Email"
                                style={{ width: "100%" }}
                              />
                              {validationErrors.firstName && (
                                <span style={{ color: "red" }}>
                                  {validationErrors.firstName}
                                </span>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Gender"
                              name="gender"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select your gender.",
                                },
                              ]}
                            >
                              <Radio.Group
                                id="gender"
                                name="gender"
                                value={applicantData.gender}
                                onChange={(e) =>
                                  handleChange("gender", e.target.value)
                                }
                              >
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                              </Radio.Group>
                              {validationErrors.firstName && (
                                <span style={{ color: "red" }}>
                                  {validationErrors.firstName}
                                </span>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="DOB"
                              name="dob"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select your date of birth.",
                                },
                              ]}
                            >
                              <DatePicker
                                id="dob"
                                name="dob"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="MM/dd/yyyy"
                                placeholderText="Select Date of Birth"
                                style={{ width: "100%" }}
                              />
                              {validationErrors.firstName && (
                                <span style={{ color: "red" }}>
                                  {validationErrors.firstName}
                                </span>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Phone Number"
                              name="phoneNo"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter your phone number.",
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                id="phoneNo"
                                name="phoneNo"
                                value={applicantData.phoneNo}
                                onChange={(e) =>
                                  handleChange("phoneNo", e.target.value)
                                }
                                placeholder="E.g. +94771473328"
                                style={{ width: "100%" }}
                              />
                              {validationErrors.firstName && (
                                <span style={{ color: "red" }}>
                                  {validationErrors.firstName}
                                </span>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Country"
                              name="country"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter your country.",
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                id="country"
                                name="country"
                                value={applicantData.country}
                                onChange={(e) =>
                                  handleChange("country", e.target.value)
                                }
                                placeholder="Country"
                                style={{ width: "100%" }}
                              />
                              {validationErrors.firstName && (
                                <span style={{ color: "red" }}>
                                  {validationErrors.firstName}
                                </span>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="State"
                              name="state"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter your state.",
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                id="state"
                                name="state"
                                value={applicantData.state}
                                onChange={(e) =>
                                  handleChange("state", e.target.value)
                                }
                                placeholder="State"
                                style={{ width: "100%" }}
                              />
                              {validationErrors.firstName && (
                                <span style={{ color: "red" }}>
                                  {validationErrors.firstName}
                                </span>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="City"
                              name="city"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter your city.",
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                id="city"
                                name="city"
                                value={applicantData.city}
                                onChange={(e) =>
                                  handleChange("city", e.target.value)
                                }
                                placeholder="City"
                                style={{ width: "100%" }}
                              />
                              {validationErrors.firstName && (
                                <span style={{ color: "red" }}>
                                  {validationErrors.firstName}
                                </span>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Street"
                              name="street"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter your street.",
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                id="street"
                                name="street"
                                value={applicantData.street}
                                onChange={(e) =>
                                  handleChange("street", e.target.value)
                                }
                                placeholder="Street"
                                style={{ width: "100%" }}
                              />
                              {validationErrors.firstName && (
                                <span style={{ color: "red" }}>
                                  {validationErrors.firstName}
                                </span>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Postal Code"
                              name="zip"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter your postal code.",
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                id="zip"
                                name="zip"
                                value={applicantData.zip}
                                onChange={(e) =>
                                  handleChange("zip", e.target.value)
                                }
                                placeholder="Postal Code"
                                style={{ width: "100%" }}
                              />
                              {validationErrors.firstName && (
                                <span style={{ color: "red" }}>
                                  {validationErrors.firstName}
                                </span>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Permanent Address"
                              name="permanentAddress"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please enter your permanent address.",
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                id="permanentAddress"
                                name="permanentAddress"
                                value={applicantData.permanentAddress}
                                onChange={(e) =>
                                  handleChange(
                                    "permanentAddress",
                                    e.target.value
                                  )
                                }
                                placeholder="Permanent Address"
                                style={{ width: "100%" }}
                              />
                              {validationErrors.firstName && (
                                <span style={{ color: "red" }}>
                                  {validationErrors.firstName}
                                </span>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Residential Address"
                              name="residentialAddress"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please enter your residential address.",
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                id="residentialAddress"
                                name="residentialAddress"
                                value={applicantData.residentialAddress}
                                onChange={(e) =>
                                  handleChange(
                                    "residentialAddress",
                                    e.target.value
                                  )
                                }
                                placeholder="Residential Address"
                                style={{ width: "100%" }}
                              />
                              {validationErrors.firstName && (
                                <span style={{ color: "red" }}>
                                  {validationErrors.firstName}
                                </span>
                              )}
                            </Form.Item>
                          </Col>

                          <div
                            className="col-md-12"
                            style={{ textAlign: "right", marginTop: "20px" }}
                          >
                            {currentStep > 0 && (
                              <Button
                                type="button"
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="btn btn-secondary"
                              >
                                Back
                              </Button>
                            )}
                            {currentStep < stepTitles.length - 1 && (
                              <Button
                                type="submit"
                                onClick={handleSubmit}
                                className="btn btn-primary"
                              >
                                Next
                              </Button>
                            )}
                          </div>
                        </Row>
                      </div>
                    )}
                    {currentStep === 1 && (
                      <Job
                        handleNext={handleNext}
                        handleBack={handleBack}
                        currentStep={currentStep}
                      />
                    )}
                    {currentStep === 2 && (
                      <APPQues
                        handleNext={handleNext}
                        handleBack={handleBack}
                        currentStep={currentStep}
                      />
                    )}

                    {currentStep === 3 && (
                      <Ack
                        handleNext={handleNext}
                        handleNextStep={handleNextStep}
                        handleBack={handleBack}
                        currentStep={currentStep}
                        handleAcknowledgmentSubmit={handleAcknowledgmentSubmit}
                      />
                    )}
                  </Form>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </main>
    </div>
  )
}

export default ApplicantForm
