import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext/UserContext'
import $ from 'jquery'
import './action.css'
const Edit = () => {
    const {editpopup,setEditpopup,user,setUser}=useContext(UserContext)
    const [isChecked,setIsChecked]=useState(false)
    useEffect(()=>{
    if(editpopup){
    $('.editpopupBg').fadeIn(500)
    $('.editpopUp').fadeIn(500)
    }
    },[editpopup])
    const handleEdit=()=>{

    }
    const handleClose=()=>{
        $('.editpopupBg').fadeOut(500)
        $('.editpopUp').fadeOut(500)
        setEditpopup(false)
    }
    const handleChange=(e)=>{
        e.preventDefault()
 const {name,value}=e.target
  setUser({...user,[name]:value})
    }
    const validate = (value) => {
        const errors = {}
        if (!value.name) {
            errors.name = "name is required"
        }

        if (!value.role) {
            errors.role = "role is required"
        }
        return errors
    }
  return (
    <div className='popupBg editpopupBg'>
        <div className="popUp editpopUp">
            <div className='popUp__header'>
                <h6>Edit</h6>
            </div>
            <div className="popup-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input className='form-control' onChange={handleChange} name="name" value={user.name} type="text" id="name" />
                                    {/* {error.name && (<p>{error.name}</p>)} */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <input className='form-control' onChange={handleChange} name="role" value={user.role} type="text" id="role" />
                                    {/* {error.role && (<p>{error.role}</p>)} */}
                                </div>
                            </div>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" checked={isChecked} type="checkbox" name='check' id="flexCheckDefault" onChange={() => setIsChecked(!isChecked)} />
                            <label class="form-check-label" for="flexCheckDefault">
                                Check the checkbox to close
                            </label>
                        </div>

                    </div>

                    <div className="popup-close p-2 text-end">
                        <button type="button" className="btn btn-primary" onClick={handleEdit}>
                            Edit
                        </button>
                        <button type="button" className="btn btn-danger ms-3" onClick={handleClose}>Close</button>
                    </div>

                </div>

        </div>
  )
}

export default Edit