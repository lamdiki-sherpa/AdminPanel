import React,{useContext,useState} from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'
import UserContext from '../context/UserContext/UserContext'
import {AiFillCloseSquare} from 'react-icons/ai'
const SidebarComponent = () => {
  const {show,smallScreen,setSmallScreen,setShow}=useContext(UserContext)
  const [search,setSearch]=useState('')
  const itemsB = [
    {
        name: "Dashboard",
        link: "/dashboard"
    }, {
        name: "User",
        link: "/user"
    },
    {name:"Fiscal",
     link:"/fiscal"},
     {name:"Book",
     link:"/book"}

]
const item=itemsB.filter((list)=>{
return list.name.toLowerCase().includes(search.toLowerCase())
})


const handleShow=()=>{
  setShow(false)
}
const handleHide=()=>{
  setShow(true)
}
  return (
    <div className="sidebar">
{ show && <Sidebar>
  <h5>Hello!!!</h5>
  <div className='search'>
    <input type='text' onChange={(e)=>setSearch(e.target.value)} value={search}/>
  </div>
  <Menu>
   {
    item.length===0?(<div style={{margin:'20px',color:'white'}}>search result does not match</div>):(
      item.map((items)=>{
       return (
      <MenuItem onClick={smallScreen?handleShow:handleHide}>
     <NavLink to={items.link}>{items.name}</NavLink>
     </MenuItem>
   
       )
      })
    )
   }
  </Menu>
  {smallScreen &&<span className='closer' onClick={()=>setShow(!show)}>
    <AiFillCloseSquare color='#fff'/>
    </span>}
</Sidebar>}

    </div>
  )
}

export default SidebarComponent