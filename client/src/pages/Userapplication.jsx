import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Userapplication = () => {
    const [app,setApp]=useState([]);
    useEffect(()=>{
        const getinfo=async()=>{
            const id=window.localStorage.getItem("userid")
            try{
            const data=await axios.get(`http://localhost:3001/users/myapplication/${id}`)
            setApp(data.data)
            }
            catch(e){
                console.log(e)
            }
        }
        getinfo()

    },[])
  return (
    <div>
        {app.length>=0 ? <h1>My applications</h1> : <h1>No data found</h1> }
        <div>
            {app.map((val,index)=>{
                return(
                    <ul key={index}>
                        <li>{val.centername}</li>
                        <li>{val.date}</li>
                    </ul>
                )
            })}
        </div>
    </div>
  )
}

export default Userapplication