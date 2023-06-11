import { useContext, useEffect, useState } from "react";
import RoleContext from "./RoleContext";
import MainContext from "../mainContext";
import GetData from "../../hooks/GetData";
import UserContext from "../UserContext/UserContext";
import {toast} from 'react-toastify'
import $ from 'jquery'
const RoleState=(props)=>{
const {url}=useContext(MainContext)
const initialValue = {
    roleName:''
}
const {GetActiveRole}=useContext(UserContext)
const [role,setRole]=useState(initialValue)
const [roleList,setRoleList]=useState([])
const [status,setStatus]=useState('-1')
const [loading,setLoading]=useState(true)
const [editing,setEditing]=useState(false)
const [id,setId]=useState(null)
useEffect(()=>{
    GetRole()
},[status])
const GetRole=()=>{
    const dataForm = {
        flag: "S",
        status:status,
        Type: "POST",
        FetchURL: `${url}/roleName`,
      };
      GetData(dataForm).then(function (result) {
        if (result.StatusCode === 200) {
          const postResult = result.Values ? result.Values : "";
          setRoleList(postResult);
          setLoading(false)
        } else {
          setLoading(false)
        }
      });
}
console.log("roles",roleList);
const AddRole=()=>{
const dataForm={
    flag:"I",
    roleName:role.roleName,
    Type:"POST",
    FetchURL:`${url}/roleName`
}
GetData(dataForm).then(function(result){
    if(result.StatusCode===200){
        toast.success(result.Message,{theme:"light"})
        GetRole()
        GetActiveRole()
        setRole(initialValue)
    }else{
        toast.error(result.Message,{theme:"light"})
      }
})
}
const deleteRole= () => {
    const DeleteData = {
        flag: "D",
        RoleID: id,
        FetchURL: `${url}/roleName`,
        Type: "POST"
    }
    GetData(DeleteData).then(function (result) {
        if (result.StatusCode === 200) {
            toast.success("Deleted successfully", { theme: "light" })
            GetRole()
            GetActiveRole()
            
        }
        else {
         
            toast.error(result.Message, { theme: "light" })

        }
    })


  
  }
  const EditRole=()=>{
    const dataForm={
        flag:"U",
        roleName:role.roleName,
        RoleID:id,
        Type:"POST",
        FetchURL:`${url}/roleName`
      }
      GetData(dataForm).then(function(result){
        if(result.StatusCode===200){
          toast.success(result.Message,{theme:"light"})
          setRole(initialValue)
          GetActiveRole()
          GetRole()

        }else{
          toast.error(result.Message,{theme:"light"})
        }
      })
  }
return <RoleContext.Provider value={{role,setRole,status,
setStatus,AddRole,GetRole,roleList,initialValue,id,setId,
deleteRole,editing,setEditing,EditRole}}>
    {props.children}
</RoleContext.Provider>
}
export default RoleState