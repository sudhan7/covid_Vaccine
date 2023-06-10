import express from 'express';
import mongoose from 'mongoose';
import {Usersmodel} from '../models/Users.js'
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import { VaccinationCenter } from '../models/Vaccination.js';


const router = express.Router();

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user exists
      const user = await Usersmodel.findOne({ username });
      const {id} = user
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      res.status(200).json({ message : "Logged In Successfully" , id:id});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
});

router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await Usersmodel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new Usersmodel({ username, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/search', async (req, res) => {
    try {
      const centers = await VaccinationCenter.find();
      const center = [];

      centers.map((val)=>{
        center.push({name:val.name,workingHours:val.workingHours,date:val.date})
      });
      
      res.status(200).json(center);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.post('/apply/:id', async (req, res) => {
    const { id } = req.params;
    const { centername, date, username } = req.body;
  
    try {
      const vaccinationCenter = await VaccinationCenter.findOne({ name: centername, date });
      const response=await Usersmodel.findById(id)
    
      if (!vaccinationCenter) {
        return res.status(404).json({ message: 'Vaccination center not found' });
      }
  
      if (vaccinationCenter.user.length >= 10) {
        return res.status(400).json({ message: 'Vaccination center is full' });
      }
  
      const existingUser = vaccinationCenter.user.find(u => u.username === username);
      if (existingUser) {
      return res.status(400).json({ message: 'User already exists in the vaccination center' });
      }

      response.center.push({centername,date})
      await response.save();
      vaccinationCenter.user.push({ userId: Usersmodel._id, username });
      await vaccinationCenter.save();
  
      res.status(200).json({ message: 'Vaccination slot application successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/myapplication/:id',async(req,res)=>{
    const {id}=req.params
    const user=await Usersmodel.findById(id);
    const {center}=user;
    if(center){
      res.status(200).json(center)
    }
    else{
      res.status(400).json({message:"No applications found"})
    }
  });

  export {router as Userrouter}
