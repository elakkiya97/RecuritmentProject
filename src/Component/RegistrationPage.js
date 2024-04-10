import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const API_BASE_URL = "http://localhost:5042";

function App() {
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        FirstName: "John",
        LastName: "Doe",
        Email: "johndoe@example.com",
        Password: "password",
        status:"new"
      });
      setMessage(response.data.message);
      history.push("/");
    } catch (error) {
      setMessage("Error: " + error.response.data);
    }
  };

  const handleConfirmEmail = async () => {
    try {
      const token = "your-email-confirmation-token";
      const email = "johndoe@example.com";
      const response = await axios.get(`${API_BASE_URL}/confirm_email`, {
        params: { token, Email: email },
      });
      setMessage(response.data);
    } catch (error) {
      setMessage("Error: " + error.response.data);
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
