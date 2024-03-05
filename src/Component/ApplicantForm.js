import React, { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import customLogo from '../Component/mainlogo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../Component/css/Applicant.css'
import { Steps, Input, Button, Radio, Select, DatePicker } from 'antd'
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit'

const API_BASE_URL = 'http://localhost:5042'

const applicantFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}

const imageStyle = {
  display: 'block',
  margin: '0 auto',
  width: '260px',
  height: 'auto'
}

const imageStyle1 = {
  display: 'block',
  width: '100%',
  height: 'auto',
  marginTop: '40px',
}
const { Option } = Select

const ApplicantForm = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedStep, setSelectedStep] = useState(0)
  const [applicantData, setApplicantData] = useState({
    title: '',
    dob: '22/09/2023',
    gender: '',
    phoneNo: '',
    email: '',
    countryCode: '',
    country: '',
    city: '',
    street: '',
    state: '',
    zip: '',
    permanentAddress: '',
    residentialAddress: '',
  })
  const [ExperienceData, setExperienceData] = useState({
    currentstatus: '',
    qualifications: [],
    fieldOfStudy: '',
    yearAttained: '',
    motherLanguage: '',
    softSkills: [],
    hardSkills: [],
    cv: null,
  })

  const location = useLocation()
  const jwtToken = location.state ? location.state.token : null

  const handleChange = (name, value) => {
    setApplicantData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleChangeStep = (index) => {
    setCurrentStep(index)
    setSelectedStep(index)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Applicant/app`,
        applicantData,
        {
           headers: {
              Authorization: `Bearer ${jwtToken}`,
           },
        }
     )
     
      
      console.log('Applicant created:', response.data);
    } catch (error) {
      console.error('Error creating applicant:', error);
    }
  }
  const handleCancel = () => {
  
    console.log('Cancellation logic goes here');
  }

  const stepTitles = [
    'Personal Details',
    'Experience Details',
    'Application Questions',
    'Acknowledgement',
    'Reviews',
  ]

  const handleFileChange = (field, file) => {
    setExperienceData({
      ...ExperienceData,
      [field]: file,
    })
  }

  return (
    <div className="applicant-form-page" style={applicantFormStyle}>
      <header className="header">
        <img src={customLogo} alt="Custom Logo" style={imageStyle} />
      </header>
      <Steps
        current={currentStep}
        percent={60}
        style={{
          padding: '10px 0',
          width: '90%',
          display: 'block',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          top: '-80px',
        }}
        items={stepTitles.map((title) => ({
          title,
        }))}
        itemRender={(item) => (
          <Steps.Item
            {...item}
            title={<span style={{ color: 'blue' }}>{item.title}</span>}
          />
        )}
      />
      <main className="main">
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className="g-0">
              <MDBCol md="6" className="login-section" style={{ flexBasis: '35%', minHeight: '100vh' }}>
                <h1 className="application">
                  {stepTitles[currentStep]}
                </h1>
                <MDBCardImage
                  src={process.env.PUBLIC_URL + '/login.png'}
                  alt="login form"
                  style={imageStyle1}
                />
                <h3 className="h3">
                </h3>
                <ol className="applicant-list">
                  <li className="li">
                    Make your resume public to be visible to Hiring Employees.
                  </li>
                  <li className="li">
                    Speed up the application process with quick apply. You can
                    apply to jobs with just one click?
                  </li>
                  <li className="li">
                    See similar job titles and skills to help you make your
                    next move.
                  </li>
                </ol>
              </MDBCol>
              <MDBCol md="6" className="form-section" style={{ flexBasis: '65%', minHeight: '100vh' }}>
                <div>
                  <ul className="horizontal-list">
                    {stepTitles.map((title, index) => (
                      <li
                        key={index}
                        onClick={() => handleChangeStep(index)}
                        className={index === selectedStep ? 'active-step' : ''}
                      >
                        {title}
                      </li>
                    ))}
                  </ul>
                  <form onSubmit={handleSubmit} method="post">
                    {currentStep === 0 && (
                      <div className="container" style={{ marginTop: '30px' }}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="title" className="form-label">
                                Title:
                              </label>
                              <Select
  id="title"
  name="title"  // Corrected attribute name from "tilte" to "title"
  value={ExperienceData.currentstatus}
  onChange={(value) => handleChange('title', value)}
  className="form-control"
  placeholder="Title"
>
  <Option value="Mr">Mr</Option>
  <Option value="Mrs">Mrs</Option>
  <Option value="Ms">Ms</Option>
</Select>


                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="firstName" className="form-label">
                                First Name:
                              </label>
                              <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={applicantData.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                className="form-control"
                                placeholder="First Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="lastName" className="form-label">
                                Last Name:
                              </label>
                              <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={applicantData.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                className="form-control"
                                placeholder="Last Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                Email:
                              </label>
                              <Input
                                type="email"
                                id="email"
                                name="email"
                                value={applicantData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="form-control"
                                placeholder="Email"

                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="gender" className="form-label">
                                Gender:
                              </label>
                              <Radio.Group
                                id="gender"
                                name="gender"
                                value={applicantData.gender}
                                onChange={(e) => handleChange('gender', e.target.value)}
                              >
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                              </Radio.Group>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                DOB:
                              </label>
                              {/* <DatePicker
                                id="dob"
                                name="dob"
                                value={applicantData.dob}
                                // onChange={(date, dateString) => handleChange('dob', dateString)}
                                // className="form-control"
                                // placeholder="Date of Birth"
                                // style={{ width: '100%' }}
                              /> */}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="phoneNo" className="form-label">
                                Phone Number:
                              </label>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Select
                                  id="countryCode"
                                  name="countryCode"
                                  value={applicantData.countryCode}
                                  onChange={(value) => handleChange('countryCode', value)}
                                  className="form-control"
                                  style={{ flex: 1, marginRight: '10px' }}
                                >
                                  <Option value="+1">+1 (United States)</Option>
                                  <Option value="+44">+44 (United Kingdom)</Option>
                                </Select>
                                <Input
                                  type="tel"
                                  id="phoneNo"
                                  name="phoneNo"
                                  value={applicantData.phoneNo}
                                  onChange={(e) => handleChange('phoneNo', e.target.value)}
                                  className="form-control"
                                  style={{ flex: 2 }}
                                  placeholder="Phone Number"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="country" className="form-label">
                                Country:
                              </label>
                              <Input
                                type="text"
                                id="country"
                                name="country"
                                value={applicantData.country}
                                onChange={(e) => handleChange('country', e.target.value)}
                                className="form-control"
                                placeholder="Country"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="state" className="form-label">
                                State:
                              </label>
                              <Input
                                type="text"
                                id="state"
                                name="state"
                                value={applicantData.state}
                                onChange={(e) => handleChange('state', e.target.value)}
                                className="form-control"
                                placeholder="State"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="city" className="form-label">
                                City:
                              </label>
                              <Input
                                type="text"
                                id="city"
                                name="city"
                                value={applicantData.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                                className="form-control"
                                placeholder="City"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="street" className="form-label">
                                Street:
                              </label>
                              <Input
                                type="text"
                                id="street"
                                name="street"
                                value={applicantData.street}
                                onChange={(e) => handleChange('street', e.target.value)}
                                className="form-control"
                                placeholder="Street"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="zip" className="form-label">
                                Postal Code:
                              </label>
                              <Input
                                type="text"
                                id="zip"
                                name="zip"
                                value={applicantData.zip}
                                onChange={(e) => handleChange('zip', e.target.value)}
                                className="form-control"
                                placeholder="Postal Code"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="permanentAddress" className="form-label">
                                Permanent Address:
                              </label>
                              <Input
                                type="text"
                                id="permanentAddress"
                                name="permanentAddress"
                                value={applicantData.permanentAddress}
                                onChange={(e) => handleChange('permanentAddress', e.target.value)}
                                className="form-control"
                                placeholder="Permanent Address"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="residentialAddress" className="form-label">
                                Residential Address:
                              </label>
                              <Input
                                type="text"
                                id="residentialAddress"
                                name="residentialAddress"
                                value={applicantData.residentialAddress}
                                onChange={(e) => handleChange('residentialAddress', e.target.value)}
                                className="form-control"
                                placeholder="Residential Address"
                              />
                            </div>
                          </div>
                          <div className="col-md-12" style={{ textAlign: 'right', marginTop: '20px' }}>
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
                        </div>
                      </div>
                    )}
                   

                  </form>
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