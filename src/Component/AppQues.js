
import React, { useState, useEffect } from "react";
import axios from "axios";
import S3Upload from './S3Upload';
import { useLocation, } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Component/css/Applicant.css";
import { Input, Button, Select, Form, DatePicker, Radio } from "antd";

const API_BASE_URL = "http://localhost:5042";



const { Option } = Select;

const AppQues =  ({handleNext, handleBack,currentStep}) => {
    
    const [formData, setFormData] = useState({
        uploadedFile: '',
    });
    const dynamicPath = `users/files`;
  
    const [appqueData, setappQudata] = useState({
        desiredLocation: "",
        isFullTimePosition: true,
        startDate: "22/09/2023",
        source: "",
        preferredContactMethod: ""

    })
    const [app1queData, setappQudata1] = useState({
        refereename: "",
        refereephoneNo: "",
        refereeAddress: "",
    })

    const location = useLocation();
    const jwtToken = location.state ? location.state.token : null;





  

    const [selectedDate1, setSelectedDate1] = useState(null);




    const handleDateChange1 = (date1) => {
        console.log("date", date1)
        setSelectedDate1(date1);
    };
    const handleAppqueDataChange = (field, value) => {
        setappQudata({
            ...appqueData,
            [field]: value,
        });
    };

    const handleApp1queDataChange = (field, value) => {
        setappQudata1({
            ...app1queData,
            [field]: value,
        });
    };

    const handleSubmit4 = async (e) => {
        e.preventDefault();
        try {
            // Perform the job application submission
            const response1 = await axios.post(
                `${API_BASE_URL}/api/JobApplication/Job`,
                {
                    ...appqueData,
                    startDate: selectedDate1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
    
            console.log("Job Application created:", response1.data);
    
            // Perform the file upload
            const fileData = {
                fileName: formData.uploadedFile.name,
                filePath: formData.uploadedFile,
                fileSize: 0,
                contentType: formData.uploadedFile.type,
            };
    
            // Set the headers with the JWT token
        
            
              
    
            const response2 = await axios.post(
                `${API_BASE_URL}/api/FileUploadResponse/upload`,
                
                fileData,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
                
            );
    
          
    
            // Proceed to the next step after both actions are completed
            handleNext();
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const stepTitles = [
        "Personal Details",
        "Experience Details",
        "Application Questions",
        "Acknowledgement",
        "Reviews",
    ];







    return (
        <Form>
            <div className="container" style={{ marginTop: '30px' }}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="refereename" className="form-label">
                                Referee Name:
                            </label>
                            <Input
                                type="text"
                                id="refereename"
                                name="refereename"
                                value={app1queData.refereename}
                                onChange={(e) => handleApp1queDataChange('refereename', e.target.value)}
                                className="form-control"
                                placeholder="Referee name"
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="refereephoneNo" className="form-label">
                                Referee PhoneNumber:
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                <Input
                                    type="tel"
                                    id="refereephoneNo"
                                    name="refereephoneNo"
                                    value={app1queData.phoneNo}
                                    onChange={(e) => handleApp1queDataChange('prefereephoneNo', e.target.value)}
                                    className="form-control"
                                    style={{ flex: 2 }}
                                    placeholder="Referee Phone Number"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="refereeAddress" className="form-label">
                                Referee Address:
                            </label>
                            <Input
                                type="text"
                                id="refereeAddress"
                                name="refereeAddress"
                                value={app1queData.refereeAddress}
                                onChange={(e) => handleApp1queDataChange('refereeAddress', e.target.value)}
                                className="form-control"
                                placeholder="Referee Address"
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="desiredLocation" className="form-label">
                                Desired Location:
                            </label>
                            <Select
                                id="desiredLocation"
                                name="desiredLocation"

                                value={appqueData.desiredLocation}
                                onChange={(value) => handleAppqueDataChange('desiredLocation', value)}
                                className="form-control"
                                placeholder="Desired Location"
                            >
                                <Option value="OnSite">OnSite</Option>
                                <Option value="Remote">Remote</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="source" className="form-label">
                                Where did you hear about this opportunity?
                            </label>
                            <Select
                                id="source"
                                name="source"

                                value={appqueData.source}
                                onChange={(value) => handleAppqueDataChange('source', value)}
                                className="form-control"
                                placeholder=" Where did you hear about this opportunity?"
                            >

                                <Option value="Websites">Websites</Option>
                                <Option value="Newspapers">Newspapers</Option>

                                <Option value="Facebook">Facebook</Option>
                                <Option value="LinkedIn">LinkedIn</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="startDate" className="form-label">
                                When are you ready to start?
                            </label>
                            <DatePicker
                                id="startDate"
                                name="startDate"
                                selected={selectedDate1}
                                onChange={handleDateChange1}
                                dateFormat="MM/dd/yyyy"
                                className="form-control"
                                placeholderText="startDate"
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="preferredContactMethod" className="form-label">
                                Preferred Contact Method
                            </label>

                            <Select
                                id="preferredContactMethod"
                                name="preferredContactMethod"

                                value={appqueData.preferredContactMethod}
                                onChange={(value) => handleAppqueDataChange('preferredContactMethod', value)}
                                className="form-control"
                                placeholder="preferredContactMethod">
                                <Option value="Email">Email</Option>
                                <Option value="SMS">SMS</Option>
                                <Option value="OnSite">Facebook</Option>
                                <Option value="Remote">LinkedIn</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="isFullTimePosition" className="form-label">
                                Are you looking for a full-time permanent position?
                            </label>
                            <Radio.Group
                                id="isFullTimePosition"
                                name="isFullTimePosition"
                                checked={appqueData.isFullTimePosition}
                                onChange={(e) => handleAppqueDataChange('isFullTimePosition', e.target.checked)}
                            >
                                <Radio value="Yes">Yes</Radio>
                                <Radio value="No">No</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="col-md-12 text-center">
                        <div className="mb-3">
                            <label htmlFor="cvUpload" className="form-label">Upload CV:</label>
                            <Form.Item
               
                name="uploadedFile"
                rules={[{ required: true, message: 'Please upload a file' }]}
            >
                <S3Upload
                    name="uploadedFile"
                    setFormData={(name, value) => setFormData({ ...formData, [name]: value })}
                    dynamicPath={dynamicPath} 
                />
            </Form.Item>
                        </div>
                    </div>

                    <div className="col-md-12" style={{ textAlign: 'right', marginTop: '20px' }}>
                        {currentStep > 0 && (
                            <Button type="button" onClick={handleBack} className="btn btn-secondary" style={{ marginRight: '10px' }}>
                                Back
                            </Button>
                        )}
                        {currentStep < stepTitles.length - 1 && (
                            <Button
                                type="submit"
                                onClick={handleSubmit4}
                                className="btn btn-primary"
                            >
                                Next
                            </Button>
                        )}
                    </div>

                </div>
            </div>
        </Form>
    )
}
export default AppQues;