import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyOtp = () => {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ otp: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const verifyOTP = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('No email provided. Please request an OTP first.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/verifyotp', {
        email,
        otp: formData.otp,
      });

      toast.success("OTP verified successfully!");
      console.log("Server Response:", res.data);
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data || error.message);
      toast.error("OTP verification failed!");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      {email ? (
        <form onSubmit={verifyOTP}>
          <label>Enter OTP:</label>
          <input type="text" name="otp" value={formData.otp} onChange={handleChange} required />
          <br /><br />
          <button type="submit">Verify OTP</button>
        </form>
      ) : (
        <div>
          <p>No email found in navigation state.</p>
          <button onClick={() => navigate ? navigate('/') : window.history.back()}>Go back</button>
        </div>
      )}
    </div>
  );
};

export default VerifyOtp;