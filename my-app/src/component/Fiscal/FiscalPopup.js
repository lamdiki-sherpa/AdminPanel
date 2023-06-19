import React, { useContext, useState,useEffect } from 'react'
import $ from 'jquery'
import FiscalContext from '../context/FiscalContext/FiscalContext'
import './fiscal.css'
const FiscalPopup = () => {
    const {formValue,setFormValue,AddFiscal}=useContext(FiscalContext)
    const [submit,setSubmit]=useState(false)
    const [error,setError]=useState({})
    console.log("formValue",formValue)
    const handleCancel=()=>{
        $(".fiscalpopupBg").fadeOut(1000)
        $(".fiscalpopUp").fadeOut(1000)
        setError({})
    }
    const validate=(values)=>{
    const error={}
        if(!values.startYear){
            error.startYear="required"
        }
        if(!values.endYear){
            error.endYear="required"
        }
        return error
        }
    const handleSubmit=(e)=>{
        e.preventDefault()
        setError(validate(formValue))
        setSubmit(true)
        }
    const handleChange=(e)=>{
        e.preventDefault()
        const {name,value}=e.target
        setFormValue({...formValue,[name]:value})
        }
useEffect(()=>{
if(Object.keys(error).length===0 && submit){
    AddFiscal()
    setSubmit(false)
    $(".fiscalpopupBg").fadeOut(1000)
    $(".fiscalpopUp").fadeOut(1000)
}
    else{
        setSubmit(false)
        }
},[error])

  return (
    <>
    <div className='popupBg fiscalpopupBg'>
    <div className='popUp fiscalpopUp'>
    <div className='header'>Add fiscal</div>
      <div className='body'>
        <div>
            <label>StartYear</label>
            <input type='text'
            className='form-control' 
            name='startYear'
            value={formValue.startYear}
            onChange={handleChange}/>
              {error.startYear&& (<div>{error.startYear}</div>)}
        </div>
        <div>
            <label>End Year</label>
            <input type='text'
            className='form-control' 
            name='endYear'
             value={formValue.endYear}
             onChange={handleChange}/>
             {error.endYear&& (<div>{error.endYear}</div>)}
        </div>
    <button className='btn btn-primary mt-3' onClick={handleSubmit}>add</button>
    <button className='btn btn-danger mx-1 mt-3' onClick={handleCancel}>cancel</button>
        </div>
    
    </div>
    </div>
    </>
  )
}

export default FiscalPopup