import axios from 'axios'
import React, { useState ,useEffect} from 'react'



const Usersearch = () => {
  const [centers,setCenters]=useState([])
  useEffect(()=>{
    const getinfo=async()=>{
      const response=await axios.get("http://localhost:3001/users/search")
      console.log(response.data)
      setCenters(response.data)
    }
    getinfo()
  }
  ,[])
  return (
    <div>
      <h1>Vaccination Centers</h1>
      <div>
        {centers.map((val,index)=>{
          return(
            <ul>
              <li>NAME: {val.name}</li>
              <li>WORKING HOURS: {val.workingHours}</li>
              <li>DATE: {val.date}</li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}

export default Usersearch