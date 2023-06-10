import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Addcenter = () => {
    const navigate=useNavigate();
  const [name, setName] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
    await axios.post("http://localhost:3001/admin/add-center",{name, workingHours, date})
    alert("Added successfully!")
    navigate('/adminhome')
    }
    catch(e){
        console.log(e);
        alert("Invalid credentials")
    }
    console.log({ name, workingHours, date });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="workingHours">Working Hours:</label>
        <input
          type="text"
          id="workingHours"
          value={workingHours}
          onChange={(event) => setWorkingHours(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Addcenter;
