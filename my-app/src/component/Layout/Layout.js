import React, { useContext } from "react";
import Navbar from "./Navbar";
import SidebarComponent from "./Sidebar";
import Toast from "../Toast";
import "./layout.css";
import UserContext from "../context/UserContext/UserContext";
import AuthContext from '../context/AuthContext'
import $ from 'jquery'
import { useNavigate } from "react-router-dom";
const Layout = (props) => {
  const navigate=useNavigate()
  const { show, smallScreen } = useContext(UserContext);
  const {logout,user}=useContext(AuthContext)
  const handleClose=()=>{
    $('.logoutpopupBg').fadeOut(500)
    $('.logoutpopUp').fadeOut(500)
  }
  const handleLogout=()=>{
    localStorage.clear()
      navigate('/')
      logout()
  }
const LogoutPopUp=()=>{
  return(
    <div className='popupBg logoutpopupBg'>
    <div className='popUp logoutpopUp'>
      <h6> Are you sure you want to logout?</h6>
      <div className='d-flex justify-content-end buttons'>
      <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
      <button className='btn btn-danger mx-1' onClick={handleClose}>close</button>
      </div>
    </div>
    </div>
  )
}

  return (
    <div>
      <Toast />
      <LogoutPopUp/>
      <div className="main d-flex">
        {!smallScreen ? (
          <>
            <nav
              className={show ? "navbar navbar__header" : "navbar navbar__wide"}
            >
              <Navbar />
            </nav>
            <div className={show ? "sidebar" : "sidebar__hide"}>
              <SidebarComponent />
            </div>

            <div className={show ? "side__content" : "side__contentshow"}>
              {props.children}
            </div>
          </>
        ) : (
          <>
            <nav
              className="navbar navbar__wide"
            >
              <Navbar />
            </nav>
            <div className="sidebar__hide">
              <SidebarComponent /> 

            </div>

            <div className="side__contentshow">{props.children}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
