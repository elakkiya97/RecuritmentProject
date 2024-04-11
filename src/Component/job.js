import React, { useState, useEffect } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "../Component/css/Applicant.css"
import { Input, Button, Select, Form, Row, Col, notification } from "antd"

const API_BASE_URL = "http://recruitmentapi.iykons.com"

const { Option } = Select

const Job = ({ handleNext, handleBack, currentStep }) => {
  const [softSkill, setSoftSkill] = useState([])
  const [hardSkill, setHardSkill] = useState([])
  const [additionalKnownLanguages, setLanguage] = useState([])
  const [ExperienceData, setExperienceData] = useState({
    motherLanguage: "",
    additionalQualification: "",
  })

  const [educationDTO, setEducationDTO] = useState({
    currentStatus: "",
    qulification: "",
    insituteName: "",
    yearAttained: "",
  })

  const [departmentUserDTO, setDepartmentUserDTO] = useState({
    departmentID: "",
  })

  const handleChangeExperienceData = (fieldName, value) => {
    setExperienceData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }))
  }

  const handleChangeEducationDTO = (fieldName, value) => {
    setEducationDTO((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }))
  }

  const handleChangeSoftSkills = (value) => {
    setSoftSkill(value)
  }

  const handleChangeHardSkills = (value) => {
    setHardSkill(value)
  }

  const handleChangeAdditionalKnownLanguages = (value) => {
    setLanguage(value)
  }

  const handleChangeDepartment = (value) => {
    setDepartmentUserDTO({
      departmentID: value,
    })
  }

  const location = useLocation()
  const jwtToken = location.state ? location.state.token : null
  const handleSubmit2 = async (e) => {
    e.preventDefault()
    const errors = {}
    if (!Object.values(ExperienceData).every((value) => value)) {
      errors.common = "Please fill in all fields "
    }

    if (!Object.values(educationDTO).every((value) => value)) {
      errors.common = "Please fill in all fields "
    }

    // Check if any of the department data fields are empty
    if (!Object.values(departmentUserDTO).every((value) => value)) {
      errors.common = "Please fill in all fields"
    }
    // Check for any errors
    if (Object.keys(errors).length > 0) {
      // Display common error message to users using notification
      notification.error({
        // message: 'Validation Error',
        description: errors.common,
      })
      return
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Education/app`,
        {
          skillUserDTO: {
            softSkill: softSkill,
            hardSkill: hardSkill,
            language: additionalKnownLanguages,
          },
          // experienceData: ExperienceData,
          educationDTO: educationDTO,
          departmentUserDTO: departmentUserDTO,
        },

        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )

      handleNext()
    } catch (error) {}
  }

  const stepTitles = [
    "Personal Details",
    "Experience Details",
    "Application Questions",
    "Acknowledgement",
    "Reviews",
  ]

  const [departmentOptions, setDepartmentOptions] = useState([])

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/Department/GetDepartments`
        )

        const departmentData = response.data.$values

        if (Array.isArray(departmentData)) {
          setDepartmentOptions(departmentData)
        } else {
          console.error(
            "Error fetching departments: Response data is not an array",
            response
          )
        }
      } catch (error) {
        console.error("Error fetching departments:", error)
      }
    }

    fetchDepartments()
  }, [])

  const [additionalLanguageOptions, setAdditionalLanguageOptions] = useState(
    []
  )
  const [softSkillOptions, setSoftSkillOptions] = useState([])
  const [hardSkillOptions, setHardSkillOptions] = useState([])

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/Skill/GetSkills`)
        console.log("API Response:", response.data)

        const skillData = response.data.$values

        if (Array.isArray(skillData)) {
          const additionalLanguages = skillData.filter(
            (skill) => skill.skillType === 0
          )
          const softSkills = skillData.filter((skill) => skill.skillType === 1)
          const hardSkills = skillData.filter((skill) => skill.skillType === 2)

          setAdditionalLanguageOptions(additionalLanguages)
          setSoftSkillOptions(softSkills)
          setHardSkillOptions(hardSkills)
        } else {
          console.error(
            "Error fetching skills: Response data is not an array",
            response
          )
        }
      } catch (error) {
        console.error("Error fetching skills:", error)
      }
    }

    fetchSkills()
  }, [])

  return (
    <div className="container" style={{ marginTop: "60px" }}>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Form.Item
            label="CurrentStatus"
            name="currentstatus"
            rules={[{ required: true, message: "Please select a title." }]}
          >
            <Select
              id="currentstatus"
              name="currentstatus"
              value={educationDTO.currentStatus}
              onChange={(value) =>
                handleChangeEducationDTO("currentStatus", value)
              }
              className="form-control"
              placeholder="Current Status"
            >
              <Option value="Student">Student</Option>
              <Option value="Employed">Employed</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Qualification"
            name="qulification"
            rules={[
              { required: true, message: "Please enter your first name." },
            ]}
          >
            <Select
              id="qulification"
              name="qulification"
              value={educationDTO.qulification}
              onChange={(value) =>
                handleChangeEducationDTO("qulification", value)
              }
              className="form-control"
              placeholder="Qualifications"
            >
              <Option value="Undergraduate">Undergraduate</Option>
              <Option value="Master">Master</Option>
              <Option value="PHD">PHD</Option>
              <Option value="A/L">A/L</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="FieldOfStudy"
            name="fieldOfStudy"
            rules={[
              { required: true, message: "Please enter your last name." },
            ]}
          >
            <Select
              id="fieldOfStudy"
              name="fieldOfStudy"
              value={departmentUserDTO.departmentID}
              onChange={(value) => handleChangeDepartment(value)}
              className="form-control"
              placeholder="Field of Study"
            >
              {departmentOptions.map((department) => (
                <div key={department.departmentID}>
                  <label>{department.departmentName}</label>
                </div>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="InsituteName"
            name="insituteName"
            rules={[
              { required: true, message: "Please enter your email address." },
            ]}
          >
            <Input
              type="text"
              id="insituteName"
              name="insituteName"
              value={educationDTO.insituteName}
              onChange={(e) =>
                handleChangeEducationDTO("insituteName", e.target.value)
              }
              className="form-control"
              placeholder="University"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="yearAttained"
            name="yearAttained"
            rules={[
              { required: true, message: "Please enter your email address." },
            ]}
          >
            <Input
              type="text"
              id="yearAttained"
              name="yearAttained"
              value={educationDTO.yearAttained}
              onChange={(e) =>
                handleChangeEducationDTO("yearAttained", e.target.value)
              }
              className="form-control"
              placeholder="Year Attained"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="AdditionalQualification"
            name="additionalQualification"
            rules={[
              { required: true, message: "Please enter your email address." },
            ]}
          >
            <Input
              type="additionalQualification"
              id="additionalQualification"
              name="additionalQualification"
              value={ExperienceData.additionalQualification}
              onChange={(e) =>
                handleChangeExperienceData(
                  "additionalQualification",
                  e.target.value
                )
              }
              className="form-control"
              placeholder="additionalQualification"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="MotherLanguage"
            name="motherLanguage"
            rules={[
              { required: true, message: "Please enter your email address." },
            ]}
          >
            <Input
              type="text"
              id="motherLanguage"
              name="motherLanguage"
              value={ExperienceData.motherLanguage}
              onChange={(e) =>
                handleChangeExperienceData("motherLanguage", e.target.value)
              }
              className="form-control"
              placeholder="Mother Language"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="AdditionalKnownLanguages"
            name="additionalKnownLanguages"
            rules={[
              { required: true, message: "Please enter your email address." },
            ]}
          >
            <Select
              id="additionalKnownLanguages"
              name="additionalKnownLanguages"
              mode="multiple"
              className="form-control"
              value={additionalKnownLanguages.additionalKnownLanguages}
              onChange={(value) => handleChangeAdditionalKnownLanguages(value)}
              placeholder="additionalLanguages"
            >
              {additionalLanguageOptions.map((skill) => (
                <Option key={skill.skillid} value={skill.skillid}>
                  {skill.skillName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="softSkills"
            name="softSkills"
            rules={[
              { required: true, message: "Please enter your email address." },
            ]}
          >
            <Select
              id="softSkills"
              name="softSkills"
              mode="multiple"
              value={softSkill.softSkills}
              onChange={(value) => handleChangeSoftSkills(value)}
              className="form-control"
              placeholder="SoftSkills"
            >
              {softSkillOptions.map((skill) => (
                <Option key={skill.skillid} value={skill.skillid}>
                  {skill.skillName}
                </Option>
              ))}
            </Select>

            {/* Similar structure as Additional Known Languages */}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="HardSkills"
            name="hardSkills"
            rules={[
              { required: true, message: "Please enter your email address." },
            ]}
          >
            <Select
              id="hardSkills"
              name="hardSkills"
              mode="multiple"
              value={hardSkill.hardSkills}
              onChange={(value) => handleChangeHardSkills(value)}
              className="form-control"
              placeholder="hardSkills"
            >
              {hardSkillOptions.map((skill) => (
                <Option key={skill.skillid} value={skill.skillid}>
                  {skill.skillName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <div
          className="col-md-12"
          style={{ textAlign: "right", marginTop: "20px" }}
        >
          {currentStep > 0 && (
            <Button
              type="button"
              onClick={handleBack}
              className="btn btn-secondary"
              style={{ marginRight: "10px" }}
            >
              Back
            </Button>
          )}
          {currentStep < stepTitles.length - 1 && (
            <Button
              type="submit"
              onClick={handleSubmit2}
              className="btn btn-primary"
            >
              Next
            </Button>
          )}
        </div>
      </Row>
    </div>
  )
}
export default Job
