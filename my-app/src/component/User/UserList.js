import React, { useContext, useRef } from "react";
import $ from "jquery";
import UserPopUp from "./UserPopUp";
import UserContext from "../context/UserContext/UserContext";
import MainContext from "../context/mainContext";
import DataTable from "react-data-table-component";
import Spinner from "../Spinner";
import GetData from "../hooks/GetData";
import {toast} from 'react-toastify';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { GrFormView } from 'react-icons/gr'
import View from "../Action/View";
import Delete from "../Action/Delete";
import Edit from "../Action/Edit";
const UserList = () => {
  const { setUser, user, initialValue, userList, loading ,
    status,setStatus,GetUser,setActive,setExit,setViewpopUp,setId,
   setDeletepopUp,setEditpopup,setUserList,originalList} =
    useContext(UserContext);
    const {url}=useContext(MainContext)
    
  const handleAdd = () => {
    $(".addpopupBg").fadeIn(500);
    $(".addpopUp").fadeIn(500);
    setUser(initialValue);
    setActive(false)
    setExit(false)
  };
  const handleStatus=(id,status)=>{
    const dataForm = {
      flag: "US",
      status:status,
      UserID:id,
      Type: "POST",
      FetchURL: `${url}/user`,
    };
    if(status==='1'){
      dataForm.status='2'
    }else{
      dataForm.status='1'
    }
    // console.log("id",id)
    GetData(dataForm).then(function(result){
      // console.log(result)
      if(result.StatusCode===200){
        toast.success(result.Message,{theme:"light"})
        GetUser()
      }
      else{
        toast.error(result.Message,{theme:"light"})
      }
    })

  }
  const columns = [
    {
      name: "S.N",
      width:"70px",
      selector: (row, index) => index + 1,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "RoleName",
      selector: (row) => row.roleName,
    },
    // {
    //   name: "Status",
    //   selector: (row) =>row.status==='1'?
    //   <span className="badge rounded-pill bg-danger" onClick={()=>handleDeactivate(row._id)} >Deactive</span>:
    //   <span className="badge rounded-pill bg-success">Active</span>,
    // },

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
        <span onClick={()=>handleView(row._id)}><GrFormView/></span>
        <span className="mx-1" onClick={()=>handleEdit(row._id)}><AiOutlineEdit/></span>
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
// console.log("value",status);
const handleView=(id)=>{
setViewpopUp(true)
setId(id)
}
const handleEdit=(id)=>{
setEditpopup(true)
setId(id)
}
const handleDelete=(id)=>{
console.log('delete')
setDeletepopUp(true)
setId(id)
}
const searchInput=useRef('')
const handleSearch=(e)=>{
e.preventDefault()
const searchResult=searchInput.current.value.toLowerCase()
if(searchResult){
const searchOutput=originalList.filter((list)=>(
list["name"].toLowerCase().includes(searchResult)
))
if(searchOutput){
  setUserList(searchOutput)
}
else{
  setUserList({})
}
}
else{
  setUserList(originalList)
}

}
  return (
    <>
    
      <UserPopUp user={user} setUser={setUser} />
      <View/>
      <Delete/>
      <Edit/>
      <div>
        <div className="d-flex justify-content-between">
          <div>
            <select value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="-1">All</option>
              <option value="1">Active</option>
              <option value="2">Deactive</option>
            </select>
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleAdd}>
              Add
            </button>
          </div>
         
        </div>
        <div className="d-flex justify-content-end mt-1">
            <input type="text" onChange={handleSearch} ref={searchInput}/>
          </div>

        {loading ? (
          <Spinner />
        ) : (
          <DataTable
            columns={columns}
            data={userList}
            pagination
            fixedHeader
            highlightOnHover
            pointerOnHover
            responsive
            dense
            striped
          />
        )}
      </div>
    </>
  );
};

export default UserList;
