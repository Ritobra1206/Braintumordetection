import React, { useState } from 'react';
import './Otp.css';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { otp } from '../../actions/user';
import {useNavigate} from 'react-router-dom'

const Otp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null); // Use null instead of an empty string
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
const dispatch = useDispatch();
  const handleGenerateOTP = () => {
    try {
      if (name && email && photo) {
        setSuccessAlert(true);
        setErrorAlert(false);
        
         dispatch(otp(name,email,photo))
        navigate(`/register/${email}`)
      } else {
        setErrorAlert(true);
        setSuccessAlert(false);
  
        
      }
    } catch (error) {
      setErrorAlert(true);
        setSuccessAlert(false);
    }
  };

  return (
    <div className="parentcontainer">
      <div className="otp-container">
        <h2>Brain Tumor Detection Site</h2>
        <form className="otp-form" encType='multipart/form-data'>
          <div className="otp-form-image" style={{ display: 'flex', justifyContent: 'center' }}>
            <label htmlFor="photoInput" className="file-input-label">
              Upload Photo
              <input
                type="file"
                id="photoInput"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])} // Use e.target.files[0] to get the file
                className="file-input"
                required
              />
            </label>
            {photo && (
              <Avatar alt="profile" src={URL.createObjectURL(photo)} sx={{ width: '8vh', height: '8vh' }} />
            )}
          </div>
          <div className="otp-form-input">
            <label className="form-label">
              <p>Name:</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
              />
            </label>
            <br />
            <label className="form-label">
              <p>Email:</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </label>
          </div>
          <br />
          <button type="button" onClick={handleGenerateOTP} className="generate-btn">
            <a href={`/register/${email}`} style={{color:'white',textDecoration:'none'}}>Generate OTP</a>
          </button>

          {successAlert && (
            <Alert variant="outlined" severity="success">
              Check your mail for OTP
            </Alert>
          )}

          {errorAlert && (
            <Alert variant="outlined" severity="error">
              Please enter all fields
            </Alert>
          )}

          <p>
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Otp;
