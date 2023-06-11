import React,{useContext} from "react";
import Navbar from "./Navbar";
import SidebarComponent from "./Sidebar";
import Toast from "../Toast";
import './layout.css'
import UserContext from '../context/UserContext/UserContext'
const Layout = (props) => {
  const {show,setShow}=useContext(UserContext)
  return (
    <div>
      <Toast />
      <Navbar />

      <div className="main d-flex">
        <div className={show?"sidebar":"sidebar__hide"}>
          <SidebarComponent />
        </div>
       
          <div className={show?"side__content":"side__contentshow"}>{props.children}</div>
       
      </div>
    </div>
  );
};

export default Layout;
