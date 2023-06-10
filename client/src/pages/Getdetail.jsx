import axios from 'axios'
import { useState ,useEffect} from 'react'



const Getdetail = () => {
const [detail,setDetail]=useState([]);
useEffect(()=>{
    const getdata=async()=>{
        try{
        const reponse=await axios.get("http://localhost:3001/admin/dosage-details")
        const data=reponse.data;
        setDetail(data);
        }
        catch(e){
            console.log(e);
        }
    }
    getdata()
}
,[])
  return (
    <div>
        <div>
            {detail.length<=0?<h1>No info available</h1>:<h1>Dosage details</h1>}
        </div>
        <div>
            {detail.map((val,index)=>{
                return(
                    <ul>
                        <li key={index}>{val.centerName}</li>
                        <li key={index}>{val.dosageCount}</li>
                    </ul>
                )
            })}
        </div>
    </div>
  )
}

export default Getdetail