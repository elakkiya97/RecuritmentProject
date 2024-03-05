import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import customLogo from '../Component/mainlogo.png';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  
} from 'mdb-react-ui-kit';

const imageStyle = {
  display: 'block',
  margin: '0 auto',
  width: '100px',
  height: 'auto',
};

const imageStyle1 = {
  display: 'block',
  margin: '0 auto',
  width: '60%',
  height: 'auto',
};

const API_BASE_URL = 'http://localhost:5042'; // Replace with your API URL

function Signup() {
  const [message, setMessage] = useState('');
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    handleConfirmEmail();
  }, []);

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/Account/register`, {
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        email: registrationData.email,
        password: registrationData.password,
      });

      if (response && response.data) {
        setMessage(response.data.message);
      } else {
        setMessage('Invalid response from the server');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage('Error: ' + error.response.data.message);
      } else {
        setMessage('An error occurred while making the request');
      }
    }
  };

  const handleConfirmEmail = async () => {
    try {
      const token = new URLSearchParams(window.location.search).get('token');
      const email = new URLSearchParams(window.location.search).get('email');

      if (!token || !email) {
        setMessage('Invalid confirmation link');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/Account/confirm_email`, {
        params: { token, Email: email },
      });

      setMessage(response.data);
    } catch (error) {
      setMessage('Error confirming email');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  return (
    <div className="login-page">
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <img src={customLogo} alt="Custom Logo" style={imageStyle} />
            <div>
              <h2 className="h2" style={{ color: 'rgb(2, 83, 204)', display: 'block', textAlign: 'center', textDecoration: 'underline' }}>Begin Your Journey With <span className='sp' style={{ fontWeight: 'bold' }}>IYKONS</span></h2>
              <h7 className="h3" style={{ color: 'rgb(2, 83, 204)', display: 'block', textAlign: 'center' }}>Begin your business with the right assistance.</h7>
            </div>
            <MDBCardImage src={process.env.PUBLIC_URL + '/login.png'} alt="login form" style={imageStyle1} />
          </MDBCol>

          <MDBCol md="6" style={{ backgroundColor: 'rgb(2, 83, 204)' }}>
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <span className="h1 fw-bold mb-0" style={{ color: 'white' }}>IYKONS</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px', color: 'white' }}>Create account</h5>

              <input className="form-control mb-4" name="firstName" placeholder="First name" type="text" value={registrationData.firstName} onChange={handleInputChange} style={{ color: 'black' }} />
              <input className="form-control mb-4" name="lastName" placeholder="Last name" type="text" value={registrationData.lastName} onChange={handleInputChange} style={{ color: 'black' }} />
              <input className="form-control mb-4" name="email" placeholder="Email" type="email" value={registrationData.email} onChange={handleInputChange} style={{ color: 'black' }} />
              <input className="form-control mb-4" name="password" placeholder="Password" type="password" value={registrationData.password} onChange={handleInputChange} style={{ color: 'black' }} />
              <button className="btn btn-primary" onClick={handleRegister}>Register</button>
              <div>{message}</div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
    </div>
  );
}

export default Signup;
