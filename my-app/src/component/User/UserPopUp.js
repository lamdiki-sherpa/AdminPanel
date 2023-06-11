import React,{useContext, useEffect, useState} from 'react'
import './UserPopUp.css'
import $ from 'jquery'
import UserContext from '../context/UserContext/UserContext'
import imageplus from '../../image/plus.png'
import {AiFillCloseSquare} from 'react-icons/ai'
const UserPopUp = ({user,setUser}) => {
    const {active,setActive,addUser,exit,setExit}=useContext(UserContext)
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
            $(".popupBg").fadeOut(500)
            $(".popUp").fadeOut(500)
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
    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
          let reader = new FileReader();
          reader.onload = function (e) {
            setImage(e.target.result);
            setIsUploaded(true);
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      };
  const splitImage=image.split(",")[1]
  console.log("split",splitImage);
  return (
    <div className='popupBg addpopupBg'>
    <div className='popUp addpopUp'>
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
        <div className='mb-3'>
            <label>Rolename</label>
            <input type='text'
            className='form-control' 
            name='roleName'
             value={user.roleName}
             onChange={handleChange}/>
             {error.roleName && (<div>{error.roleName}</div>)}
        </div>
        <div>

        <input type='checkbox' id='active' onChange={()=>setActive(!active)} checked={active}/>
        <label htmlFor='active' className='ms-2'>active</label>
        </div>
        <div>

        <input type='checkbox' id='exit' onChange={()=>setExit(!exit)} checked={exit}/>
        <label className='ms-2' htmlFor='exit'>Exit on checked</label>
        </div>
        <div className='imageUpload'>
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
        </div>
        
        <button className='btn btn-primary' onClick={handleSubmit}>submit</button>
        <button className='btn btn-danger mx-1' onClick={handleCancel}>cancel</button>
        
    </div>
    </div>
  )
}

export default UserPopUp