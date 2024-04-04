// Profile.js
import React from 'react';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import './profile.css';
import { deleteProfile } from '../../actions/user';

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user.user);

  const profileDeleteHandler = () => {
    dispatch(deleteProfile());
  };

  return (
    <div className="profileParentContainer">
      <div className="profileContents">
        <div className="profileAvatar">
          <Avatar alt="profile" src={user.avatar.url}  sx={{ width: '15vh', height: '15vh' }}/>
        </div>
        <div className="profileName" style={{display:'flex'}}>
          <div className="nameHeading">
            <h5>NAME:</h5>
          </div>
          <div className="nameShow">
            <p>{user.name}</p>
          </div>
        </div>
        <div className="profileEmail" style={{display:'flex'}}>
          <div className="emailHeading">
            <h5>EMAIL:</h5>
          </div>
          <div className="emailShow">
            <p>{user.email}</p>
          </div>
        </div>
        <div className="profilePrevDetections">
          <table>
            <thead>
              <tr>
                <th>Result</th>
                <th>Checked On</th>
              </tr>
            </thead>
            <tbody>
              {user.history ? (
                user.history.map((detection, index) => (
                  <tr key={index}>
                    <td>{detection.result.toString()}</td>
                    <td>{detection.checked}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No data to show</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="profileDelete">
          <button onClick={profileDeleteHandler}>
         <a href='/' style={{color:'white',textDecoration:'none'}}> <DeleteIcon /></a>
          </button> 
        </div>
      </div>
    </div>
  );
};

export default Profile;
