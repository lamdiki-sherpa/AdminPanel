import React,{useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import GetData from './hooks/GetData';
import Toast from './Toast';
import {toast} from 'react-toastify'
import MainContext from './context/mainContext';
import AuthContext from './context/AuthContext';
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import './login.css'
const Login = () => {
    const navigate=useNavigate()
const {url}=useContext(MainContext)
const {login,isLogin,user}=useContext(AuthContext)
const [error,setError]=useState({})
const [showPassword,setShowPassword]=useState(false)

const [submit,setSubmit]=useState(false)

const initialValue={
    name:'',
    password:''
}

const [people,setPeople]=useState(initialValue)
const validate=(values)=>{
const error={}
if(!values.name){
    error.name="required"
}
if(!values.password){
   error.password="required"
}
return error
}
const handleSubmit=(event)=>{
event.preventDefault()
setError(validate(people))
setSubmit(true)
// localStorage.setItem("value",JSON.stringify(people))
}
useEffect(()=>{
    // console.log("isLogin",isLogin);
    // console.log("user",user)
    if(Object.keys(error).length===0 && submit){
    const dataForm={
        email:people.name,
        password:people.password,
        Type:"POST",
        FetchURL:`${url}/login`
    }
    GetData(dataForm).then(function(result){
        // console.log(result);
        if(result.StatusCode===200){
            const postResult=result.Login[0]
           localStorage.setItem("value",JSON.stringify(postResult))
           login(postResult) 
           
           navigate('/dashboard')
           setSubmit(false)
        }
        else{
         toast.error(result.Message,{
            theme:"light"
         })
         setSubmit(false)
        }

    })
    
    }
    else{
        setSubmit(false)
    }
},[error])

const handleChange=(e)=>{
    e.preventDefault()
    const {name,value}=e.target
    setPeople({...people,[name]:value})
    
}
  return (
    <>
    <Toast/>
    <div className='login__main'>
        <div className="wrapper">

    <form onSubmit={handleSubmit} >
    <div>
        <label>Enter Email</label>
        <input type='text'
        value={people.name}
        name='name'
        onChange={handleChange}
        className='form-control'
        />
        {error.name && (<div>{error.name}</div>)}
        
    </div>
    <div>
        <label>Enter Password</label>

        <div  className=' position-relative'>

        <input type={showPassword?"text":"password"}
        value={people.password}
        name='password'
        onChange={handleChange}
        
        className='form-control'
        />
        <span className='eye__icon' onClick={()=>setShowPassword(!showPassword)}>
          {!showPassword?
           <Tippy content="Show Password">
            <span>

          <AiFillEyeInvisible color='#555'/>
            </span>
           </Tippy>
         :
         <Tippy content="Hide Password">
            <span>
            <AiFillEye color='#555'/>
            </span>
          
          </Tippy>
          }  
            </span>
        </div>
        
       
         {error.password && (<div>{error.password}</div>)}
    </div>
<button className='btn btn-primary mt-3'>{submit?"Loading":"Login"}</button>
    </form>
        </div>
    
    </div>
    </>
  )
}

export default Login

