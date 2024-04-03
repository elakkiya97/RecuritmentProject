import React, { useState } from 'react';
import { Form, Button } from 'antd';
import S3Upload from './S3Upload'; // Update the path to match the location of your S3Upload component
import axios from 'axios'; // Import Axios for making HTTP requests

const UploadForm = () => {
    const [formData, setFormData] = useState({
        uploadedFile: '',
    });
    const dynamicPath = `users/files`;

    const handleFormSubmit = async () => {
        try {
            const fileData = {
                fileName: formData.uploadedFile.name,
                filePath: formData.uploadedFile,
                fileSize: 0,
                contentType: formData.uploadedFile.type
            };

            console.log('data form', formData)

            // you want to set token
            const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhNGEzZjQ3ZS0wOTVhLTQ5MGMtYmEwZC00M2JhMTIzZDNhZDciLCJlbWFpbCI6ImVsYWtraXlhQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJzZWx2YSIsImZhbWlseV9uYW1lIjoiZWxha2tpeWEiLCJyb2xlIjoiVXNlciIsIm5iZiI6MTcxMjEyMTU1OSwiZXhwIjoxNzEyMjA3OTU5LCJpYXQiOjE3MTIxMjE1NTksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTA0MiJ9.ZJwUv4sjaSdHGYNjxMP8X1HOjzpHcCWuxDaXn6wtwfGXtFtGbENSZd9PBXZnjEDVitGFGICnO64Zj95CXiY4tQ";

            // Set the headers with the JWT token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.post('http://localhost:5042/api/FileUploadResponse/upload', fileData, config);
            console.log('Form submission response:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Form>
           <Form.Item
    label="Upload File"
    name="uploadedFile"
    rules={[{ required: true, message: 'Please upload a file' }]}
>
    <S3Upload
        name="uploadedFile"
        setFormData={(name, value) => setFormData({ ...formData, [name]: value })}
        dynamicPath={dynamicPath} 
    />
</Form.Item>

            <Form.Item>
                <Button onClick={handleFormSubmit}>Submit</Button>
            </Form.Item>
        </Form>
    );
};

export default UploadForm;
