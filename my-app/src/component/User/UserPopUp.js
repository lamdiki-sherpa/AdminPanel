import React,{useContext, useEffect, useState} from 'react'
import './UserPopUp.css'
import $ from 'jquery'
import UserContext from '../context/UserContext/UserContext'
import RoleContext from '../context/RoleContext/RoleContext'
import imageplus from '../../image/plus.png'
import {AiFillCloseSquare} from 'react-icons/ai'
import {AiFillPlusSquare} from 'react-icons/ai'
import RolePopUp from './RolePopUp'
const UserPopUp = ({user,setUser}) => {
    const {active,setActive,addUser,exit,setExit,roleList}=useContext(UserContext)
    const {setRole,initialValue,editing,setEditing}=useContext(RoleContext)
    const [error,setError]=useState({})
    const [submit,setSubmit]=useState(false)
    const [isUploaded, setIsUploaded] = useState(false);
    const [image, setImage] = useState("");
    const validate=(values)=>{
        const error={}
        if(!values.name){
            error.name="name is required"
        }
        if(!values.email){
            error.email="email is required"
        }
        if(!values.password){
            error.password=" password is required"
        }
        if(!values.roleName){
            error.roleName=" rolename is required"
        }
        return error
        }

    const handleSubmit=(e)=>{
    e.preventDefault()
    setError(validate(user))
    setSubmit(true)
    }
    useEffect(()=>{
     if(Object.keys(error).length===0 && submit){
        // const userList=JSON.parse(localStorage.getItem("item") || "[]")
        // userList.push(user)
        // localStorage.setItem("item",JSON.stringify(userList))
        addUser()
        setSubmit(false)
        if(exit){
            $(".addpopupBg").fadeOut(500)
            $(".addpopUp").fadeOut(500)
        }
       
     }
     else{
        setSubmit(false)
     }
    },[error])
    const handleCancel=()=>{
        $(".addpopupBg").fadeOut(1000)
        $(".addpopUp").fadeOut(1000)
        setError({})
    }
    const handleChange=(e)=>{
        e.preventDefault()
    const {name,value}=e.target
    setUser({...user,[name]:value})
    }
    const handleRole=()=>{
     $(".rolepopupBg").fadeIn(500);
     $(".rolepopUp").fadeIn(500);
     setRole(initialValue)
     setEditing(false)
    }
  //   const handleImageUpload = (e) => {
  //       if (e.target.files && e.target.files[0]) {
  //         let reader = new FileReader();
  //         reader.onload = function (e) {
  //           setImage(e.target.result);
  //           setIsUploaded(true);
  //         };
  //         reader.readAsDataURL(e.target.files[0]);
  //       }
  //     };
  // const splitImage=image.split(",")[1]
  // console.log("split",splitImage);
  return (
    <>
    <div className='popupBg addpopupBg'>
    <div className='popUp addpopUp'>
      <div className='header'>Add user</div>
      <div className='body'>
        <div>
            <label>Name</label>
            <input type='text'
            className='form-control' 
            name='name'
            value={user.name}
            onChange={handleChange}/>
              {error.name && (<div>{error.name}</div>)}
        </div>
        <div>
            <label>Email</label>
            <input type='text'
            className='form-control' 
            name='email'
             value={user.email}
             onChange={handleChange}/>
             {error.email && (<div>{error.email}</div>)}
        </div>
        <div>
            <label>Password</label>
            <input type='password'
            className='form-control' 
            name='password'
             value={user.password}
             onChange={handleChange}/>
             {error.password && (<div>{error.password}</div>)}
        </div>

        <div className='mb-3 plus__container'>
            <label>Rolename</label>
            <div className='d-flex'>
            {/* <input type='text'
            className='form-control' 
            name='roleName'
             value={user.roleName}
             onChange={handleChange}/> */}
             <select className='form-select mx-1'  name='roleName'  value={user.roleName}  onChange={handleChange} >
              <option value="" disabled selected>Select Role</option>
              {roleList.map((list)=>{
               const {roleName,_id}=list
               return <option key={_id} value={roleName}> 
                       {roleName}
                      </option>
              })}
             </select>
             {error.roleName && (<div>{error.roleName}</div>)}
             <button className='plus__icon' onClick={handleRole}>
          <AiFillPlusSquare/>
        </button>
        </div>
       
        </div>
        <div>

        <input type='checkbox' id='active' onChange={()=>setActive(!active)} checked={active}/>
        <label htmlFor='active' className='ms-2'>active</label>
        </div>
        <div>

        <input type='checkbox' id='exit' onChange={()=>setExit(!exit)} checked={exit}/>
        <label className='ms-2' htmlFor='exit'>Exit on checked</label>
        </div>
        {/* <div className='imageUpload'>
        {isUploaded ? (
            <div className="image_box">
              <img src={image} alt="" style={{ height: "100px" }} />
              <span
                className="close"
                onClick={() => {
                  setImage("");
                  setIsUploaded(false);
                }}
              >
                <AiFillCloseSquare />
              </span>
            </div>
          ) : (
            <div className="inputField">
              <input type="file" onChange={handleImageUpload} id="image" />
              <label className="image_box" htmlFor="image">
                <img src={imageplus} alt="" style={{ height: "100px" }} />
              </label>
            </div>
          )}
        </div> */}
        
        <button className='btn btn-primary' onClick={handleSubmit}>submit</button>
        <button className='btn btn-danger mx-1' onClick={handleCancel}>cancel</button>
        </div>
    </div>
    </div>
        <RolePopUp/>
    </>
  )
}

export default UserPopUp