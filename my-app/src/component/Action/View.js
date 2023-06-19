import React, { useEffect } from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext/UserContext'
import $ from 'jquery'
import {AiOutlineClose} from 'react-icons/ai'
import Spinner from '../Spinner'
import './action.css'
const View = () => {
const {viewpopUp,setViewpopUp,info,setId} = useContext(UserContext)
const data=info[0]
// console.log("data",data);
useEffect(()=>{
    if(viewpopUp){
    $('.viewpopupBg').fadeIn(500)
    $('.viewpopUp').fadeIn(500)
    }
  
},[viewpopUp])

const handleClose=()=>{
    $('.viewpopupBg').fadeOut(500)
    $('.viewpopUp').fadeOut(500)
    setViewpopUp(false)
    setId(null)
}
  return (
    <div>
            <div className='popupBg viewpopupBg'>
                <div className="popUp viewpopUp">
                    <div className="header">
                        <h6 className='m-0'>Data information</h6>
                        {/* <span className='close' onClick={handleClose}><AiOutlineClose /></span> */}
                    </div>
                    <div className="body">
                         {info.length===0?(<Spinner/>):(
                            <div className="container">
                            <tr>
                                <th>Name</th>
                                <td>{data.name}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td> {data.email}</td>
                            </tr>
                            <tr>
                                <th>Role</th>
                                <td> {data.roleName}</td>
                            </tr>
                        </div>
                         )}
                            

                    </div>

                    <div className="popup-close p-2 text-end buttons">
                        <button type="button" className="btn btn-danger ms-3" onClick={handleClose}>Close</button>
                    </div>

                </div>
            </div>
        </div>
  )
}

export default View