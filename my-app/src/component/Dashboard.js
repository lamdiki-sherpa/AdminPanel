import React, { useState } from 'react'

 const Dashboard = () => {
 const [tab,setTab]=useState({
    tab1:true,
    tab2:false
 })
 const handleTab1=()=>{
setTab({
    tab1:true,
    tab2:false
})
 }
 const handleTab2=()=>{
    setTab({
        tab1:false,
        tab2:true
    })
 }
  return (
    <>
    Dashboard
   <div className='d-flex' style={{cursor:'pointer'}}>
    <span onClick={handleTab1} className={tab.tab1===true?"activeTab":""}>Item1</span>
    <span onClick={handleTab2} className={tab.tab2===true?"activeTab":""}>Item2</span>
   </div>
   {tab.tab1&&(<h6>This is item1</h6>)}
   {tab.tab2&&(<h6>This is item2</h6>)}
   
    {/* <div>
   <div className='row'>
    <div className='col-4'>
 
    </div>
    <div className='col-8'>
        
         
         <table>
            <thead>
                <th>Name</th>
                <th>Subject</th>
            </thead>
            <tbody>
            {userData?userData.map((user)=>{
                    const {name,subject}=user
                    return (
                        <tr>
                            <td>{name}</td>
                            <td>{subject}</td>
                        </tr>
                    )
                }):<div>No value to show</div>}
            </tbody>
         </table>
    </div>
   </div>
  
    
    </div> */}
    </>
  )
}
export default Dashboard
