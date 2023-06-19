import { useContext, useEffect, useState } from "react";
import FiscalContext from "./FiscalContext";
import GetData from "../../hooks/GetData";
import MainContext from "../mainContext";
import {toast} from 'react-toastify'

const FiscalState=(props)=>{
const [fiscalList,setFiscalList]=useState([])
const [loading,setLoading]=useState(true)
const [activeFiscal,setActiveFiscal]=useState([])
// const [id,setId]=useState(null)
const initialValue={
    startYear:'',
    endYear:'',
}
const [formValue,setFormValue]=useState(initialValue)

const {url}=useContext(MainContext)
useEffect(()=>{
    GetFiscal()
},[])
const GetFiscal=()=>{
    const dataForm = {
        flag: "S",
        active:"-1",
        Type: "POST",
        FetchURL: `${url}/fiscal`,
      };
      GetData(dataForm).then(function (result) {
        if (result.StatusCode === 200) {
          const postResult = result.Values ? result.Values : "";
          setFiscalList(postResult);
          setLoading(false);
        } else {
          setLoading(false);
          setFiscalList([])
        }
      });
}
useEffect(()=>{
    GetActiveFiscal()
},[])
const GetActiveFiscal=()=>{
    const dataForm = {
        flag: "S",
        active:"Y",
        Type: "POST",
        FetchURL: `${url}/fiscal`,
      };
      GetData(dataForm).then(function(result){
        if(result.StatusCode===200){
            const postResult = result.Values ? result.Values : "";
            setActiveFiscal(postResult)
        }
        else{
          setActiveFiscal([])
        }
      })
}
const AddFiscal=()=>{
    const dataForm={
        flag:'I',
        startYear:formValue.startYear,
        endYear:formValue.endYear,
        Type:"POST",
        FetchURL:`${url}/fiscal`
    }
    GetData(dataForm).then(function(result){
        if(result.StatusCode===200){
            toast.success(result.Message,{theme:"light"})
            GetFiscal()
          }
          else{
            toast.error(result.Message,{theme:"light"})
          }
    })
}
const UpdateFiscal=(id)=>{
    const dataForm = {
        flag: "US",
        FiscalID:id,
        active:"Y",
        Type: "POST",
        FetchURL: `${url}/fiscal`,
      };
      GetData(dataForm).then(function (result) {
        if (result.StatusCode === 200) {
            toast.success(result.Message,{theme:"light"})
            GetFiscal()
            GetActiveFiscal()
        } else {
            toast.error(result.Message,{theme:"light"})
        }
      });
}
return <FiscalContext.Provider value={{fiscalList,setFiscalList,
    loading,setLoading,UpdateFiscal,activeFiscal,AddFiscal,formValue,setFormValue,initialValue
}}>
{props.children}
</FiscalContext.Provider>
}

export default FiscalState