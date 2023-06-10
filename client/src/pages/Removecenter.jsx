import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Form = () => {
    const navigate=useNavigate();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
    await axios.post("http://localhost:3001/admin/delete-center",{name, date})
    alert("Deleted successfully!")
    navigate('/adminhome')
    }
    catch(e){
        console.log(e);
        alert("Invalid credentials")
        }
    console.log({ name, date });
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
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <button type="submit">Delete</button>
    </form>
  );
};

export default Form;
