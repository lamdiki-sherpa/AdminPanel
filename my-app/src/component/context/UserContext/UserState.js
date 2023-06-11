import UserContext from "./UserContext";
import { useContext, useEffect, useState } from "react";
import MainContext from "../mainContext";
import GetData from "../../hooks/GetData";
import {toast} from 'react-toastify'
import $ from 'jquery'
const UserState = (props) => {
  const { url } = useContext(MainContext);
  const initialValue = {
    name: "",
    email: "",
    password:"",
    roleName:"",
  };
 const [status,setStatus]=useState('-1')
  const [user, setUser] = useState(initialValue);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active,setActive]=useState(false)
  const [exit,setExit]=useState(false)
  const[show,setShow]=useState(false)
  const [viewpopUp,setViewpopUp]=useState(false)
  const [info, setInfo] = useState([])
  const [id, setId] = useState(null)
  const [deletepopUp,setDeletepopUp]=useState(false)
  const [isDeleting,setIsDeleting]=useState(false)
  const [editpopup,setEditpopup]=useState(false)
  const [originalList, setOriginalList] = useState(null)
  const [smallScreen,setSmallScreen]=useState(false)
  
  useEffect(() => {
    GetUser();
  }, [status]);

  const GetUser = () => {
    const dataForm = {
      flag: "S",
      status:status,
      Type: "POST",
      FetchURL: `${url}/user`,
    };
    GetData(dataForm).then(function (result) {
      // console.log(result);
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        setUserList(postResult);
        setOriginalList(postResult)
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  const addUser=()=>{
    const dataForm={
      flag:"I",
      name:user.name,
      email:user.email,
      password:user.password,
      roleName:user.roleName,
      status:active ? "1":"2",
      Type:"POST",
      FetchURL:`${url}/user`
  }
  GetData(dataForm).then(function(result){
    // console.log(result)
    if(result.StatusCode===200){
      toast.success(result.Message,{theme:"light"})
      GetUser()
    }
    else{
      toast.error(result.Message,{theme:"light"})
    }
  })}
const EditUser=()=>{
const dataForm={
  flag:"U",
  name:user.name,
  roleName:user.roleName,
  UserID:id,
  Type:"POST",
  FetchURL:`${url}/user`
}
GetData(dataForm).then(function(result){
  if(result.StatusCode===200){
    toast.success(result.Message,{theme:"light"})
    GetUser()
  }else{
    toast.error(result.Message,{theme:"light"})
  }
})
  }

useEffect(()=>{
GetInfoData()
},[id])
  const GetInfoData=()=>{
    const InfoData = {
      flag: "SI",
      UserID: id,
      FetchURL: `${url}/user`,
      Type: "POST"
  }
  GetData(InfoData).then(function (result) {
      if (result.StatusCode === 200) {
          const postResult = result.Values ? result.Values : ""
          setInfo(postResult)
        
         

      }
      else {
          setInfo([])
         

      }
  })
  }

  const deleteData = () => {
    const DeleteData = {
        flag: "D",
        UserID: id,
        FetchURL: `${url}/user`,
        Type: "POST"
    }
    GetData(DeleteData).then(function (result) {
        if (result.StatusCode === 200) {
            $('.deletepopupBg').fadeOut(500);
            $('.deletepopUp').fadeOut(500);
            GetUser()
            setDeletepopUp(false)
            setIsDeleting(false)
            toast.success("Deleted successfully", { theme: "light" })
        }
        else {
          setIsDeleting(false)
            toast.error(result.Message, { theme: "light" })

        }
    })


  
  }
const [roleList,setRoleList]=useState([])

useEffect(()=>{
    GetActiveRole()
},[])
const GetActiveRole=()=>{
    const dataForm = {
        flag: "S",
        status:"1",
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
  return (
    <UserContext.Provider
      value={{ initialValue, user, setUser, userList,setUserList, loading,status,setStatus,
        GetUser,active,setActive ,addUser,EditUser,roleList,GetActiveRole,
        exit,setExit,show,setShow,viewpopUp,setViewpopUp,info,
        setInfo,deletepopUp,setDeletepopUp,setId,id,deleteData, setIsDeleting,isDeleting,
        editpopup,setEditpopup,originalList, setOriginalList,smallScreen,setSmallScreen}}
    >
      {props.children}
    </UserContext.Provider>
  );
};


export default UserState;
