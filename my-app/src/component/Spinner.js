import React from 'react'
import loading from '../image/loading.gif'
const Spinner = () => {
  return (
    <div className='d-flex justify-content-center align-items-center flex-column' style={{width:'120px',margin:'10% auto'}}>
     <img src={loading} alt=''/>
    </div>
  )
}

export default Spinner