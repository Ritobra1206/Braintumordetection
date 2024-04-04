import React, { useState } from 'react';
import './Login.css'; // Import your CSS file
import { useDispatch } from 'react-redux';
import { login } from '../../actions/user';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
const logingHandler = async()=>{
  
   await dispatch(login(email,password))
   window.location.reload();
   navigate('/detect')
}
  return (
    <div className="login-container">
      <div className="background-animation"></div>
      <div className="login-form">
        <h2>Login</h2>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            className="form-input"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            className="form-input"
          />
        </label>
        <button type="button" onClick={logingHandler}  className="login-btn">
          Login
        </button>
        <p>
            Not registered yet? <Link to="/register">Register</Link>
          </p>
      </div>
    </div>
  );
};

export default Login;
