import React from 'react'
import {Link} from 'react-router-dom'
const Adminhome = () => {
  return (
    <div>
    <div className='c01'>
       <div className='c02'>
           <Link to='/Admingetdetail'>Get Dosage Details</Link>
       </div>
   </div>
   <div className='c01'>
       <div className='c02'>
           <Link to='/Adminremovecenter'>Remove Centers</Link>
       </div>
   </div>
   <div className='c01'>
       <div className='c02'>
           <Link to='/Adminaddcenter'>Add Centers</Link>
       </div>
   </div> 
   </div>

    )
}

export default Adminhome