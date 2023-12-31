import React, { useContext, useRef } from "react";
import $ from "jquery";
import UserPopUp from "./UserPopUp";
import UserContext from "../context/UserContext/UserContext";
import MainContext from "../context/mainContext";
import DataTable from "react-data-table-component";
import Spinner from "../Spinner";
import GetData from "../hooks/GetData";
import {toast} from 'react-toastify';
import { AiOutlineDelete, AiOutlineEdit ,AiFillFilePdf,AiFillFileExcel} from 'react-icons/ai'
import { GrFormView } from 'react-icons/gr'
import View from "../Action/View";
import Delete from "../Action/Delete";
import Edit from "../Action/Edit";
import jsPDF from 'jspdf'
import "jspdf-autotable"
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
// console.log("value",status);
const handleView=(id)=>{
setViewpopUp(true)
setId(id)
}
const handleEdit=(row)=>{
setEditpopup(true)
setId(row._id)
setUser({name:row.name,roleName:row.roleName})
}
const handleDelete=(id)=>{
console.log('delete')
setDeletepopUp(true)
setId(id)
}
//================================search================================
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
//========================================PDF============================================
const pdfTable=userList.map((item,index)=>({
  ...item,
  Index: index+1,
  Status:item.status==="1"?"Active":"Deactive"
}))
console.log("table",pdfTable);
const column=[
  {header:"S.N",field:"Index"},
  {header:"Name",field:"name"},
  {header:"Role",field:"roleName"},
  {header:"Email",field:"email"},
  {header:"Status",field:"Status"}
]
const exportColumn=column.map((col)=>({
  title:col.header,
  dataKey:col.field
}))
const ToPdf=()=>{
  const doc=new jsPDF("p","pt","a4",true)
  var midPage=doc.internal.pageSize.getWidth()/2
  doc.setFontSize(18)
  doc.text("User list",midPage,50,"center")
  doc.autoTable({
    startY:70,
    theme:"grid",
    columns:exportColumn,
    body:pdfTable
  })

  doc.save("table.pdf")
}
//================================excel=================
const dataToExcel = userList.map((d, i) => ({
  "S.N.": i + 1,
  Name: d.name,
  Email: d.email,
  Role: d.roleName,
  Status: d.status === "1" ? "Active" : "Deactive",
}));

const toExcel = () => {
  console.log("excel");
  import("xlsx").then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(dataToExcel);
    var wscols = [
      { wch: 5 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
    ];
    worksheet["!cols"] = wscols;
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAsExcelFile(excelBuffer, "userlist");
  });
};

const saveAsExcelFile = (buffer, fileName) => {
  import("file-saver").then((module) => {
    if (module && module.default) {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data = new Blob([buffer], {
        type: EXCEL_TYPE,
      });

      module.default.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    }
  });
};
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
          <span className="file" onClick={ToPdf}><AiFillFilePdf size="2rem"/>
          <AiFillFileExcel onClick={toExcel} size="2rem"/></span>
       
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
