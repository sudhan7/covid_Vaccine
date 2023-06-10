import axios from 'axios';
import React, { useState } from 'react';

const Userapply = () => {
  const [centername, setCentername] = useState('');
  const [date, setDate] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
        const id=window.localStorage.getItem("userid")
        console.log(id)
        const response=await axios.post(`http://localhost:3001/users/apply/${id}`,{centername,date,username})
        alert("Applied sucessfully")
    }
    catch(e){
        console.log(e)
    }
    // Perform any necessary actions with the form data
    console.log('Center Name:', centername);
    console.log('Date:', date);
    console.log('Username:', username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Center Name:
        <input
          type="text"
          value={centername}
          onChange={(e) => setCentername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <br />
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Userapply;
