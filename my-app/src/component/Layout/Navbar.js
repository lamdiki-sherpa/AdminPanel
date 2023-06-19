import React,{useContext, useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import './Navbar.css'
import {FaBars} from 'react-icons/fa'
import UserContext from '../context/UserContext/UserContext'
import $ from 'jquery'
import UsewindowDimension from '../hooks/UsewindowDimension.js'
import FiscalContext from '../context/FiscalContext/FiscalContext'

const Navbar = () => {
   
    const {width}=UsewindowDimension()
    const {show,setShow,smallScreen,setSmallScreen}=useContext(UserContext)
    const {logout,user}=useContext(AuthContext)
    const {activeFiscal}=useContext(FiscalContext)
    // console.log("active",activeFiscal)
    const handleClick=()=>{
      
       $('.logoutpopupBg').fadeIn(500)
       $('.logoutpopUp').fadeIn(500)

    }
 
    const handleSidebar=()=>{
      setShow(!show)
    }

    // console.log(smallScreen)
    // console.log("width",width)

    useEffect(() => {
      if(width<960){
        setShow(false)
        setSmallScreen(true)
      }else{
        setShow(true)
        setSmallScreen(false)
      }
    }, [width])
    

    

  return (
<>
  <div className="container-fluid">
   {/* <h4>Smartip</h4> */}
   <div className='icon' onClick={handleSidebar}>
   <FaBars/>
   {activeFiscal.map((active)=>{
    const {startYear,endYear}=active
    return <span className='mx-3 mt-1'>Fiscal year:{startYear}-{endYear}</span>
   })}
   {/* <span>Fiscal year:{activeFiscal.startYear}-{activeFiscal.endYear}</span> */}
   </div>
  
   <div className='d-flex'>
    <div className='info'>
   <h6 className='mx-1'>{user.Name}</h6>
   <span className='mx-1'>{user.RoleName}</span>
    </div>
   
   <button className='btn btn-light text-primary ms-3'onClick={handleClick}>Logout</button>
   </div>
   
  </div>
 
</>
  )
}

export default Navbar