import React, { useState } from 'react';
import "./Register.css"
import { useParams } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/user';
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const { email } = useParams();
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const handleRegister = () => {
    try {
      if (otp && email && password) {
        setSuccessAlert(true);
        setErrorAlert(false);
        dispatch(register(otp,password,email))
       navigate('/detect')
      } else {
        setErrorAlert(true);
        setSuccessAlert(false);
  
        
      }
    } catch (error) {
      setErrorAlert(true);
    }
    console.log(`OTP: ${otp}, Password: ${password}`);
  };

  return (
    <div className="parentcontainer">
      <div className="register-container">
      <h2>Register</h2>
      <form className="register-form">
        <label className="form-label">
          OTP:
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister} className="register-btn">
          Register
        </button>
        {successAlert && (
            <Alert variant="outlined" severity="success">
              Registered successfully
            </Alert>
          )}

          {errorAlert && (
            <Alert variant="outlined" severity="error">
              Please enter all fields
            </Alert>
          )}
      </form>
    </div>
    </div>
  );
};

export default Register;
