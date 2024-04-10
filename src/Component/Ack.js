import React, { useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "../Component/css/Applicant.css"
import { Button, Form, Modal, notification } from "antd"

const API_BASE_URL = "http://localhost:5042"
const Acknolege = ({
  handleNext,
  handleBack,
  currentStep,
  handleAcknowledgmentSubmit,
  handleNextStep,
}) => {
  const [AckData, setAckData] = useState({
    keepAccountOpen: false,
    receiveInformation: false,
    agreeToTerms: false,
  })

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

  const location = useLocation()
  const jwtToken = location.state ? location.state.token : null

  const stepTitles = [
    "Personal Details",
    "Experience Details",
    "Application Questions",
    "Acknowledgement",
    "Reviews",
  ]

  const handleChangeack = (name, value) => {
    setAckData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit3 = async (e) => {
    e.preventDefault()
    const errors = {}

    if (
      !AckData.keepAccountOpen ||
      !AckData.receiveInformation ||
      !AckData.agreeToTerms
    ) {
      errors.common = "Please agree to all terms and conditions."
    }

    if (Object.keys(errors).length > 0) {
      notification.error({
        description: errors.common,
      })
      return
    }

    try {
       await axios.post(
        `${API_BASE_URL}/api/Acknowledgment`,
        AckData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )

      handleAcknowledgmentSubmit(true)
      setIsSuccessModalVisible(true)

      setAckData({
        keepAccountOpen: false,
        receiveInformation: false,
        agreeToTerms: false,
      })
    } catch (error) {
      console.error("Error submitting acknowledgment:", error)
    }
  }

  const handleOk = () => {
    setIsSuccessModalVisible(false);
    setAckData({
      keepAccountOpen: false,
      receiveInformation: false,
      agreeToTerms: false,
    });
    window.location.href = "/";
  };
      
    
  

  return (
    <Form>
      <div className="container" style={{ marginTop: "70px" }}>
        <div className="row mx-auto">
          <div className="col-md-12">
            <div className="mb-3">
              <input
                type="checkbox"
                id="keepAccountOpen"
                name="keepAccountOpen"
                checked={AckData.keepAccountOpen}
                onChange={(e) =>
                  handleChangeack("keepAccountOpen", e.target.checked)
                }
              />
              <label
                htmlFor="keepAccountOpen"
                className="form-label"
                style={{ marginLeft: "8px" }}
              >
                {" "}
                I want you to keep my account open for twelve months
              </label>
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-3">
              <input
                type="checkbox"
                id="receiveInformation"
                name="receiveInformation"
                checked={AckData.receiveInformation}
                onChange={(e) =>
                  handleChangeack("receiveInformation", e.target.checked)
                }
              />
              <label
                htmlFor="receiveInformation"
                className="form-label"
                style={{ marginLeft: "8px" }}
              >
                {" "}
                I am happy to receive other interesting information
              </label>
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={AckData.agreeToTerms}
                onChange={(e) =>
                  handleChangeack("agreeToTerms", e.target.checked)
                }
              />
              <label
                htmlFor="agreeToTerms"
                className="form-label"
                style={{ marginLeft: "8px" }}
              >
                {" "}
                Yes, I agree to the terms & conditions
              </label>
            </div>
          </div>

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
                type="button"
                onClick={handleSubmit3}
                className="btn btn-primary"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
      <Modal
        title="Success"
        visible={isSuccessModalVisible}
        onCancel={() => setIsSuccessModalVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <p>Your application has been submitted successfully!</p>
      </Modal>
    </Form>
  )
}
export default Acknolege
