import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {Drawer,IconButton} from '@mui/material'
import {Menu,ChevronLeft,Home,Login,Logout,Face,ImageSearch} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'

import "./Header.css"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/user';
const Header = () => {
  const {isAuthenticated} = useSelector((state)=>state.user)
const [open,setOpen]=useState(false);
const navigate = useNavigate();
const disatch = useDispatch();
const drawerHandler = ()=>{
  setOpen(!open);
  

  if(isAuthenticated){
    document.querySelector(".drawerLogin").style.display='none'
  }
  else{
    const loggedin_features = document.querySelectorAll(".drawerLogut,.drawerProfile,.drawerDetect")
    loggedin_features.forEach(element => {
     element.style.display = 'none';
   });
  }
  
}

const logoutHandler = async ()=>{
 await disatch(logout())

}

  return (
    <div className="navbar">
      <IconButton style={{color:'white'}} onClick={drawerHandler}>
        <Menu style={{fontSize:'2vw'}}/>
      </IconButton>
<Drawer anchor="left" variant="persistent" open ={open}  >

<div className="drawerHeader" style={{display:'flex',justifyContent:'flex-end'}}><IconButton onClick={drawerHandler}><ChevronLeft/></IconButton>

</div>
<hr style={{minWidth:'200px'}}/>
<div className="drawerItems" >

<div className="drawerHome" style={{padding:'20px'}}>
<Link to="/" style={{color:'black',textDecoration:'none'}}><span onClick={drawerHandler}><Home /> Home</span></Link>
</div>

<div className="drawerLogin" style={{padding:'20px'}}>
<Link to="/login" style={{color:'black',textDecoration:'none'}} ><span onClick={drawerHandler}><Login /> Login</span></Link>
</div>

<div className="drawerLogut" style={{padding:'20px'}} onClick={logoutHandler}>
<a href='/' style={{color:'black',textDecoration:'none'}}><IconButton onClick={drawerHandler} ><Logout /> </IconButton> Logout</a>
</div>

<div className="drawerProfile" style={{padding:'20px'}}>
<Link to="/profile" style={{color:'black',textDecoration:'none'}}><span onClick={drawerHandler}><Face /> Profile</span></Link>
</div>

<div className="drawerDetect" style={{padding:'20px'}}>
<Link to="/detect" style={{color:'black',textDecoration:'none'}}><span onClick={drawerHandler}><ImageSearch  /> Detect</span> </Link>
</div>

</div>

</Drawer>
      <h1 className="logo" style={{marginLeft:'3vw'}}>Brain Tumor Detection Site</h1>
      
    </div>
  )
}

export default Header