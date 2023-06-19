import React,{useContext, useEffect, useState} from 'react'
import $ from 'jquery'
import DataTable from "react-data-table-component";
import UserContext from '../context/UserContext/UserContext'
import MainContext from '../context/mainContext';
import GetData from '../hooks/GetData';
import RoleContext from '../context/RoleContext/RoleContext';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import {toast} from 'react-toastify'
const RolePopUp = () => {
    const [error,setError]=useState({})
    const {url}=useContext(MainContext)
    const {GetActiveRole}=useContext(UserContext)
    const {role,setRole,AddRole,roleList,GetRole,setId,deleteRole,setEditing,editing,EditRole,initialValue}=useContext(RoleContext)
    const [submit,setSubmit]=useState(false)
    const [editSubmit,setEditSubmit]=useState(false)
    
    const handleCancel=()=>{
        $(".rolepopupBg").fadeOut(500);
        $(".rolepopUp").fadeOut(500);
        setError({})
    }
   
    const columns = [
        {
          name: "S.N",
          width:"70px",
          selector: (row, index) => index + 1,
        },
        {
          name: "RoleName",
          selector: (row) => row.roleName,
        },
    
         {
          name: "Status",
          selector: (row) =>
            (<button className="border-0" onClick={()=>handleStatus(row._id,row.status)}>
              <span>
                {checkStatus(row.status)}
              </span>
            </button>)
          
         
        },
        {
          name:"Action",
          selector:(row)=>(
            <>
            <span className="mx-1" onClick={()=>handleEdit(row)}><AiOutlineEdit/></span>
            <span className="mx-1" onClick={()=>handleDelete(row._id)}><AiOutlineDelete/></span>
            </>
          )
        }
    
    
      ];
      const checkStatus=(status)=>{
        if(status==='1'){
         return (<span className="badge rounded-pill bg-danger">Deactive</span>)
        }
        else if(status==='2'){
         return (<span className="badge rounded-pill bg-success">Active</span>)
        }
       }
    const handleChange=(e)=>{
    e.preventDefault()
    const {name,value}=e.target
    setRole({...role,[name]:value})
    }
    const handleStatus=(id,status)=>{
        const dataForm = {
            flag: "US",
            status:status,
            RoleID:id,
            Type: "POST",
            FetchURL: `${url}/roleName`,
          };
          if(status==='1'){
            dataForm.status='2'
          }else{
            dataForm.status='1'
          }
          GetData(dataForm).then(function(result){
            if(result.StatusCode===200){
              toast.success(result.Message,{theme:"light"})
              GetRole()
              GetActiveRole()
            }
            else{
              toast.error(result.Message,{theme:"light"})
            }
          })
       }
    const handleEdit=(row)=>{
     setEditing(true)
     setId(row._id)
     setRole({roleName:row.roleName})
      }
      const handleDelete=(id)=>{
      setId(id)
      deleteRole()
      }
      const handleAdd=(e)=>{
        e.preventDefault()
        setSubmit(true)
        setError(validate(role))
      }
      const validate=(value)=>{
        const error={}
        if(!value.roleName){
            error.roleName="role name is required"
        }
        return error 
      }
 useEffect(()=>{
    if(Object.keys(error).length===0 && submit){
     AddRole()
     setSubmit(false)
    }else{
        setSubmit(false)
     }
 },[error])

 const editHandler=(e)=>{
    e.preventDefault()
    setError(validate(role))
    setEditSubmit(true)
    
    }
 useEffect(()=>{
    if(Object.keys(error).length===0 && editSubmit){
    EditRole()
    setEditSubmit(false)
    }else{
        setEditSubmit(false)
    }
 },[error])
  return (
    <div className='popupBg rolepopupBg'>
    <div className='popUp rolepopUp'>
        {editing?(
            <div className='header'>
        Edit Role
     </div>):( <div className='header'>
        Add Role
     </div>)}
     <div className='body'>
     <div className='mb-3'>
            <label>RoleName</label>
            <input type='text'
            className='form-control' 
            name='roleName'
            value={role.roleName}
            onChange={handleChange}
            />
    </div>
    <div className='buttons'>
       {editing?( <button className='btn btn-primary'onClick={editHandler}>Edit</button>):
       (<button className='btn btn-primary'onClick={handleAdd}>add</button>)}
        <button className='btn btn-danger mx-1' onClick={handleCancel}>cancel</button>
    </div>
   
        <DataTable
         columns={columns}
         data={roleList}
         pagination
         fixedHeader
         highlightOnHover
         pointerOnHover
         responsive
         dense
         striped
        />
   
   </div>
    </div>
    </div>
  )
}

export default RolePopUp