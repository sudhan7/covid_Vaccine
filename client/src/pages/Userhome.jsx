import React from 'react'
import {Link} from 'react-router-dom'
const Userhome = () => {
  return (
    <div>
     <div className='c01'>
        <div className='c02'>
            <Link to='/searchcenter'>Search for a center</Link>
        </div>
    </div>
    <div className='c01'>
        <div className='c02'>
            <Link to='/Userapply'>Apply for a center</Link>
        </div>
    </div>
    <div className='c01'>
        <div className='c02'>
            <Link to='/applications'>My applications</Link>
        </div>
    </div> 
    </div>
  )
}

export default Userhome