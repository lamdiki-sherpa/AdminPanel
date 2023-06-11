import React,{useContext, useState}from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import './Navbar.css'
import {FaBars} from 'react-icons/fa'
import UserContext from '../context/UserContext/UserContext'
import $ from 'jquery'
const Navbar = () => {
    const navigate=useNavigate()
    const {show,setShow}=useContext(UserContext)
    const {logout,user}=useContext(AuthContext)
    const handleClick=()=>{
      
       $('.logoutpopupBg').fadeIn(500)
       $('.logoutpopUp').fadeIn(500)

    }
    const handleLogout=()=>{
      localStorage.clear()
        navigate('/')
        logout()
    }
    const handleSidebar=()=>{
      setShow(!show)
    }
    const handleClose=()=>{
      $('.logoutpopupBg').fadeOut(500)
      $('.logoutpopUp').fadeOut(500)
    }
  const LogoutPopUp=()=>{
    return(
      <div className='popupBg logoutpopupBg'>
      <div className='popUp logoutpopUp text-center'>
        <h6> Are you sure you want to logout?</h6>
        <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
        <button className='btn btn-danger mx-1' onClick={handleClose}>close</button>
       
      </div>
      </div>
    )
  }
  return (
<nav className="navbar navbar-light navbar__header">
  <div className="container-fluid">
   {/* <h4>Smartip</h4> */}
   <div className='icon' onClick={handleSidebar}>
   <FaBars/>
   </div>
  
   <div className='d-flex'>
    <div className='info'>
   <h6 className='mx-1'>{user.Name}</h6>
   <span className='mx-1'>{user.RoleName}</span>
    </div>
   
   <button className='btn btn-light text-primary ms-3'onClick={handleClick}>Logout</button>
   </div>
   
  </div>
  <LogoutPopUp/>
</nav>
  )
}

export default Navbar