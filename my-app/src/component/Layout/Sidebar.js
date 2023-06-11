import React,{useContext,useState} from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'
import UserContext from '../context/UserContext/UserContext'

const SidebarComponent = () => {
  const {show,smallScreen,setSmallScreen}=useContext(UserContext)
  const [search,setSearch]=useState('')
  const itemsB = [
    {
        name: "Dashboard",
        link: "/dashboard"
    }, {
        name: "User",
        link: "/user"
    }
]
const item=itemsB.filter((list)=>{
return list.name.toLowerCase().includes(search.toLowerCase())
})



  return (
    <div className="sidebar">
{ show && <Sidebar>
  <div className='search'>
    <input type='text' onChange={(e)=>setSearch(e.target.value)} value={search}/>
  </div>
  <Menu>
   {
    item.length===0?(<div style={{margin:'20px',color:'white'}}>search result does not match</div>):(
      item.map((items)=>{
       return (
        <MenuItem>
     <NavLink to={items.link}>{items.name}</NavLink>
     </MenuItem>
   
       )
      })
    )
   }
  </Menu>
</Sidebar>}

    </div>
  )
}

export default SidebarComponent