import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com'; // Replace with your API URL

function App() {
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'johndoe@example.com',
        Password: 'password',
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: ' + error.response.data);
    }
  };

  const handleConfirmEmail = async () => {
    try {
      const token = 'your-email-confirmation-token'; // Replace with the actual token
      const email = 'johndoe@example.com'; // Replace with the actual email
      const response = await axios.get(`${API_BASE_URL}/confirm_email`, {
        params: { token, Email: email },
      });
      setMessage(response.data);
    } catch (error) {
      setMessage('Error: ' + error.response.data);
    }
  };

  return (
    <div>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleConfirmEmail}>Confirm Email</button>
      <div>{message}</div>
    </div>
  );
}

export default App;
