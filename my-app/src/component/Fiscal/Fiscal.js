import React, { useContext } from 'react'
import FiscalContext from '../context/FiscalContext/FiscalContext'
import DataTable from "react-data-table-component";
import Spinner from '../Spinner';
import $ from 'jquery'
import FiscalPopup from './FiscalPopup';
const Fiscal = () => {
 const {fiscalList,loading,UpdateFiscal,setFormValue,initialValue}=useContext(FiscalContext)
 console.log("fiscal",fiscalList)
 const columns = [
    {
      name: "S.N",
      width:"70px",
      selector: (row, index) => index + 1,
    },
    {
      name: "Start Date",
      selector: (row) => row.startYear,
    },
    {
      name: "End Date",
      selector: (row) => row.endYear,
    },
    {
    name:"Active",
    selector:(row)=>(
        <input type='checkbox' checked={row.active==="Y"?true:false} onChange={()=>handleChange(row._id)}/>
    )
    }
]
const handleChange=(id)=>{
UpdateFiscal(id)
}
const handleAdd=()=>{
  $(".fiscalpopupBg").fadeIn(500);
  $(".fiscalpopUp").fadeIn(500);
  setFormValue(initialValue)
}
  return (
    <>
    <div className='d-flex justify-content-between'>
    <h6>Fiscal</h6>
    <button className='btn btn-primary' onClick={handleAdd}>Add</button>
    </div>
    <div>
    {loading ? (
          <Spinner />
        ) : (
          <DataTable
            columns={columns}
            data={fiscalList}
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
    <FiscalPopup/>
    </>
  )
}

export default Fiscal